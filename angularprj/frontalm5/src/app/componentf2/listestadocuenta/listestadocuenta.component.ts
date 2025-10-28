import { Component, OnInit } from '@angular/core';
import { Persona } from '../../entityf2/Persona';
import { SaldoCuenta } from '../../entityf2/SaldoCuenta';
import { PersonaService } from '../../servicef2/persona.service';
import { SaldocuentaService } from '../../servicef2/saldocuenta.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-listestadocuenta',
  standalone: false,
  templateUrl: './listestadocuenta.component.html',
  styleUrl: './listestadocuenta.component.css',
})
export class ListestadocuentaComponent implements OnInit {
  personaBusqueda: string = '';
  personas: Persona[] = [];
  personasFiltradas: Persona[] = [];
  cuentas: SaldoCuenta[] = [];

  personaSeleccionada?: Persona;

  // permisos
  puedeAlta = false;
  puedeBaja = false;
  puedeCambio = false;
  puedeExportar = true;
  puedeImprimir = true;

  constructor(
    private personaService: PersonaService,
    private saldoCuentaService: SaldocuentaService
  ) {}

  ngOnInit(): void {
    this.personaService.getAll().subscribe({
      next: (data) => (this.personas = data),
    });
  }

  buscarPersona() {
    const term = this.personaBusqueda.toLowerCase().trim();

    if (term) {
      this.personasFiltradas = this.personas.filter(
        (p) =>
          p.nombre.toLowerCase().includes(term) ||
          p.apellido.toLowerCase().includes(term) ||
          p.idPersona.toString().includes(term)
      );

      if (this.personasFiltradas.length === 0 && !isNaN(Number(term))) {
        const idCuenta = Number(term);
        this.saldoCuentaService.getCuentaById(idCuenta.toString()).subscribe({
          next: (cuenta) => {
            if (cuenta && cuenta.persona) {
              this.personasFiltradas = [cuenta.persona];
            } else {
              this.personasFiltradas = [];
            }
          },
          error: () => (this.personasFiltradas = []),
        });
      }
    } else {
      this.personasFiltradas = [];
    }
  }

  seleccionarPersona(p: Persona) {
    this.personaSeleccionada = p;
    this.personaBusqueda = `${p.idPersona} - ${p.nombre} ${p.apellido}`;
    this.personasFiltradas = [];

    this.saldoCuentaService.getCuentasByPersona(p.idPersona).subscribe({
      next: (result) => {
        this.cuentas = result;

        // 🔹 Para cada cuenta, traer sus movimientos
        this.cuentas.forEach((cuenta) => {
          this.saldoCuentaService
            .getMovimientosPorCuenta(cuenta.idSaldoCuenta)
            .subscribe({
              next: (movimientos) => {
                cuenta['movimientos'] = movimientos;
              },
            });
        });
      },
    });
  }

  // Calcula el saldo acumulado hasta un movimiento dado
  calcularSaldoHasta(cuenta: SaldoCuenta, index: number): number {
    if (!cuenta.movimientos || cuenta.movimientos.length === 0) {
      //return cuenta.saldoAnterior || 0;
      return Math.abs(cuenta.saldoAnterior || 0);
    }

    let saldo = cuenta.saldoAnterior || 0;
    for (let i = 0; i <= index; i++) {
      const mov = cuenta.movimientos[i];
      //saldo += (mov.abonos || 0) - (mov.cargos || 0);
      saldo += (mov.cargos || 0) - (mov.abonos || 0);
    }
    return saldo;
  }

  getTotalCargos(): number {
    return (
      this.cuentas?.reduce(
        (total, c) =>
          total +
          (c.movimientos?.reduce((t, m) => t + (m.cargos || 0), 0) || 0),
        0
      ) || 0
    );
  }

  getTotalAbonos(): number {
    // Suma los abonos de todas las cuentas y sus movimientos
    return (
      this.cuentas?.reduce(
        (totalCuentas, c) =>
          totalCuentas +
          (c.movimientos?.reduce(
            (t: number, m: any) => t + (m.abonos || 0),
            0
          ) || 0),
        0
      ) || 0
    );
  }

