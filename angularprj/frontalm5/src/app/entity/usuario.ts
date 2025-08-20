import { Genero } from './genero';
import { StatusUsuario } from './statusUsuario';

export class Usuario {

  idUsuario!: String;
  nombre!: String;
  apellido!: String;
  fechaNacimiento!: Date;
  idStatusUsuario!: StatusUsuario;
  password!: String;
  idGenero!: Genero;
  ultimaFechaIngreso!: Date;
  intentosDeAcceso!: Number;
  sesionActual!: String;
  ultimaFechaCambioPassword!: Date;
  correoElectronico!: String;
  requiereCambiarPassword!: Number;
  fotografia!: String;
  telefonoMovil!: String;
  idSucursal!: Number;
  pregunta!: String;
  respuesta!: String;
  fechaCreacion!: Date;
  usuarioCreacion!: String;
  fechaModificacion!: Date;
  usuarioModificacion!: String;
}
