import { Component, OnInit } from '@angular/core';
import { Role } from '../../entity/Role';
import { RoleService } from '../../service/role.service';
import { Router } from '@angular/router';
import { PermisosService } from '../../service/permisos.service';

@Component({
  selector: 'app-listrole',
  standalone: false,
  templateUrl: './listrole.component.html',
  styleUrl: './listrole.component.css'
})
export class ListroleComponent implements OnInit{
  roles!: Role[];

  puedeAlta = false;
  puedeBaja = false;
  puedeCambio = false;
  puedeExportar = false;
  puedeImprimir = false;

  constructor(private rolService: RoleService, private router:Router,
    private permisosService: PermisosService
  ){}
  ngOnInit(): void {
      this.rolService.listRole().subscribe(data => {
        this.roles = data;
      });

      this.permisosService.permisos$.subscribe((permisos) => {
      console.log('Permisos en localStorage:', permisos);

      const permisosEmpresa = permisos.find(
        (p: any) => p.opcion.nombre === 'Roles'
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

  deleteRol(rol:Role){
    var validar = confirm("Esta seguro que desea eliminar el Rol?");
    if(validar == true){
      this.rolService.deleteRole(rol).subscribe({
        next: (result) => {
          this.roles = this.roles.filter(x => x !== rol);
          alert(result + rol.nombre +" a sido eliminado!");
        },
        error: () => {
          alert("Ha ocurrido un error al eliminar el rol.\nVerifique que no existan usuarios");
        },
      });
    }
  }

  selectRol(r:Role): void{
    localStorage.setItem("id",r.idRole.toString().valueOf());
    this.router.navigate(["editrol"]);
  }

  generarPdf(): void {
    if (this.roles && this.roles.length > 0) {
      this.rolService.generarPdfRol(this.roles);
    } else {
      alert('No hay datos para generar el PDF');
    }
  }

  generarExcelSimple(): void {
    if (this.roles && this.roles.length > 0) {
      this.rolService.generarExcelSimple(this.roles, 'roles');
    } else {
      alert('No hay datos para generar el Excel');
    }
  }

}
