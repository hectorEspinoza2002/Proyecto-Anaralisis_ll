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

  selectedPersona!: number;
  persona: Persona[] = [];

  selectedStatusCuetna!: number;
  status: StatusCuenta[] = [];

  selectedTipoSaldoCuenta!: number;
  tipoCuenta: TipoSaldoCuenta[] = [];

  personaBusqueda: string = '';
  personasFiltradas: Persona[] = [];

  mensaje: string = '';

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

  guardar() {

    if(!this.seleccionarPersona){
      alert('Debes seleccionar una persona del listado');
      return;
    }

    this.saldoCuenta.persona = {
      idPersona: this.selectedPersona,
    } as unknown as Persona;
    this.saldoCuenta.statusCuenta = {
      idStatusCuenta: this.selectedStatusCuetna,
    } as unknown as StatusCuenta;
    this.saldoCuenta.tipoSaldoCuenta = {
      idTipoSaldoCuenta: this.selectedTipoSaldoCuenta,
    } as unknown as TipoSaldoCuenta;

    console.log('Persona:', this.selectedPersona);
    console.log('Status:', this.selectedStatusCuetna);
    console.log('Tipo:', this.selectedTipoSaldoCuenta);

    if (
      this.selectedPersona &&
      this.selectedStatusCuetna &&
      this.selectedTipoSaldoCuenta
    ) {
      this.saldoCuentaService.createCuenta(this.saldoCuenta).subscribe({
        next: (result) => {
          if (result != null) {
            alert('Cuenta ingresada correctamente!');
            this.router.navigate(['/listsaldocuenta']);
            this.resetForm();
          }
        },
        error: (err) => {
          alert('Error al crear la cuenta: ' + err);
        },
      });
    } else {
      alert('Faltan datos!');
    }
  }

  resetForm(): void {
    this.saldoCuenta = new SaldoCuenta();
    this.selectedPersona = null!;
    this.selectedStatusCuetna = null!;
    this.selectedTipoSaldoCuenta = null!;
  }

  cargarDatosIniciales(): void {
    this.personaService.getAll().subscribe({
      next: (p) => {
        this.persona = p;
      },
    });
    //this.saldoCuentaService.getTiposSaldoCuenta().subscribe({
    this.tipoService.getAll().subscribe({
      next: (sc) => {
        this.tipoCuenta = sc;
      },
    });
    this.statusService.getAll().subscribe({
      next: (stt) => {
        this.status = stt;
      },
    });
  }

  Cancelar() {
    this.router.navigate(['/listsaldocuenta']);
  }

  buscarPersona() {
    const term = this.personaBusqueda.toLowerCase();
    if (term) {
      this.personasFiltradas = this.persona.filter(
        (p) =>
          p.nombre.toLowerCase().includes(term) ||
          p.apellido.toLowerCase().includes(term) ||
          p.idPersona.toString().includes(term)
      );
    } else {
      this.personasFiltradas = [];
    }
  }

  seleccionarPersona(p: Persona) {
    this.selectedPersona = p.idPersona; // guardas el idPersona real
    this.personaBusqueda = `${p.idPersona} - ${p.nombre} ${p.apellido}`; // lo muestras en el input
    this.personasFiltradas = []; // limpiar resultados
    console.log("Persona seleccionada:", this.selectedPersona);
  }
}
