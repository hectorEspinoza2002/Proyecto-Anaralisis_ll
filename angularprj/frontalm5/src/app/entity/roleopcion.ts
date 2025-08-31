import { Opcion } from "./opcion";
import { Role } from "./Role";

export class RoleOpcion {

  role!: Role;
  opcion!: Opcion;
  alta!: number;
  baja!: number;
  cambio!: number;
  imprimir!: number;
  exportar!: number;
  fechaCreacion!: Date;
  usuarioCreacion!: String;
  fechaModificacion!: Date;
  usuarioModificacion!: String;

}
