import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleOpcion } from '../../entity/roleopcion';
import { Role } from '../../entity/Role';
import { Opcion } from '../../entity/opcion';
import { RoleopcionService } from '../../service/roleopcion.service';
import { RoleService } from '../../service/role.service';
import { OpcionService } from '../../service/opcion.service';
import { Router } from '@angular/router';
import { PermisosService } from '../../service/permisos.service';

@Component({
  selector: 'app-editroleopcion',
  standalone: false,
  templateUrl: './editroleopcion.component.html',
  styleUrl: './editroleopcion.component.css',
})
export class EditroleopcionComponent implements OnInit {
  rolOpc: RoleOpcion = new RoleOpcion();
  roles: Role[] = [];
  opciones: Opcion[] = [];

  idRole!: number;
  idOpcion!: number;

  constructor(
    private roService: RoleopcionService,
    private roleService: RoleService,
    private opcionService: OpcionService,
    private router: Router,
    private permisosService: PermisosService
  ) {}

  @ViewChild('myFocus') myFocus: any;

  ngAfterViewInit(): void {
    this.myFocus.nativeElement.focus();
  }

  ngOnInit(): void {
    this.selectEdit();
    // Obtener ids guardados
    const idRole = localStorage.getItem('idRole');
    const idOpcion = localStorage.getItem('idOpcion');

    // Cargar catálogos
    this.roleService.listRole().subscribe((data) => (this.roles = data));
    this.opcionService.getAll().subscribe((data) => (this.opciones = data));

    // Buscar RoleOpcion existente
    this.roService
      .buscarRoleOpcion(this.idRole, this.idOpcion)
      .subscribe((data) => {
        this.rolOpc = data;
      });
  }

  updateRoleOpcion() {
    this.roService
      .editRoleOpcion(this.idRole, this.idOpcion, this.rolOpc)
      .subscribe({
        next: (permisosActualizados) => {
          // 🔹 Actualizamos el BehaviorSubject + localStorage
          this.permisosService.actualizarPermisos(permisosActualizados);

          alert('✅ Rol Opción actualizado correctamente');
          this.router.navigate(['listrolopcion']);
        },
        error: () => {
          alert('❌ Error al actualizar el Rol Opción');
        },
      });
  }

  /*
  updateRoleOpcion() {
    this.roService
      .editRoleOpcion(this.idRole, this.idOpcion, this.rolOpc)
      .subscribe({
        next: () => {
          alert('✅ Rol Opción actualizado correctamente');
          this.router.navigate(['listrolopcion']);
        },
        error: () => {
          alert('❌ Error al actualizar el Rol Opción');
        },
      });
  }
      */

  cancelar() {
    this.router.navigate(['listrolopcion']);
  }

  selectEdit(): void {
    const idRoleStr = localStorage.getItem('idRole');
    const idOpcionStr = localStorage.getItem('idOpcion');

    if (idRoleStr && idOpcionStr) {
      this.idRole = Number(idRoleStr);
      this.idOpcion = Number(idOpcionStr);

      this.roService
        .getRoleOpcion(this.idRole, this.idOpcion)
        .subscribe((data) => {
          this.rolOpc = data;
        });
    } else {
      alert('❌ No se encontraron los IDs en localStorage');
      this.router.navigate(['listrolopcion']);
    }
  }
}
