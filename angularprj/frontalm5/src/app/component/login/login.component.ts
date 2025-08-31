import { UsuarioService } from './../../service/usuario.service';
import { Component } from '@angular/core';
import { Usuario } from '../../entity/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usuario: Usuario = new Usuario();
  errorMessage: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  iniciarSesion() {
    this.errorMessage = '';

      console.log("Datos que envío: ", this.usuario);

    this.usuarioService.login({
      idUsuario: this.usuario.idUsuario,
      password: this.usuario.password
    }).subscribe(
      (response) => {

        if (response.success) {
          alert('Login exitoso');
          this.router.navigate(['/principal']);
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        this.errorMessage = 'Ocurrió un error en el servidor';
      }
    );
  }

  registrar() {
    this.router.navigate(['/registro']);
  }
}
