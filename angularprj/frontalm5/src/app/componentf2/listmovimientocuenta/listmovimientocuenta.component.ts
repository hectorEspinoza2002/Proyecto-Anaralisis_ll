import { Component, OnInit } from '@angular/core';
import { MovimientocuentaService } from '../../servicef2/movimientocuenta.service';
import { SaldocuentaService } from '../../servicef2/saldocuenta.service';
import { TipomovimientocxcService } from '../../servicef2/tipomovimientocxc.service';
import { Router } from '@angular/router';
import { MovimientoCuenta } from '../../entityf2/MovimientoCuenta';
import { SaldoCuenta } from '../../entityf2/SaldoCuenta';
import { TipoMovimientoCxc } from '../../entityf2/TipoMovimientoCxc';

@Component({
  selector: 'app-listmovimientocuenta',
  standalone: false,
  templateUrl: './listmovimientocuenta.component.html',
  styleUrl: './listmovimientocuenta.component.css',
})
export class ListmovimientocuentaComponent implements OnInit {
  movimiento = new MovimientoCuenta();

  cuentas: SaldoCuenta[] = [];
  filteredCuentas: SaldoCuenta[] = [];

  tiposMovimiento: TipoMovimientoCxc[] = [];

  selectedCuenta!: number;
  selectedTipoMovimiento!: number;

  searchCuenta: string = '';
  cuentaSeleccionadaTexto: string = '';

  // 🟩 Nueva propiedad para mostrar saldo
  saldoActual: number | null = null;

  constructor(
    private movimientoService: MovimientocuentaService,
    private saldoService: SaldocuentaService,
    private tipoService: TipomovimientocxcService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.saldoService.getAllCuentas().subscribe({
      next: (data) => {
        this.cuentas = data;
        this.filteredCuentas = data;
      },
    });

    this.tipoService.getAll().subscribe({
      next: (data) => (this.tiposMovimiento = data),
    });
  }

  filtrarCuentas(): void {
    const term = this.searchCuenta.toLowerCase();
    this.filteredCuentas = this.cuentas.filter(
      (c) =>
        c.idSaldoCuenta.toString().includes(term) ||
        c.tipoSaldoCuenta.nombre.toLowerCase().includes(term) ||
        c.persona?.nombre?.toLowerCase().includes(term) ||
        c.persona?.apellido?.toLowerCase().includes(term)
    );
  }

  seleccionarCuenta(c: SaldoCuenta): void {
    const estado = c.statusCuenta?.nombre || '';

    if (estado !== 'Cuenta Activa' && estado !== 'Cuenta activa') {
      alert(
        `⚠️ La cuenta #${c.idSaldoCuenta} está "${c.statusCuenta.nombre}" y no puede recibir movimientos.`
      );
      this.selectedCuenta = null!;
      this.cuentaSeleccionadaTexto = '';
      this.searchCuenta = '';
      this.filteredCuentas = [];
      this.saldoActual = null; // reset saldo
      return;
    }

    // ✅ Si está activa
    this.selectedCuenta = c.idSaldoCuenta;
    this.cuentaSeleccionadaTexto = `${c.idSaldoCuenta} - ${c.tipoSaldoCuenta.nombre} - ${c.persona.nombre} ${c.persona.apellido}`;
    this.searchCuenta = '';
    this.filteredCuentas = [];

    // 🧮 Calcular saldo actual (SaldoAnterior + Créditos - Débitos)
    const saldo = (c.saldoAnterior ?? 0) + (c.creditos ?? 0) - (c.debitos ?? 0);
    this.saldoActual = saldo;
  }

  guardarMovimiento(): void {
    console.log('Movimiento enviado:', this.movimiento);

    if (
      !this.selectedCuenta ||
      !this.selectedTipoMovimiento ||
      !this.movimiento.valorMovimiento
    ) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    this.movimiento.saldoCuenta = {
      idSaldoCuenta: this.selectedCuenta,
    } as unknown as SaldoCuenta;
    this.movimiento.tipoMovimientoCXC = {
      idTipoMovimientoCXC: this.selectedTipoMovimiento,
    } as unknown as TipoMovimientoCxc;

    this.movimientoService.createMovimiento(this.movimiento).subscribe({
      next: () => {
        alert('Movimiento registrado correctamente.');

        // 🔄 Actualizar saldo mostrado
        if (this.selectedCuenta && this.saldoActual !== null) {
          const tipo = this.tiposMovimiento.find(
            (t) => t.idTipoMovimientoCXC === this.selectedTipoMovimiento
          );
          const valor = this.movimiento.valorMovimiento ?? 0;

          if (tipo?.operacionCuentaCorriente === 1) {
            // CARGO → aumenta débito → saldo disminuye
            this.saldoActual -= valor;
          } else if (tipo?.operacionCuentaCorriente === 2) {
            // ABONO → aumenta crédito → saldo aumenta
            this.saldoActual += valor;
          }
        }

        this.resetForm();
        this.router.navigate(['/listmovimientocuenta']);
      },
      error: (err) => {
        alert('Error al registrar movimiento: ' + err.message);
      },
    });

    /*
    this.movimientoService.createMovimiento(this.movimiento).subscribe({
      next: () => {
        alert('Movimiento registrado correctamente.');
        this.router.navigate(['/listmovimientocuenta']);
        this.resetForm();
      },
      error: (err) => {
        alert('Error al registrar movimiento: ' + err.message);
      },
    });
    */
  }

