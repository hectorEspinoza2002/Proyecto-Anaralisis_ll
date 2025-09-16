import { Component, OnInit } from '@angular/core';
import { RoleOpcion } from '../../entity/roleopcion';
import { Role } from '../../entity/Role';
import { Opcion } from '../../entity/opcion';
import { RoleopcionService } from '../../service/roleopcion.service';
import { RoleService } from '../../service/role.service';
import { OpcionService } from '../../service/opcion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addroleopcion',
  standalone: false,
  templateUrl: './addroleopcion.component.html',
  styleUrl: './addroleopcion.component.css',
})
export class AddroleopcionComponent implements OnInit {
  rolOpc: RoleOpcion = new RoleOpcion();
  roles: Role[] = [];
  opciones: Opcion[] = [];

  constructor(
    private roService: RoleopcionService,
    private roleService: RoleService,
    private opcionService: OpcionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleService.listRole().subscribe((data) => (this.roles = data));
    this.opcionService.getAll().subscribe((data) => (this.opciones = data));
  }

  saveRoleOpcion() {
  this.roService.addRoleOpcion(this.rolOpc).subscribe({
    next: () => {
      alert("Rol Opción asignado correctamente ✅");
      this.router.navigate(["listrolopcion"]);
    },
    error: (err) => {
      console.error("Error al guardar:", err);
      alert("❌ Ocurrió un error al guardar la asignación");
    }
  });
}


  /*
  saveRoleOpcion() {
    this.roService.addRoleOpcion(this.rolOpc).subscribe({
      next: () => {
        alert("Rol Opción asignado correctamente ✅");
        this.router.navigate(["listroleopcion"]);
      },
      error: () => {
        alert("❌ Ocurrió un error al guardar la asignación");
      }
    });
  }
 */
  cancelar() {
    this.router.navigate(['listrolopcion']);
  }
}
