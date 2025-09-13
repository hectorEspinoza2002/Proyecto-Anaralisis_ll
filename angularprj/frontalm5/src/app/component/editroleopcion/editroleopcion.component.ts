import { Component, OnInit } from '@angular/core';
import { RoleOpcion } from '../../entity/roleopcion';
import { Role } from '../../entity/Role';
import { Opcion } from '../../entity/opcion';
import { RoleopcionService } from '../../service/roleopcion.service';
import { RoleService } from '../../service/role.service';
import { OpcionService } from '../../service/opcion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editroleopcion',
  standalone: false,
  templateUrl: './editroleopcion.component.html',
  styleUrl: './editroleopcion.component.css'
})
export class EditroleopcionComponent implements OnInit{

  rolOpc: RoleOpcion = new RoleOpcion();
  roles: Role[] = [];
  opciones: Opcion[] = [];

  idRole!: number;
  idOpcion!: number;



  constructor(
    private roService: RoleopcionService,
    private roleService: RoleService,
    private opcionService: OpcionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectEdit();
    // Obtener ids guardados
     const idRole = localStorage.getItem("idRole");
    const idOpcion = localStorage.getItem("idOpcion");

    // Cargar catálogos
    this.roleService.listRole().subscribe(data => this.roles = data);
    this.opcionService.getAll().subscribe(data => this.opciones = data);

    // Buscar RoleOpcion existente
    this.roService.buscarRoleOpcion(this.idRole, this.idOpcion).subscribe(data => {
      this.rolOpc = data;
    });
  }

  updateRoleOpcion() {
    this.roService.editRoleOpcion(this.idRole, this.idOpcion, this.rolOpc).subscribe({
      next: () => {
        alert("✅ Rol Opción actualizado correctamente");
        this.router.navigate(["listroleopcion"]);
      },
      error: () => {
        alert("❌ Error al actualizar el Rol Opción");
      }
    });
  }

  cancelar() {
    this.router.navigate(["listrolopcion"]);
  }

  selectEdit(): void {
    const idRoleStr = localStorage.getItem("idRole");
    const idOpcionStr = localStorage.getItem("idOpcion");

    if (idRoleStr && idOpcionStr) {
      this.idRole = Number(idRoleStr);
      this.idOpcion = Number(idOpcionStr);

      this.roService.buscarRoleOpcion(this.idRole, this.idOpcion)
        .subscribe(data => {
          this.rolOpc = data;
        });
    } else {
      alert("❌ No se encontraron los IDs en localStorage");
      this.router.navigate(["listroleopcion"]);
    }
  }

}
