import { Component, OnInit } from '@angular/core';
import { PeriodoCierremes } from '../../entityf2/PeriodoCierremes';
import { PeriodocierremesService } from '../../servicef2/periodocierremes.service';

@Component({
  selector: 'app-listperiodocierremes',
  standalone: false,
  templateUrl: './listperiodocierremes.component.html',
  styleUrl: './listperiodocierremes.component.css'
})
export class ListperiodocierremesComponent implements OnInit{

  periodos: PeriodoCierremes[] = [];
  mensaje: string = '';

  mostrarFormulario = false;

  // listas de opciones
  anios: number[] = [];
  meses = [
    { value: 1, nombre: 'Enero' },
    { value: 2, nombre: 'Febrero' },
    { value: 3, nombre: 'Marzo' },
    { value: 4, nombre: 'Abril' },
    { value: 5, nombre: 'Mayo' },
    { value: 6, nombre: 'Junio' },
    { value: 7, nombre: 'Julio' },
    { value: 8, nombre: 'Agosto' },
    { value: 9, nombre: 'Septiembre' },
    { value: 10, nombre: 'Octubre' },
    { value: 11, nombre: 'Noviembre' },
    { value: 12, nombre: 'Diciembre' },
  ];

  // objeto para el nuevo periodo
  nuevo: PeriodoCierremes = {
    id: {
      anio: new Date().getFullYear(),
      mes: 0
    },
    fechaInicio: '',
    fechaFinal: '',
    fechaCierre: ''
  };

  constructor(private pcmService: PeriodocierremesService) {}

  ngOnInit(): void {
    this.cargarPeriodos();

    // generar dinámicamente un rango de años (ejemplo: actual ± 5)
    const currentYear = new Date().getFullYear();
    this.anios = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  }

  cargarPeriodos(): void {
    this.pcmService.getAll().subscribe({
      next: (data) => this.periodos = data,
      error: () => this.mensaje = 'Error al cargar los periodos de cierre'
    });
  }

  eliminar(anio: number, mes: number): void {
    if (confirm(`¿Desea eliminar el periodo ${mes}/${anio}?`)) {
      this.pcmService.delete(anio, mes).subscribe({
        next: () => {
          alert('Periodo eliminado correctamente');
          this.cargarPeriodos();
        },
        error: () => alert('Error al eliminar periodo')
      });
    }
  }

  calcularFechas(): void {
    if (this.nuevo.id.anio && this.nuevo.id.mes) {
      const inicio = new Date(this.nuevo.id.anio, this.nuevo.id.mes - 1, 1);
      const fin = new Date(this.nuevo.id.anio, this.nuevo.id.mes, 0); // último día del mes
      this.nuevo.fechaInicio = inicio.toISOString().substring(0, 10);
      this.nuevo.fechaFinal = fin.toISOString().substring(0, 10);
    }
  }

  crearPeriodo(): void {
    this.pcmService.create(this.nuevo).subscribe({
      next: () => {
        this.cargarPeriodos();
        this.mostrarFormulario = false;
        // reset para nuevo periodo
        this.nuevo = {
          id: {
            anio: new Date().getFullYear(),
            mes: 0
          },
          fechaInicio: '',
          fechaFinal: '',
          fechaCierre: ''
        };
      },
      error: () => alert('Error al crear el periodo')
    });
  }


  /*
  periodos: PeriodoCierremes[] = [];
  mensaje: string = '';

  constructor(private pcmService: PeriodocierremesService) {}

  ngOnInit(): void {
    this.cargarPeriodos();
  }

  cargarPeriodos(): void {
    this.pcmService.getAll().subscribe({
      next: (data) => this.periodos = data,
      error: (err) => this.mensaje = 'Error al cargar los periodos de cierre'
    });
  }

  eliminar(anio: number, mes: number): void {
    if (confirm(`¿Desea eliminar el periodo ${mes}/${anio}?`)) {
      this.pcmService.delete(anio, mes).subscribe({
        next: () => {
          alert('Periodo eliminado correctamente');
          this.cargarPeriodos();
        },
        error: () => alert('Error al eliminar periodo')
      });
    }
  }
     */
}
