import { Genero } from './genero';
import { Role } from './Role';
import { StatusUsuario } from './statusUsuario';
import { Sucursal } from './Sucursal';

export class Usuario {

  idUsuario!: string;
  nombre!: string;
  apellido!: string;
  fechaNacimiento!: Date;
  idStatusUsuario!: StatusUsuario;
  password!: string;
  idGenero!: Genero;
  ultimaFechaIngreso!: Date;
  intentosDeAcceso!: Number;
  sesionActual!: string;
  ultimaFechaCambioPassword!: Date;
  correoElectronico!: string;
  requiereCambiarPassword!: Number;
  fotografia!: String;
  telefonoMovil!: String;
  idSucursal!: Sucursal;
  pregunta!: String;
  respuesta!: String;
  idRole!: Role;
  fechaCreacion!: Date;
  usuarioCreacion!: String;
  fechaModificacion!: Date;
  usuarioModificacion!: String;
}