  cancelar(): void {
    this.router.navigate(['/listmovimientocuenta']);
  }

  resetForm(): void {
    this.movimiento = new MovimientoCuenta();
    this.selectedCuenta = null!;
    this.selectedTipoMovimiento = null!;
    this.movimiento.valorMovimiento = null!;
    this.movimiento.descripcion = '';
    this.cuentaSeleccionadaTexto = '';
    this.saldoActual = null;
  }

  /*---------------------------------- v2 ------------------------------------------------- */
  /*
  movimiento = new MovimientoCuenta();

  cuentas: SaldoCuenta[] = [];
  filteredCuentas: SaldoCuenta[] = [];

  tiposMovimiento: TipoMovimientoCxc[] = [];

  selectedCuenta!: number;
  selectedTipoMovimiento!: number;

  searchCuenta: string = '';
  cuentaSeleccionadaTexto: string = '';

  constructor(
    private movimientoService: MovimientocuentaService,
    private saldoService: SaldocuentaService,
    private tipoService: TipomovimientocxcService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.saldoService.getAllCuentas().subscribe({
      next: (data) => {
        this.cuentas = data;
        this.filteredCuentas = data;
      },
    });

    this.tipoService.getAll().subscribe({
      next: (data) => (this.tiposMovimiento = data),
    });
  }

  // 🔍 Filtrar cuentas según búsqueda
  filtrarCuentas(): void {
    const term = this.searchCuenta.toLowerCase();
    this.filteredCuentas = this.cuentas.filter(
      (c) =>
        c.idSaldoCuenta.toString().includes(term) ||
        c.tipoSaldoCuenta.nombre.toLowerCase().includes(term) ||
        (c.persona?.nombre?.toLowerCase().includes(term) ||
          c.persona?.apellido?.toLowerCase().includes(term))
    );
  }

  // ✅ Seleccionar cuenta con validación de estado
  seleccionarCuenta(c: SaldoCuenta): void {
    // Verificar si la cuenta está activa
    const estado = c.statusCuenta?.nombre || '';

    if (estado !== 'Cuenta Activa' && estado !== 'Cuenta Activa') {
      alert(`⚠️ La cuenta #${c.idSaldoCuenta} está "${c.statusCuenta.nombre}" y no puede recibir movimientos.`);
      this.selectedCuenta = null!;
      this.cuentaSeleccionadaTexto = '';
      this.searchCuenta = '';
      this.filteredCuentas = [];
      return;
    }

    // Si está activa, permitir selección
    this.selectedCuenta = c.idSaldoCuenta;
    this.cuentaSeleccionadaTexto = `${c.idSaldoCuenta} - ${c.tipoSaldoCuenta.nombre} - ${c.persona.nombre} ${c.persona.apellido}`;
    this.searchCuenta = '';
    this.filteredCuentas = [];
  }

  guardarMovimiento(): void {
    if (!this.selectedCuenta || !this.selectedTipoMovimiento || !this.movimiento.valorMovimiento) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    this.movimiento.saldoCuenta = { idSaldoCuenta: this.selectedCuenta } as unknown as SaldoCuenta;
    this.movimiento.tipoMovimientoCXC = { idTipoMovimientoCXC: this.selectedTipoMovimiento } as unknown as TipoMovimientoCxc;

    this.movimientoService.createMovimiento(this.movimiento).subscribe({
      next: () => {
        alert('Movimiento registrado correctamente.');
        this.router.navigate(['/listmovimientocuenta']);
        this.resetForm();
      },
      error: (err) => {
        alert('Error al registrar movimiento: ' + err.message);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/listmovimientocuenta']);
  }

  resetForm(): void {
    this.movimiento = new MovimientoCuenta();
    this.selectedCuenta = null!;
    this.selectedTipoMovimiento = null!;
    this.movimiento.valorMovimiento = null!;
    this.movimiento.descripcion = '';
    this.cuentaSeleccionadaTexto = '';
  }
*/
  /*-------------------------------------------v1------------------------------------------------------------*/

