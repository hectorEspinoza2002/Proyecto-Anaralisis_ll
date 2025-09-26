import { Component, OnInit } from '@angular/core';
import { Genero } from '../../entity/genero';
import { GeneroService } from '../../service/genero.service';
import { Router } from '@angular/router';
import { PermisosService } from '../../service/permisos.service';

@Component({
  selector: 'app-listgenero',
  standalone: false,
  templateUrl: './listgenero.component.html',
  styleUrl: './listgenero.component.css'
})
export class ListgeneroComponent implements OnInit{
  generos!: Genero[];

  puedeAlta = false;
  puedeBaja = false;
  puedeCambio = false;
  puedeExportar = false;
  puedeImprimir = false;

  constructor(private generoService: GeneroService, private router:Router,
    private permisosService: PermisosService
  ){}
  ngOnInit(): void {
      this.generoService.listGenero().subscribe(data => {
        this.generos = data;
      });

      this.permisosService.permisos$.subscribe((permisos) => {
      console.log('Permisos en localStorage:', permisos);

      const permisosEmpresa = permisos.find(
        (p: any) => p.opcion.nombre === 'Generos'
      );

      if (permisosEmpresa) {
        this.puedeAlta = permisosEmpresa.alta == 1;
        this.puedeBaja = permisosEmpresa.baja == 1;
        this.puedeCambio = permisosEmpresa.cambio == 1;
        this.puedeExportar = permisosEmpresa.exportar == 1;
        this.puedeImprimir = permisosEmpresa.imprimir == 1;
      }
    });
  }

  deleteGenero(ge:Genero){
    var validar = confirm("Esta seguro que desea eliminar el Rol?");
    if(validar == true){
      this.generoService.deleteGenero(ge).subscribe({
        next: (result) => {
          this.generos = this.generos.filter(x => x !== ge);
          alert(result + ge.nombre +" a sido eliminado!");
        },
        error: () => {
          alert("Ha ocurrido un error al eliminar el rol.\nVerifique que no existan usuarios");
        },
      });
    }
  }

  selectGenero(gr:Genero): void{
    localStorage.setItem("id",gr.idGenero.toString().valueOf());
    this.router.navigate(["editgenero"]);
  }

  generarPdf(): void {
    if (this.generos && this.generos.length > 0) {
      this.generoService.generarPdfGenero(this.generos);
    } else {
      alert('No hay datos para generar el PDF');
    }
  }

  generarExcelSimple(): void {
    if (this.generos && this.generos.length > 0) {
      this.generoService.generarExcelSimple(this.generos, 'generos');
    } else {
      alert('No hay datos para generar el Excel');
    }
  }

}
