import { Component, OnInit } from '@angular/core';
import { MovimientocuentaService } from '../../servicef2/movimientocuenta.service';
import { SaldocuentaService } from '../../servicef2/saldocuenta.service';
import { TipomovimientocxcService } from '../../servicef2/tipomovimientocxc.service';
import { Router } from '@angular/router';
import { MovimientoCuenta } from '../../entityf2/MovimientoCuenta';
import { SaldoCuenta } from '../../entityf2/SaldoCuenta';
import { TipoMovimientoCxc } from '../../entityf2/TipoMovimientoCxc';
import { PersonaService } from '../../servicef2/persona.service';
import { DocumentoPersona } from '../../entityf2/DocumentoPersona';
import { DocumentopersonaService } from '../../servicef2/documentopersona.service';

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
    private router: Router,
    private personaService: DocumentopersonaService
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

    this.personaService.getDocumentosByPersona(c.persona.idPersona).subscribe({
      next: (documentos) => {
        if(!documentos || documentos.length === 0){
          alert( `La persona ${c.persona.nombre} ${c.persona.apellido} no tiene documentos registrados y no puede realizar movimientos.`);
          this.selectedCuenta = null!;
          this.cuentaSeleccionadaTexto = '';
          this.searchCuenta = '';
          this.filteredCuentas = [];
          this.saldoActual = null;
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

      },
      error: (err) => {
        console.error('Error al verficar documentos de persona: ',err);
        alert("Error al verificar los documentos de la persona")
      }
    });
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

}