  /* Si funcion el buscador, sin validacion del status cuenta
  movimiento = new MovimientoCuenta();

  cuentas: SaldoCuenta[] = [];
  filteredCuentas: SaldoCuenta[] = [];

  tiposMovimiento: TipoMovimientoCxc[] = [];

  selectedCuenta!: number;
  selectedTipoMovimiento!: number;

  searchCuenta: string = '';
  cuentaSeleccionadaTexto: string = '';

  constructor(
    private movimientoService: MovimientocuentaService,
    private saldoService: SaldocuentaService,
    private tipoService: TipomovimientocxcService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.saldoService.getAllCuentas().subscribe({
      next: (data) => {
        this.cuentas = data;
        this.filteredCuentas = data;
      },
    });

    this.tipoService.getAll().subscribe({
      next: (data) => (this.tiposMovimiento = data),
    });
  }

  // 🔍 Filtrar cuentas según búsqueda
  filtrarCuentas(): void {
    const term = this.searchCuenta.toLowerCase();
    this.filteredCuentas = this.cuentas.filter(
      (c) =>
        c.idSaldoCuenta.toString().includes(term) ||
        c.tipoSaldoCuenta.nombre.toLowerCase().includes(term) ||
        (c.persona?.nombre?.toLowerCase().includes(term) ||
          c.persona?.apellido?.toLowerCase().includes(term))
    );
  }

  // ✅ Seleccionar cuenta
  seleccionarCuenta(c: SaldoCuenta): void {
    this.selectedCuenta = c.idSaldoCuenta;
    this.cuentaSeleccionadaTexto = `${c.idSaldoCuenta} - ${c.tipoSaldoCuenta.nombre} - ${c.persona.nombre} ${c.persona.apellido}`;
    this.searchCuenta = '';
    this.filteredCuentas = [];
  }

  guardarMovimiento(): void {
    if (!this.selectedCuenta || !this.selectedTipoMovimiento || !this.movimiento.valorMovimiento) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    this.movimiento.saldoCuenta = { idSaldoCuenta: this.selectedCuenta } as unknown as SaldoCuenta;
    this.movimiento.tipoMovimientoCXC = { idTipoMovimientoCXC: this.selectedTipoMovimiento } as unknown as TipoMovimientoCxc;

    this.movimientoService.createMovimiento(this.movimiento).subscribe({
      next: () => {
        alert('Movimiento registrado correctamente.');
        this.router.navigate(['/listmovimientocuenta']);
        this.resetForm();
      },
      error: (err) => {
        alert('Error al registrar movimiento: ' + err.message);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/listmovimientocuenta']);
  }

  resetForm(): void {
    this.movimiento = new MovimientoCuenta();
    this.selectedCuenta = null!;
    this.selectedTipoMovimiento = null!;
    this.movimiento.valorMovimiento = null!;
    this.movimiento.descripcion = '';
    this.cuentaSeleccionadaTexto = '';
  }*/

  /*
  movimiento = new MovimientoCuenta();

  cuentas: SaldoCuenta[] = [];
  tiposMovimiento: TipoMovimientoCxc[] = [];

  selectedCuenta!: number;
  selectedTipoMovimiento!: number;

  constructor(
    private movimientoService: MovimientocuentaService,
    private saldoService: SaldocuentaService,
    private tipoService: TipomovimientocxcService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {

    this.saldoService.getAllCuentas().subscribe({
      next: (data) => (this.cuentas = data),
    });

    this.tipoService.getAll().subscribe({
      next: (data) => (this.tiposMovimiento = data),
    });
  }

  guardarMovimiento(): void {
    if (!this.selectedCuenta || !this.selectedTipoMovimiento || !this.movimiento.valorMovimiento) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    this.movimiento.saldoCuenta = { idSaldoCuenta: this.selectedCuenta } as unknown as SaldoCuenta;
    this.movimiento.tipoMovimientoCXC = { idTipoMovimientoCXC: this.selectedTipoMovimiento } as unknown as TipoMovimientoCxc;
    //this.movimiento.fechaMovimiento = new Date();

    this.movimientoService.createMovimiento(this.movimiento).subscribe({
      next: () => {
        alert('Movimiento registrado correctamente.');
        this.router.navigate(['/listmovimientocuenta']);
        this.resetForm();
      },
      error: (err) => {
        alert('Error al registrar movimiento: ' + err.message);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/listmovimientocuenta']);
  }

  resetForm(): void {
    this.movimiento = new MovimientoCuenta();
    this.selectedCuenta = null!;
    this.selectedTipoMovimiento = null!;
    this.movimiento.valorMovimiento = null!;
    this.movimiento.descripcion = '';
  }*/
}