  getSaldoFinalPorCuenta(cuenta: any): number {
    const saldoAnterior = cuenta.saldoAnterior || 0;
    const totalAbonos =
      cuenta.movimientos?.reduce(
        (t: number, m: any) => t + (m.abonos || 0),
        0
      ) || 0;
    const totalCargos =
      cuenta.movimientos?.reduce(
        (t: number, m: any) => t + (m.cargos || 0),
        0
      ) || 0;

    return saldoAnterior + totalCargos - totalAbonos;
  }

    /*---------------------- GENERACION DE EXCEL Y PDF -------------------------------------- */
  generarPdf(cuenta: SaldoCuenta): void {
    this.saldoCuentaService
      .getMovimientosPorCuenta(cuenta.idSaldoCuenta)
      .subscribe({
        next: (movimientos) => this.exportarPdf(cuenta, movimientos),
        error: () => alert('❌ Error al obtener movimientos'),
      });
  }

  generarExcel(cuenta: SaldoCuenta): void {
    this.saldoCuentaService
      .getMovimientosPorCuenta(cuenta.idSaldoCuenta)
      .subscribe({
        next: (movimientos) => this.exportarExcel(cuenta, movimientos),
        error: () => alert('❌ Error al obtener movimientos'),
      });
  }

  exportarPdf(cuenta: any, movimientos: any[]): void {
    const doc = new jsPDF();
    const cliente = this.personaSeleccionada!;
    const fechaEmision = new Date().toLocaleDateString();

    // 📅 Determinar periodo (si no viene desde la cuenta)
    const fechaDesde = cuenta.fechaDesde
      ? new Date(cuenta.fechaDesde)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const fechaHasta = cuenta.fechaHasta
      ? new Date(cuenta.fechaHasta)
      : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    // 🔍 Filtrar movimientos dentro del periodo
    const movimientosFiltrados = movimientos.filter((m) => {
      const fechaMov = new Date(m.fechaMovimiento);
      return fechaMov >= fechaDesde && fechaMov <= fechaHasta;
    });

    // 🧮 Variables de control
    const body: any[] = [];
    let saldoAcumulado = cuenta.saldoAnterior || 0;
    let totalCargos = 0;
    let totalAbonos = 0;

    // 🔹 Encabezado
    doc.setFontSize(14);
    doc.text('ESTADO DE CUENTA', 80, 10);

    doc.setFontSize(11);
    doc.text(`Cliente: ${cliente.nombre} ${cliente.apellido}`, 14, 25);
    doc.text(`Cuenta: ${cuenta.idSaldoCuenta}`, 14, 32);
    doc.text(`Fecha de Emisión: ${fechaEmision}`, 14, 39);
    doc.text(
      `Período: Desde ${fechaDesde.toLocaleDateString()}  Hasta ${fechaHasta.toLocaleDateString()}`,
      14,
      46
    );

    // 🧮 Si hay movimientos en el periodo
    if (movimientosFiltrados.length > 0) {
      movimientosFiltrados.forEach((m) => {
        saldoAcumulado += m.cargos - m.abonos;
        totalCargos += m.cargos;
        totalAbonos += m.abonos;

        body.push([
          new Date(m.fechaMovimiento).toLocaleDateString(),
          m.tipoMovimiento || '',
          m.descripcion || '',
          `Q${m.cargos.toFixed(2)}`,
          `Q${m.abonos.toFixed(2)}`,
          `Q${saldoAcumulado.toFixed(2)}`,
        ]);
      });
    } else {
      // ⚠️ Sin movimientos del periodo
      body.push([
        '',
        'Sin movimientos en el período.',
        '',
        '',
        '',
        `Q${saldoAcumulado.toFixed(2)}`,
      ]);
    }

    autoTable(doc, {
      head: [
        [
          'Fecha',
          'Tipo Movimiento',
          'Descripción',
          'Cargo (Q)',
          'Abono (Q)',
          'Saldo Acumulado (Q)',
        ],
      ],
      body,
      startY: 55,
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [220, 220, 220], textColor: 0 },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 30 },
        2: { cellWidth: 50 },
        3: { halign: 'right' },
        4: { halign: 'right' },
        5: { halign: 'right' },
      },
    });

    // 🧾 Totales
    const yFinal = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.text(`Total Cargos: Q${totalCargos.toFixed(2)}`, 14, yFinal);
    doc.text(`Total Abonos: Q${totalAbonos.toFixed(2)}`, 80, yFinal);
    doc.text(`Saldo Final: Q${saldoAcumulado.toFixed(2)}`, 150, yFinal);

    // 💾 Guardar
    doc.save(`EstadoCuenta_${cliente.nombre}_${cuenta.idSaldoCuenta}.pdf`);
  }

  exportarExcel(cuenta: any, movimientos: any[]): void {
    const cliente = this.personaSeleccionada!;
    const fechaEmision = new Date().toLocaleDateString();

    const fechaDesde = cuenta.fechaDesde ? new Date(cuenta.fechaDesde) : null;
    const fechaHasta = cuenta.fechaHasta ? new Date(cuenta.fechaHasta) : null;

    // 🧮 Filtrar movimientos por el período
    let movimientosFiltrados = movimientos;
    if (fechaDesde && fechaHasta) {
      movimientosFiltrados = movimientos.filter((m) => {
        const fecha = new Date(m.fechaMovimiento);
        return fecha >= fechaDesde && fecha <= fechaHasta;
      });
    }

    let saldoAcumulado = cuenta.saldoAnterior || 0;
    let totalCargos = 0;
    let totalAbonos = 0;

    const dataMovimientos = movimientosFiltrados.map((m) => {
      saldoAcumulado = saldoAcumulado + m.abonos - m.cargos;
      totalCargos += m.cargos;
      totalAbonos += m.abonos;

      return {
        'Fecha Movimiento': new Date(m.fechaMovimiento).toLocaleDateString(),
        'Tipo Movimiento': m.tipoMovimiento || '',
        Descripción: m.descripcion || '',
        'Cargo (Q)': m.cargos,
        'Abono (Q)': m.abonos,
        'Saldo Acumulado (Q)': saldoAcumulado,
      };
    });

    const encabezado = [
      [`ESTADO DE CUENTA`],
      [],
      [`Nombre del Cliente: ${cliente.nombre} ${cliente.apellido}`],
      [`Número de Cuenta: ${cuenta.idSaldoCuenta}`],
      [`Fecha de Emisión: ${fechaEmision}`],
      [
        `Período: Desde ${cuenta.fechaDesde ?? '__/__/____'}  Hasta ${
          cuenta.fechaHasta ?? '__/__/____'
        }`,
      ],
      [],
      ['Detalle de Movimientos:'],
    ];

    const totales = [
      [],
      [`Total Cargos: Q${totalCargos.toFixed(2)}`],
      [`Total Abonos: Q${totalAbonos.toFixed(2)}`],
      [`Saldo Final: Q${saldoAcumulado.toFixed(2)}`],
    ];

    const ws = XLSX.utils.aoa_to_sheet(encabezado);
    if (dataMovimientos.length > 0) {
      XLSX.utils.sheet_add_json(ws, dataMovimientos, { origin: -1 });
    } else {
      XLSX.utils.sheet_add_aoa(
        ws,
        [['No existen movimientos en este período']],
        {
          origin: -1,
        }
      );
    }
    XLSX.utils.sheet_add_aoa(ws, totales, { origin: -1 });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Estado de Cuenta');

    ws['!cols'] = [
      { wch: 15 },
      { wch: 25 },
      { wch: 45 },
      { wch: 12 },
      { wch: 12 },
      { wch: 18 },
    ];

    XLSX.writeFile(
      wb,
      `EstadoCuenta_${cliente.nombre}_${cuenta.idSaldoCuenta}.xlsx`
    );
  }
}
