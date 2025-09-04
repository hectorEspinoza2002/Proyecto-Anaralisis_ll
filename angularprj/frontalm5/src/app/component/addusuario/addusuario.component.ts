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
  usuario = new Usuario();

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

  constructor(private userService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {
    // Cargar géneros
  }
}
