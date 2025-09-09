import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../entity/usuario';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  usuario!: Usuario;

  constructor(private userService: UsuarioService) {}

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuarioLocal = JSON.parse(usuarioGuardado);
      this.usuario = usuarioLocal;

      this.userService.buscarUsuarioId(usuarioLocal.idUsuario).subscribe(
        (usuarioBD) => {
          this.usuario = usuarioBD;

          localStorage.setItem('usuario', JSON.stringify(usuarioBD));
        },
        (error) => {
          console.error('Error al refrescar usuario desde BD ', error);
        }
      );
    }
  }

  nuevaPassword: string = '';
  confirmarPassword: string = '';
  mensaje: string = '';

  cambiarPassword() {
    if (!this.nuevaPassword || !this.confirmarPassword) {
      this.mensaje = 'Debe llenar ambos campos.';
      return;
    }

    if (this.nuevaPassword !== this.confirmarPassword) {
      this.mensaje = 'Las contraseñas no coinciden.';
      return;
    }

    this.userService
      .updatePassword(this.usuario.idUsuario, this.nuevaPassword)
      .subscribe({
        next: (res) => {
          this.mensaje = res;
          this.nuevaPassword = '';
          this.confirmarPassword = '';
        },
        error: (err) => {
          this.mensaje = 'Error al actualizar contraseña.';
        },
      });
  }
}
