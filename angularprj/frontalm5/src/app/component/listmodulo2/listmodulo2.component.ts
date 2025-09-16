import { Component, OnInit } from '@angular/core';
import { Modulo } from '../../entity/modulo';
import { ModuloService } from '../../service/modulo.service';
import { Router } from '@angular/router';
import { PermisosService } from '../../service/permisos.service';

@Component({
  selector: 'app-listmodulo2',
  standalone: false,
  templateUrl: './listmodulo2.component.html',
  styleUrl: './listmodulo2.component.css',
})
export class Listmodulo2Component implements OnInit {
  modulos!: Modulo[];

  puedeAlta = false;
  puedeBaja = false;
  puedeCambio = false;

  constructor(
    private modService: ModuloService,
    private router: Router,
    private permisosService: PermisosService
  ) {}
  ngOnInit(): void {
    this.modService.getAll().subscribe((data) => {
      this.modulos = data;
    });

    this.permisosService.permisos$.subscribe((permisos) => {
      console.log('Permisos en localStorage:', permisos);

      const permisosEmpresa = permisos.find(
        (p: any) => p.opcion.nombre === 'Modulos'
      );

      if (permisosEmpresa) {
        this.puedeAlta = permisosEmpresa.alta == 1;
        this.puedeBaja = permisosEmpresa.baja == 1;
        this.puedeCambio = permisosEmpresa.cambio == 1;
      }
    });
  }

  deleteModulo(mod: Modulo) {
    var validar = confirm('Esta seguro que desea eliminar el Rol?');
    if (validar == true) {
      this.modService.deleteModulo(mod).subscribe({
        next: (result) => {
          this.modulos = this.modulos.filter((x) => x !== mod);
          alert(result + 'Modulo ' + mod.nombre + ' a sido eliminado!');
        },
        error: () => {
          alert(
            'Ha ocurrido un error al eliminar el rol.\nVerifique que no existan usuarios'
          );
        },
      });
    }
  }

  selectModulo(r: Modulo): void {
    localStorage.setItem('id', r.idModulo.toString().valueOf());
    this.router.navigate(['editmodulo']);
  }
}
