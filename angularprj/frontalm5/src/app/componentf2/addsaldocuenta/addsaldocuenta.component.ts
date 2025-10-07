import { StatusCuenta } from './../../entityf2/StatusCuenta';
import { Persona } from '../../entityf2/Persona';
import { SaldoCuenta } from './../../entityf2/SaldoCuenta';
import { Component } from '@angular/core';
import { TipoSaldoCuenta } from '../../entityf2/TipoSaldoCuenta';
import { PersonaService } from '../../servicef2/persona.service';
import { Router } from '@angular/router';
import { StatuscuentaService } from '../../servicef2/statuscuenta.service';
import { TiposaldocuentaService } from '../../servicef2/tiposaldocuenta.service';
import { SaldocuentaService } from '../../servicef2/saldocuenta.service';

@Component({
  selector: 'app-addsaldocuenta',
  standalone: false,
  templateUrl: './addsaldocuenta.component.html',
  styleUrl: './addsaldocuenta.component.css',
})
export class AddsaldocuentaComponent {
 saldoCuenta = new SaldoCuenta();

  selectedPersona!: number; // Se guarda el idPersona elegido
  persona: Persona[] = [];
  filteredPersonas: Persona[] = [];

  selectedStatusCuetna!: number;
  status: StatusCuenta[] = [];

  selectedTipoSaldoCuenta!: number;
  tipoCuenta: TipoSaldoCuenta[] = [];

  searchTerm: string = ''; // texto que escribe el usuario
  personaSeleccionadaTexto: string = ''; // texto visible en el input

  constructor(
    private saldoCuentaService: SaldocuentaService,
    private personaService: PersonaService,
    private router: Router,
    private statusService: StatuscuentaService,
    private tipoService: TiposaldocuentaService
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {
    this.personaService.getAll().subscribe({
      next: (p) => {
        this.persona = p;
        this.filteredPersonas = p;
      },
    });

    this.tipoService.getAll().subscribe({
      next: (sc) => (this.tipoCuenta = sc),
    });

    this.statusService.getAll().subscribe({
      next: (stt) => (this.status = stt),
    });
  }

  filtrarPersonas() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPersonas = this.persona.filter(
      (p) =>
        p.nombre.toLowerCase().includes(term) ||
        p.apellido.toLowerCase().includes(term) ||
        p.idPersona.toString().includes(term)
    );
  }

  seleccionarPersona(p: Persona) {
    this.selectedPersona = p.idPersona;
    this.personaSeleccionadaTexto = `${p.idPersona} - ${p.nombre} ${p.apellido}`;
    this.searchTerm = ''; // limpia el filtro
    this.filteredPersonas = []; // oculta sugerencias
  }

  guardar() {
    if (!this.selectedPersona) {
      alert('Debe seleccionar una persona');
      return;
    }

    this.saldoCuenta.persona = {idPersona: this.selectedPersona, } as unknown as Persona;
    this.saldoCuenta.statusCuenta = { idStatusCuenta: this.selectedStatusCuetna, } as unknown as StatusCuenta;
    this.saldoCuenta.tipoSaldoCuenta = { idTipoSaldoCuenta: this.selectedTipoSaldoCuenta,} as unknown as TipoSaldoCuenta;

    this.saldoCuentaService.createCuenta(this.saldoCuenta).subscribe({
      next: () => {
        alert('Cuenta ingresada correctamente!');
        this.router.navigate(['/listsaldocuenta']);
        this.resetForm();
      },
      error: (err) => alert('Error al crear la cuenta: ' + err),
    });
  }

  resetForm(): void {
    this.saldoCuenta = new SaldoCuenta();
    this.selectedPersona = null!;
    this.selectedStatusCuetna = null!;
    this.selectedTipoSaldoCuenta = null!;
    this.personaSeleccionadaTexto = '';
  }

  Cancelar() {
    this.router.navigate(['/listsaldocuenta']);
  }

}
