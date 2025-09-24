import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../entity/usuario';
import { StatusUsuario } from '../../entity/statusUsuario';
import { Genero } from '../../entity/genero';
import { Sucursal } from '../../entity/Sucursal';
import { Role } from '../../entity/Role';
import { StatusUsuarioService } from '../../service/status-usuario.service';
import { GeneroService } from '../../service/genero.service';
import { SucursalService } from '../../service/sucursal.service';
import { RoleService } from '../../service/role.service';
import { EmpresaService } from '../../service/empresa.service';

@Component({
  selector: 'app-editusuario',
  standalone: false,
  templateUrl: './editusuario.component.html',
  styleUrl: './editusuario.component.css',
})
export class EditusuarioComponent implements OnInit, AfterViewInit {
  usuario: Usuario = new Usuario();
  mensaje: string = '';

  selectedStatus: Number | null = null;
  statusUsuarios: StatusUsuario[] = [];

  selectedGenero: Number | null = null;
  genero: Genero[] = [];

  selectedSucursal: number | null = null;
  sucursal: Sucursal[] = [];

  selectedRol: Number | null = null;
  rol: Role[] = [];

  //variables para traer datos de empresa
  empresaRules: any = null;
  passwordValidations: string[] = [];

  @ViewChild('myFocus') myFocus: any;

  constructor(
    private userService: UsuarioService,
    private router: Router,
    private statusService: StatusUsuarioService,
    private generoService: GeneroService,
    private sucursalservice: SucursalService,
    private rolService: RoleService,
    private empresaService: EmpresaService
  ) {}

  ngOnInit(): void {
    this.selectEdit();
    this.cargarDatosIniciales();
  }

  ngAfterViewInit(): void {
    this.myFocus.nativeElement.focus();
  }

  selectEdit() {
    let id = localStorage.getItem('id');
    if (id) {
      this.userService.buscarUsuarioId(id).subscribe((result) => {
        this.usuario = result;
        this.usuario.password = '';
        this.selectedStatus = result.idStatusUsuario?.idStatusUsuario ?? null;
        this.selectedGenero = result.idGenero?.idGenero ?? null;
        this.selectedSucursal = result.idSucursal?.idSucursal ?? null;
        this.selectedRol = result.idRole?.idRole ?? null;

        if (this.selectedSucursal) {
          this.empresaService
            .getEmpresaPorSucursal(this.selectedSucursal)
            .subscribe({
              next: (empresa) => {
                this.empresaRules = empresa;
                if (this.usuario.password) {
                  this.validarPassword(this.usuario.password);
                }
              },
              error: () => {
                this.empresaRules = null;
                this.passwordValidations = [];
              },
            });
        }
      });
    }
  }

  editUser(user: Usuario): void {
    if (
      this.selectedStatus &&
      this.selectedGenero &&
      this.selectedSucursal &&
      this.selectedRol
    ) {
      user.idStatusUsuario = {idStatusUsuario: this.selectedStatus} as StatusUsuario;
      user.idGenero = { idGenero: this.selectedGenero } as Genero;
      user.idSucursal = { idSucursal: this.selectedSucursal } as Sucursal;
      user.idRole = { idRole: this.selectedRol } as Role;
    }

    // 🔹 Si contraseña está vacía, no la mandamos
    if (!user.password || user.password.trim() === '') {
      delete (user as any).password;
    }

    const id = localStorage.getItem('id');
    if (id) {
      this.userService.editUsuario(id, user).subscribe((result) => {
        this.usuario = result;
        this.router.navigate(['listusuarios']);
        alert(user.nombre + ' modificado!');
        this.resetForm();
      });
    }
  }

  Cancelar() {
    this.router.navigate(['listusuarios']);
  }

  private resetForm(): void {
    this.usuario = new Usuario();
    this.selectedStatus = null;
    this.selectedGenero = null;
    this.selectedSucursal = null;
    this.selectedRol = null;
    this.usuario.fotografia = '';
  }

