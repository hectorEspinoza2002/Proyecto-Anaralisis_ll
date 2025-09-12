import { Opcion } from "./opcion";
import { Role } from "./Role";

export class RoleOpcion {

  role!: Role;
  opcion!: Opcion;
  alta!: boolean;
  baja!: boolean;
  cambio!: boolean;
  imprimir!: boolean;
  exportar!: boolean;
  fechaCreacion!: Date;
  usuarioCreacion!: String;
  fechaModificacion!: Date;
  usuarioModificacion!: String;

}
