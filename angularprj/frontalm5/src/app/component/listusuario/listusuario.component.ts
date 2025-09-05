import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../entity/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listusuario',
  standalone: false,
  templateUrl: './listusuario.component.html',
  styleUrl: './listusuario.component.css',
})
export class ListusuarioComponent implements OnInit {
  usuarios!: Usuario[];

  constructor(private userService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.userService.listUsuarios().subscribe(data => {
      this.usuarios = data;
    })
  }

  deleteUsuario(user: Usuario) {
    var validar = confirm(
      'Esta seguro que desea eliminar el usuario ' +
        user.nombre +
        ' ' +
        user.apellido
    );
    if (validar == true) {
      this.userService.deleteUsuario(user).subscribe({
        next: (result) => {
          this.usuarios = this.usuarios.filter(x => x !== user);
          alert(result+ " Usuario: "+user.correoElectronico+" a sido eliminado!");
        },
        error:() => {
          alert("Ha ocurrido un error al eliminar el usuario.");
        },
      });
    }
  }

  selectUser(usr: Usuario): void {
    localStorage.setItem('selectedUserId', usr.idUsuario.toString());
    this.router.navigate(['/editusuario', usr.idUsuario]);
  }

  crearNuevoUsuario(): void {
    this.router.navigate(['/addusuarios']);
  }
}
