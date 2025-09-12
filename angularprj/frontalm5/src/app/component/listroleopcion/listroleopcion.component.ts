import { Component, OnInit } from '@angular/core';
import { RoleOpcion } from '../../entity/roleopcion';
import { RoleopcionService } from '../../service/roleopcion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listroleopcion',
  standalone: false,
  templateUrl: './listroleopcion.component.html',
  styleUrl: './listroleopcion.component.css'
})
export class ListroleopcionComponent implements OnInit{

  rolOpc: RoleOpcion[] = [];

  constructor(private roService: RoleopcionService, private router:Router){}
  ngOnInit(): void {
      this.roService.listRoleOpciones().subscribe(data => {
        this.rolOpc = data;
      });
  }

  deleteRoleOpcion(rolOp: RoleOpcion) {
    const validar = confirm(
      `¿Está seguro que desea eliminar la opción "${rolOp.opcion.nombre}" del rol "${rolOp.role.nombre}"?`
    );
    if (validar) {
      this.roService.deleteRoleOpcion(rolOp.role.idRole, rolOp.opcion.idOpcion).subscribe({
        next: (result) => {
          this.rolOpc = this.rolOpc.filter(x => x !== rolOp);
          alert(`Se eliminó correctamente la opción "${rolOp.opcion.nombre}" del rol "${rolOp.role.nombre}"`);
        },
        error: () => {
          alert("Ha ocurrido un error al eliminar la asignación.");
        }
      });
    }
  }

  selectRoleOpcion(rolOp: RoleOpcion): void {
    localStorage.setItem("idRole", rolOp.role.idRole.toString());
    localStorage.setItem("idOpcion", rolOp.opcion.idOpcion.toString());
    this.router.navigate(["editroleopcion"]);
  }

}
