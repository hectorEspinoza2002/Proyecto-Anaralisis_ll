import { UsuarioService } from './../../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../entity/usuario';
import { Router } from '@angular/router';
import { GeneroService } from '../../service/genero.service';
import { StatusUsuarioService } from '../../service/status-usuario.service';
import { Genero } from '../../entity/genero';
import { StatusUsuario } from '../../entity/statusUsuario';
import { Sucursal } from '../../entity/Sucursal';
import { Role } from '../../entity/Role';
import { SucursalService } from '../../service/sucursal.service';
import { RoleService } from '../../service/role.service';

@Component({
  selector: 'app-addusuario',
  standalone: false,
  templateUrl: './addusuario.component.html',
  styleUrl: './addusuario.component.css',
})
export class AddusuarioComponent implements OnInit {
  usuario = new Usuario();

  selectedStatus!: number;
  status: StatusUsuario[] = [];

  selectedGenero!: number;
  genero: Genero[] = [];

  selectedSucursal!: number;
  sucursal: Sucursal[] = [];

  selectedRole!: number;
  rol: Role[] = [];

  mensaje: String = '';

  constructor(
    private userService: UsuarioService,
    private router: Router,
    private statusService: StatusUsuarioService,
    private generoService: GeneroService,
    private sucursalService: SucursalService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  Cancelar() {
    this.router.navigate(['listusuarios']);
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

  guardarUser(user: Usuario) {
    this.usuario.idStatusUsuario = {idStatusUsuario: this.selectedStatus, } as unknown as StatusUsuario;
    this.usuario.idGenero = {idGenero: this.selectedGenero, } as unknown as Genero;
    this.usuario.idSucursal = {idSucursal: this.selectedSucursal, } as unknown as Sucursal;
    this.usuario.idRole = { idRole: this.selectedRole } as unknown as Role;

    if (
      typeof user.nombre != 'undefined' &&
      typeof user.apellido != 'undefined' &&
      this.selectedStatus &&
      this.selectedGenero &&
      this.selectedSucursal &&
      this.selectedRole
    ) {
      this.userService.addUsuario(user).subscribe({
        next: (result) => {
          if (result != null) {
            alert('Usuario: ' + user.nombre + ' ' + user.apellido + ' ingresado correctamente!' );
            this.router.navigate(['listusuarios']);
            this.resetForm();
          }
        },
        error: (error) => {
          alert(error.error);
        },
      });
    }
  }

  resetForm(): void {
    this.usuario = new Usuario();
    this.selectedStatus = null!;
    this.selectedGenero = null!;
    this.selectedSucursal = null!;
    this.selectedRole = null!;
  }

  cargarDatosIniciales(): void {
    // Cargar géneros

    this.statusService.getAll().subscribe({
      next: (data) => {
        this.status = data;
      },
      error: (err) => {
        this.mensaje = 'Error al traer el status usuario';
      },
    });

    this.generoService.getAll().subscribe({
      next: (d) => {
        this.genero = d;
      },
      error: (err) => {
        this.mensaje = 'Error al traer el genero';
      },
    });

    this.sucursalService.getAll().subscribe({
      next: (a) => {
        this.sucursal = a;
      },
      error: (err) => {
        this.mensaje = 'Error al traer la sucursal';
      },
    });

    this.roleService.getAll().subscribe({
      next: (t) => {
        this.rol = t;
      },
      error: (err) => {
        this.mensaje = 'Error al traer el rol';
      },
    });
  }
}
