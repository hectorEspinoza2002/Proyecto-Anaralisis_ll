import { Genero } from "../entity/genero";
import { EstadoCivil } from "./EstadoCivil";

export class Persona {

  idPersona!: Number;
  nombre!: String;
  apellido!: String;
  fechaNacimiento!: Date;
  genero!: Genero;
  direccion!: String;
  telefono!: String;
  correoElectronico!: String;
  estadoCivil!: EstadoCivil;
  fechaCreacion!: Date;
  usuarioCreacion!: String;
  fechaModificacion!: Date;
  usuarioModificacion!: String;

}
