import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../entity/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listusuario',
  standalone: false,
  templateUrl: './listusuario.component.html',
  styleUrl: './listusuario.component.css'
})
export class ListusuarioComponent implements OnInit{
  usuarios: Usuario[] = [];
  constructor(private userService: UsuarioService, private router:Router){}
    ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.userService.listUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        alert('Error al cargar la lista de usuarios');
      }
    });
  }

  deleteUser(us: Usuario): void {
    const validar = confirm(`¿Está seguro que desea eliminar al usuario ${us.nombre} ${us.apellido}?`);

    if (validar) {
      this.userService.deleteUsuario(us.idUsuario.toString()).subscribe({
        next: (result) => {
          this.usuarios = this.usuarios.filter(x => x.idUsuario !== us.idUsuario);
          alert('Usuario eliminado correctamente');
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert('Ha ocurrido un error al eliminar el usuario. Verifique que no existan dependencias.');
        }
      });
    }
  }

  selectUser(usr: Usuario): void {
    localStorage.setItem("selectedUserId", usr.idUsuario.toString());
    this.router.navigate(['/editar-usuario', usr.idUsuario]);
  }

  crearNuevoUsuario(): void {
    this.router.navigate(['/addusuarios']);
  }

}
