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
  usuario: Usuario = {} as Usuario;

  generosDisponibles: Genero[] = [];
  statusDisponibles: StatusUsuario[] = [];
  sucursalesDisponibles: Sucursal[] = [];
  rolesDisponibles: Role[] = [];
  reglasEmpresa: any = {};

  selectedGenero: number = 0;
  selectedStatus: number = 0;
  selectedSucursal: number = 0;
  selectedRole: number = 0;

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
      next: (generos) => this.generosDisponibles = generos,
      error: (error) => console.error('Error cargando géneros:', error)
    });

    // Cargar status
    this.userService.getStatusUsuarios().subscribe({
      next: (status) => this.statusDisponibles = status,
      error: (error) => console.error('Error cargando status:', error)
    });

    // Cargar sucursales
    this.userService.getSucursales().subscribe({
      next: (sucursales) => this.sucursalesDisponibles = sucursales,
      error: (error) => console.error('Error cargando sucursales:', error)
    });

    // Cargar roles
    this.userService.getRoles().subscribe({
      next: (roles) => this.rolesDisponibles = roles,
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

  Cancel(): void {
    this.router.navigate(['/listusuarios']);
  }

  guardarUser(): void {
    if (!this.validarFormulario()) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    // Asignar valores seleccionados
    this.usuario.idGenero = this.generosDisponibles.find(g => g.idGenero === this.selectedGenero)!;
    this.usuario.idStatusUsuario = this.statusDisponibles.find(s => s.idStatusUsuario === this.selectedStatus)!;
    this.usuario.idSucursal = this.sucursalesDisponibles.find(s => s.idSucursal === this.selectedSucursal)!;
    this.usuario.idRole = this.rolesDisponibles.find(r => r.idRole === this.selectedRole)!;

    // Configurar valores por defecto
    this.usuario.fechaCreacion = new Date();
    this.usuario.usuarioCreacion = 'Administrador';
    this.usuario.intentosDeAcceso = 0;
    this.usuario.requiereCambiarPassword = 1;

    this.userService.addUsuarios(this.usuario).subscribe({
      next: (result) => {
        alert(`Usuario ${result.nombre} ${result.apellido} creado correctamente!`);
        this.router.navigate(['/listusuarios']);
      },
      error: (error) => {
        console.error('Error creando usuario:', error);
        alert('Error al crear usuario: ' + (error.error?.message || error.message));
      }
    });
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
      this.selectedRole &&
      this.usuario.pregunta &&
      this.usuario.respuesta
    );
  }
}
