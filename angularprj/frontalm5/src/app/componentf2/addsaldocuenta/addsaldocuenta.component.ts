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
  styleUrl: './addsaldocuenta.component.css'
})
export class AddsaldocuentaComponent {
  saldoCuenta = new SaldoCuenta();

  selectedPersona!: number;
  persona: Persona[] = [];

  selectedStatusCuetna!: number;
  status: StatusCuenta[] = [];

  selectedTipoSaldoCuenta!: number;
  tipoCuenta: TipoSaldoCuenta[] = [];

  mensaje: string = '';

  constructor(
    private saldoCuentaService: SaldocuentaService,
    private personaService: PersonaService,
    private router: Router,
    private statusService: StatuscuentaService,
    private tipoService: TiposaldocuentaService
  ){}

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  guardar(cuenta: SaldoCuenta){
    this.saldoCuenta.persona = {idPersona: this.selectedPersona} as unknown as Persona;
    this.saldoCuenta.statusCuenta = {idStatus: this.selectedStatusCuetna} as unknown as StatusCuenta;
    this.saldoCuenta.tipoSaldoCuenta = {idTipoSaldoCuenta: this.selectedTipoSaldoCuenta} as unknown as TipoSaldoCuenta;

    if(
      this.selectedPersona &&
      this.selectedStatusCuetna &&
      this.selectedTipoSaldoCuenta
    ) {
      this.saldoCuentaService.createCuenta(cuenta).subscribe({
        next: (result) => {
          if(result != null){
            alert("Cuenta ingresada correctamente!");
            this.router.navigate([]);
            this.resetForm();
          }
        },
        error:(err) => {
          alert(err);
        }
      });
    } else {
      alert("Faltan datos!");
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
      }
    })
  }

}
