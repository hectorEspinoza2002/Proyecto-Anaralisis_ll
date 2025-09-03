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

@Component({
  selector: 'app-addusuario',
  standalone: false,
  templateUrl: './addusuario.component.html',
  styleUrl: './addusuario.component.css',
})
export class AddusuarioComponent implements OnInit {
  usuario = new Usuario;
  /*
  genero = new Genero;
  status = new StatusUsuario;
  role = new Role;
  sucursal = new Sucursal;
  */

  generosDisponibles: Genero[] = [];
  statusDisponibles: StatusUsuario[] = [];
  sucursalesDisponibles: Sucursal[] = [];
  rolesDisponibles: Role[] = [];
  mensaje: String = '';
  reglasEmpresa: any = {};

  selectedGenero!: number;
  selectedStatus!: number;
  selectedSucursal!: number;
  selectedRole!: number;

  constructor(
    private userService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {
    // Cargar géneros
    this.userService.getGeneros().subscribe({
      next: (generos) => {
        this.generosDisponibles = generos
      },
      error: (err) => {
        this.mensaje = 'Error al traer generos',err;
      }
    });

    // Cargar status
    this.userService.getStatusUsuarios().subscribe({
      next: (status) => {
        this.statusDisponibles = status
      },
      error: (error) => console.error('Error cargando status:', error)
    });

    // Cargar sucursales
    this.userService.getSucursales().subscribe({
      next: (sucursales) => {
        this.sucursalesDisponibles = sucursales
      },
      error: (error) => console.error('Error cargando sucursales:', error)
    });

    // Cargar roles
    this.userService.getRoles().subscribe({
      next: (roles) => {
        this.rolesDisponibles = roles
      },
      error: (error) => console.error('Error cargando roles:', error)
    });
  }


  onSucursalChange(): void {
    if (this.selectedSucursal) {
      this.userService.getReglasEmpresa(this.selectedSucursal).subscribe({
        next: (reglas) => this.reglasEmpresa = reglas,
        error: (error) => console.error('Error cargando reglas:', error)
      });
    }
  }


  resetForm(): void {

    this.usuario = new Usuario();
    this.selectedGenero = null!;
    this.selectedSucursal = null!;
    this.selectedStatus = null!;
    this.selectedRole = null!;
  }

  Cancel(): void {
    this.router.navigate(['/listusuarios']);
  }

  guardarUser(usuario:Usuario) {

    // Vincular objetos relacionados con solo el id seleccionado
    usuario.idGenero = { idGenero: this.selectedGenero } as Partial<Genero> as Genero;
    usuario.idStatusUsuario = { idStatusUsuario: this.selectedStatus } as Partial<StatusUsuario> as StatusUsuario;
    usuario.idSucursal = { idSucursal: this.selectedSucursal } as Partial<Sucursal> as Sucursal;
    usuario.idRole = { idRol: this.selectedRole } as Partial<Role> as Role;

    if (this.validarFormulario()) {
      this.userService.addUsuario(usuario).subscribe((result) => {
        if (result != null) {
          alert('Usuario: ' + usuario.nombre + ' ingresado correctamente!');
          this.router.navigate(['listusuarios']);
        }
        this.resetForm();
      });
    } else {
      alert('Debe ingresar todos los datos obligatorios!');
    }

  }

  private validarFormulario(): boolean {
    return !!(
      this.usuario.idUsuario &&
      this.usuario.nombre &&
      this.usuario.apellido &&
      this.usuario.fechaNacimiento &&
      this.selectedGenero &&
      this.selectedStatus &&
      this.usuario.password &&
      this.usuario.correoElectronico &&
      this.selectedSucursal &&
      this.selectedRole
      /*&&
      this.usuario.pregunta &&
      this.usuario.respuesta*/
    );
  }
}
