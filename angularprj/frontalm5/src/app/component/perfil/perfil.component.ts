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

  nuevaPassword: string = '';
  confirmarPassword: string = '';
  mensaje: string = '';
  erroresPassword: string[] = []; // para las validaciones de reglas

  empresaRules: any = {}; // aquí cargaremos las reglas de la empresa

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

          // 🔹 obtenemos las reglas de la empresa desde la sucursal
          if (usuarioBD.idSucursal && usuarioBD.idSucursal.empresa) {
            this.empresaRules = usuarioBD.idSucursal.empresa;
          }
        },
        (error) => {
          console.error('Error al refrescar usuario desde BD ', error);
        }
      );
    }
  }

  private validarConReglas(password: string): string[] {
    const errores: string[] = [];
    if (!this.empresaRules) return errores;

    if (
      this.empresaRules.passwordLargo &&
      password.length < this.empresaRules.passwordLargo
    ) {
      errores.push(
        `Debe tener al menos ${this.empresaRules.passwordLargo} caracteres`
      );
    }
    if (this.empresaRules.passwordCantidadMayusculas) {
      const mayus = (password.match(/[A-Z]/g) || []).length;
      if (mayus < this.empresaRules.passwordCantidadMayusculas) {
        errores.push(
          `Debe tener al menos ${this.empresaRules.passwordCantidadMayusculas} mayúscula(s)`
        );
      }
    }
    if (this.empresaRules.passwordCantidadMinusculas) {
      const minus = (password.match(/[a-z]/g) || []).length;
      if (minus < this.empresaRules.passwordCantidadMinusculas) {
        errores.push(
          `Debe tener al menos ${this.empresaRules.passwordCantidadMinusculas} minúscula(s)`
        );
      }
    }
    if (this.empresaRules.passwordCantidadNumeros) {
      const nums = (password.match(/[0-9]/g) || []).length;
      if (nums < this.empresaRules.passwordCantidadNumeros) {
        errores.push(
          `Debe tener al menos ${this.empresaRules.passwordCantidadNumeros} número(s)`
        );
      }
    }
    if (this.empresaRules.passwordCantidadCaracteresEspeciales) {
      const specials = (password.match(/[^A-Za-z0-9]/g) || []).length;
      if (specials < this.empresaRules.passwordCantidadCaracteresEspeciales) {
        errores.push(
          `Debe tener al menos ${this.empresaRules.passwordCantidadCaracteresEspeciales} caracter(es) especial(es)`
        );
      }
    }

    return errores;
  }

  cambiarPassword() {
    this.mensaje = '';

    if (!this.nuevaPassword || !this.confirmarPassword) {
      this.mensaje = 'Debe llenar ambos campos.';
      return;
    }

    if (this.nuevaPassword !== this.confirmarPassword) {
      this.mensaje = 'Las contraseñas no coinciden.';
      return;
    }

    //  validar reglas de empresa antes de enviar
    const errores = this.validarConReglas(this.nuevaPassword);
    if (errores.length > 0) {
      this.mensaje = errores.join(' - ');
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
        error: () => {
          this.mensaje = 'Error al actualizar contraseña.';
        },
      });
  }

  /*
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
      */
}
