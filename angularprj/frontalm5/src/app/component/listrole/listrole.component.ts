import { Component, OnInit } from '@angular/core';
import { Role } from '../../entity/Role';
import { RoleService } from '../../service/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listrole',
  standalone: false,
  templateUrl: './listrole.component.html',
  styleUrl: './listrole.component.css'
})
export class ListroleComponent implements OnInit{
  roles!: Role[];

  constructor(private rolService: RoleService, private router:Router){}
  ngOnInit(): void {
      this.rolService.listRole().subscribe(data => {
        this.roles = data;
      })
  }

  deleteRol(rol:Role){
    var validar = confirm("Esta seguro que desea eliminar el Rol?");
    if(validar == true){
      this.rolService.deleteRole(rol).subscribe({
        next: (result) => {
          this.roles = this.roles.filter(x => x !== rol);
          alert(result);
        },
        error: () => {
          alert("Ha ocurrido un error al eliminar el rol.\nVerifique que no existan usuarios");
        },
      });
    }
  }

  selectRol(r:Role): void{
    localStorage.setItem("id",r.idRole.toString().valueOf());
    //this.router.navigate([""])
  }

}
