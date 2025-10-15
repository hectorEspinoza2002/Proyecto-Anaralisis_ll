import { Component, OnInit } from '@angular/core';
import { Persona } from '../../entityf2/Persona';
import { SaldoCuenta } from '../../entityf2/SaldoCuenta';
import { PersonaService } from '../../servicef2/persona.service';
import { SaldocuentaService } from '../../servicef2/saldocuenta.service';

@Component({
  selector: 'app-listconsultasaldos',
  standalone: false,
  templateUrl: './listconsultasaldos.component.html',
  styleUrl: './listconsultasaldos.component.css'
})
export class ListconsultasaldosComponent implements OnInit {
  personaBusqueda: string = '';
  personas: Persona[] = [];
  personasFiltradas: Persona[] = [];
  cuentas: SaldoCuenta[] = [];

  personaSeleccionada?: Persona;

  constructor(
    private personaService: PersonaService,
    private saldoCuentaService: SaldocuentaService
  ) {}

  ngOnInit(): void {
    // Cargar todas las personas al inicio
    this.personaService.getAll().subscribe({
      next: (data) => {
        this.personas = data;
      }
    });
  }

  buscarPersona() {
  const term = this.personaBusqueda.toLowerCase().trim();

  if (term) {
    // 🔹 Buscar por nombre, apellido o idPersona
    this.personasFiltradas = this.personas.filter(
      (p) =>
        p.nombre.toLowerCase().includes(term) ||
        p.apellido.toLowerCase().includes(term) ||
        p.idPersona.toString().includes(term)
    );

    // 🔹 Si no se encontró ninguna persona, buscar por número de cuenta
    if (this.personasFiltradas.length === 0 && !isNaN(Number(term))) {
      const idCuenta = Number(term);

      // Llamar al servicio para buscar cuenta por ID
      this.saldoCuentaService.getCuentaById(idCuenta.toString()).subscribe({
        next: (cuenta) => {
          if (cuenta && cuenta.persona) {
            this.personasFiltradas = [cuenta.persona];
          } else {
            this.personasFiltradas = [];
          }
        },
        error: () => {
          this.personasFiltradas = [];
        },
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

    // Aquí traes las cuentas de esa persona getCuentasByPersona------- p.idPersona
    this.saldoCuentaService.getCuentasByPersona(p.idPersona).subscribe({
      next: (result) => {
        this.cuentas = result;
      }
    });
  }

}
