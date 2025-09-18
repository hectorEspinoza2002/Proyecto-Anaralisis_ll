import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  constructor(public router: Router, private usuarioService: UsuarioService) {}
  /*
  logout() {
    this.usuarioService.logout().subscribe(
      (response) => {
        // Si el logout fue exitoso, redirigimos a la página de login
        localStorage.removeItem('usuario'); // O el nombre que uses para almacenar el usuario
        sessionStorage.removeItem('usuario'); // Lo mismo si usas sessionStorage
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error en el logout', error);
        // Manejar errores
      }
    );
  }
*/
  logout() {
    this.usuarioService.logout().subscribe(
      (response) => {
        // El backend nos devuelve el mensaje "Logout exitoso"
        console.log('Respuesta de logout:', response); // Ver el mensaje desde el backend
        localStorage.removeItem('usuario'); // Eliminar el usuario de localStorage
        sessionStorage.removeItem('usuario'); // Eliminar el usuario de sessionStorage
        this.router.navigate(['/login']); // Redirigir al login
      },
      (error) => {
        console.error('Error al hacer logout', error);
        // Aquí puedes manejar el error si algo falla en el backend o en la conexión
      }
    );
  }
}
