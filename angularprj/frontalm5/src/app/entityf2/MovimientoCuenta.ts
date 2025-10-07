import { SaldoCuenta } from "./SaldoCuenta";
import { TipoMovimientoCxc } from "./TipoMovimientoCxc";

export class MovimientoCuenta {

  idMovimientoCuenta!: number;
  saldoCuenta!: SaldoCuenta;
  tipoMovimientoCXC!: TipoMovimientoCxc;
  fechaMovimiento!: Date;
  valorMovimiento!: number;
  valorMovimientoPagado!: number;
  generadoAutomaticamente!: boolean;
  descripcion!: string;
  fechaCreacion!: Date;
  usuarioCreacion!: string;
  fechaModificacion!: Date;
  usuarioModificacion!: string;

}
