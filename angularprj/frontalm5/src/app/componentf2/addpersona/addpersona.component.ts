import { GeneroService } from './../../service/genero.service';
import { Component } from '@angular/core';
import { Persona } from '../../entityf2/Persona';
import { PersonaService } from '../../servicef2/persona.service';
import { Router } from '@angular/router';
import { Genero } from '../../entity/genero';
import { EstadoCivil } from '../../entityf2/EstadoCivil';
import { EstadocivilService } from '../../servicef2/estadocivil.service';

@Component({
  selector: 'app-addpersona',
  standalone: false,
  templateUrl: './addpersona.component.html',
  styleUrl: './addpersona.component.css',
})
export class AddpersonaComponent {
  persona = new Persona();

  selectedGenero!: number;
  genero: Genero[] = [];

  selectedEstadoCivil!: number;
  estadoC: EstadoCivil[] = [];

  mensaje: String = '';

  constructor(
    private personaService: PersonaService,
    private router: Router,
    private generoService: GeneroService,
    private estadoService: EstadocivilService
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  guardar(per: Persona) {

    this.persona.genero = {idGenero: this.selectedGenero} as unknown as Genero;
    this.persona.estadoCivil = {idEstadoCivil: this.selectedEstadoCivil} as unknown as EstadoCivil;

    if (
      typeof per.nombre != 'undefined' &&
      typeof per.apellido != 'undefined' &&
      this.selectedEstadoCivil &&
      this.selectedGenero
    ) {
      this.personaService.addPersona(per).subscribe({
        next: (result) => {
          if(result != null){
            alert("Persona: "+per.nombre+' '+" ingresada correctamente!");
            this.router.navigate(["listpersona"]);
            this.resetForm();
          }
        },
        error: (err) => {
          alert(err);
        }
      }
    /*    (result) => {
        if (result != null) {
          alert('Persona: ' + per.nombre + ' ingresado correctamente!');
          this.router.navigate(['listpersona']);
        }
      }
        */
    );
    } else {
      alert('Faltan datos!');
    }
  }

  resetForm(): void {
    this.persona = new Persona();
    this.selectedEstadoCivil = null!;
    this.selectedGenero = null!;
  }

  cargarDatosIniciales(): void {

    this.generoService.getAll().subscribe({
      next: (d) => {
        this.genero = d;
      },
      error: (err) => {
        this.mensaje = 'Error al traer el genero';
      },
    });

    this.estadoService.getAll().subscribe({
      next: (e) => {
        this.estadoC = e;
      },
      error:(err) => {
        this.mensaje = 'Error al traer el estado civil'
      },
    });

  }

  Cancelar() {
    this.router.navigate(['listpersona']);
  }
}
