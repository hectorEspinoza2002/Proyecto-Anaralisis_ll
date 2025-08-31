import { Component } from '@angular/core';
import { Role } from '../../entity/Role';
import { RoleService } from '../../service/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addrole',
  standalone: false,
  templateUrl: './addrole.component.html',
  styleUrl: './addrole.component.css'
})
export class AddroleComponent {
  rol = new Role;

  constructor(private service:RoleService, private router:Router){}
  ngOnInit(): void{}

  Cancelar(){
    this.router.navigate(["listrole"]);
  }

  guardar(role:Role){
    if(typeof(role.nombre) != "undefined"){
      this.service.addRole(role).subscribe(result => {
        if(result != null){
          alert("Rol: "+role.nombre+" ingresado correctamente!");
          this.router.navigate(["listrole"]);
        }
      });
    } else{
      alert("Debe ingresar Nombre del rol y Fecha");
    }
  }

}
