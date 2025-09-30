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
}
