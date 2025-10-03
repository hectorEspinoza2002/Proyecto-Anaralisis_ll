import { Persona } from "./Persona";
import { StatusCuenta } from "./StatusCuenta";
import { TipoSaldoCuenta } from "./TipoSaldoCuenta";

export class SaldoCuenta {

  idSaldoCuenta!: number;
  persona!: Persona;
  statusCuenta!: StatusCuenta;
  tipoSaldoCuenta!: TipoSaldoCuenta;
  saldoAnterior!: number;
  debitos!: number;
  creditos!: number;
  fechaCreacion!: Date;
  usuarioCreacion!: Date;
  fechaModificacion!: Date;
  usuarioModificacion!: Date;

}
