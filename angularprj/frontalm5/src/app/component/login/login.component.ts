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

    // 1️⃣ Validar campos vacíos antes de enviar
    if (!this.usuario.idUsuario || !this.usuario.password) {
      this.errorMessage = 'Debe llenar todos los campos.';
      return;
    }

    console.log("Datos que envío: ", this.usuario);

    // 2️⃣ Llamar al backend
    this.usuarioService.login({
      idUsuario: this.usuario.idUsuario,
      password: this.usuario.password
    }).subscribe(
      (response) => {
        if (response.success) {

          //localStorage.getItem('id', this.usuario.idUsuario);
          localStorage.setItem('usuario', JSON.stringify(response.usuario));

          alert('Login exitoso');
          this.router.navigate(['/principal']);
        } else {
          // 3️⃣ Mostrar mensaje que devuelve el backend
          this.errorMessage = response.message || 'Usuario o contraseña incorrectos';
        }
      },
      (error) => {
        //console.error('Error al iniciar sesión', error);
        this.errorMessage = 'Usuario o contraseña incorrectos.';
        //this.errorMessage = 'Error en el servidor. Intente más tarde.';
      }
    );
  }

  registrar() {
    this.router.navigate(['/registro']);
  }
}
