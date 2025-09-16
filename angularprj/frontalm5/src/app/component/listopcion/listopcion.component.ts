import { Component, OnInit } from '@angular/core';
import { Opcion } from '../../entity/opcion';
import { OpcionService } from '../../service/opcion.service';
import { Router } from '@angular/router';
import { PermisosService } from '../../service/permisos.service';

@Component({
  selector: 'app-listopcion',
  standalone: false,
  templateUrl: './listopcion.component.html',
  styleUrl: './listopcion.component.css'
})
export class ListopcionComponent implements OnInit{
  opciones!: Opcion[];

  puedeAlta = false;
  puedeBaja = false;
  puedeCambio = false;

  constructor(private opService: OpcionService, private router:Router,
    private permisosService: PermisosService
  ){}
  ngOnInit(): void {
      this.opService.getAll().subscribe(data => {
        this.opciones = data;
      });

      this.permisosService.permisos$.subscribe((permisos) => {
      console.log('Permisos en localStorage:', permisos);

      const permisosEmpresa = permisos.find(
        (p: any) => p.opcion.nombre === 'Opciones'
      );

      if (permisosEmpresa) {
        this.puedeAlta = permisosEmpresa.alta == 1;
        this.puedeBaja = permisosEmpresa.baja == 1;
        this.puedeCambio = permisosEmpresa.cambio == 1;
      }
    });
  }

  deleteOpcion(opc:Opcion){
    var validar = confirm("Esta seguro que desea eliminar el Rol?");
    if(validar == true){
      this.opService.deleteOpcion(opc).subscribe({
        next: (result) => {
          this.opciones = this.opciones.filter(x => x !== opc);
          alert(result);
        },
        error: () => {
          alert("Ha ocurrido un error al eliminar el rol.\nVerifique que no existan usuarios");
        },
      });
    }
  }

  selectOp(r:Opcion): void{
    localStorage.setItem("id",r.idOpcion.toString().valueOf());
    this.router.navigate(["editopcion"])
  }

}