  cargarDatosIniciales(): void {
    this.statusService.getAll().subscribe({
      next: (data) => {
        this.statusUsuarios = data;
      },
      error: (err) => {
        this.mensaje = 'Error al traer estatus de usuario';
        console.error(err);
      },
    });

    this.generoService.getAll().subscribe({
      next: (data) => {
        this.genero = data;
      },
      error: (err) => {
        this.mensaje = 'Error al traer generos';
        console.error(err);
      },
    });

    this.sucursalservice.getAll().subscribe({
      next: (data) => {
        this.sucursal = data;
      },
      error: (err) => {
        this.mensaje = 'Error al traer sucursales';
        console.error(err);
      },
    });

    this.rolService.getAll().subscribe({
      next: (data) => {
        this.rol = data;
      },
      error: (err) => {
        this.mensaje = 'Erro al traer roles';
        console.error(err);
      },
    });

    if (this.selectedSucursal) {
      this.empresaService
        .getEmpresaPorSucursal(this.selectedSucursal)
        .subscribe({
          next: (empresa) => {
            this.empresaRules = empresa;
          },
          error: () => {
            this.empresaRules = null;
            this.passwordValidations = [];
          },
        });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        this.usuario.fotografia = base64String; // ahora solo el binario en base64
      };
      reader.readAsDataURL(file);
    }
  }
  /*
  validarPassword(password: string) {
    this.passwordValidations = [];
    if (!/[A-Z]/.test(password))
      this.passwordValidations.push('Debe tener al menos una mayúscula');
    if (!/[a-z]/.test(password))
      this.passwordValidations.push('Debe tener al menos una minúscula');
    if (!/[0-9]/.test(password))
      this.passwordValidations.push('Debe tener un número');
    if (!/[@$!%*?&]/.test(password))
      this.passwordValidations.push('Debe tener un carácter especial');
    if (password.length < 8)
      this.passwordValidations.push('Debe tener mínimo 8 caracteres');
  }
*/
  validarPassword(password: string) {
    this.passwordValidations = [];

    if (!this.empresaRules) return;

    if (password.length < this.empresaRules.passwordLargo) {
      this.passwordValidations.push(
        `Debe tener al menos ${this.empresaRules.passwordLargo} caracteres`
      );
    }

    const mayusculas = (password.match(/[A-Z]/g) || []).length;
    if (mayusculas < this.empresaRules.passwordCantidadMayusculas) {
      this.passwordValidations.push(
        `Debe tener al menos ${this.empresaRules.passwordCantidadMayusculas} mayúscula(s)`
      );
    }

    const minusculas = (password.match(/[a-z]/g) || []).length;
    if (minusculas < this.empresaRules.passwordCantidadMinusculas) {
      this.passwordValidations.push(
        `Debe tener al menos ${this.empresaRules.passwordCantidadMinusculas} minúscula(s)`
      );
    }

    const numeros = (password.match(/[0-9]/g) || []).length;
    if (numeros < this.empresaRules.passwordCantidadNumeros) {
      this.passwordValidations.push(
        `Debe tener al menos ${this.empresaRules.passwordCantidadNumeros} número(s)`
      );
    }

    const especiales = (password.match(/[^a-zA-Z0-9]/g) || []).length;
    if (especiales < this.empresaRules.passwordCantidadCaracteresEspeciales) {
      this.passwordValidations.push(
        `Debe tener al menos ${this.empresaRules.passwordCantidadCaracteresEspeciales} caracter(es) especial(es)`
      );
    }
  }

  onSucursalChange() {
    if (this.selectedSucursal) {
      this.empresaService
        .getEmpresaPorSucursal(this.selectedSucursal)
        .subscribe({
          next: (empresa) => {
            this.empresaRules = empresa;
            // Si ya escribió algo en password, revalida con las nuevas reglas
            if (this.usuario.password) {
              this.validarPassword(this.usuario.password);
            }
          },
          error: () => {
            this.empresaRules = null;
            this.passwordValidations = [];
          },
        });
    }
  }
}
