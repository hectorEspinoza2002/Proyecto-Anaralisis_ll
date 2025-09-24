import { PersonaService } from './../../servicef2/persona.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../../entityf2/Persona';

@Component({
  selector: 'app-listpersona',
  standalone: false,
  templateUrl: './listpersona.component.html',
  styleUrl: './listpersona.component.css',
})
export class ListpersonaComponent implements OnInit {
  personas!: Persona[];

  puedeAlta = true;
  puedeBaja = true;
  puedeCambio = true;

  constructor(private router: Router, private personaService: PersonaService) {}

  ngOnInit(): void {
    this.personaService.getAll().subscribe((data) => {
      this.personas = data;
    });
  }

  select(r: Persona): void {
    localStorage.setItem('id', r.idPersona.toString().valueOf());
    this.router.navigate(['editpersona']);
  }

  delete(pers: Persona) {
    var validar = confirm('Esta seguro que desea eliminar la Persona?');
    if (validar == true) {
      this.personaService.deletePersona(pers).subscribe({
        next: (result) => {
          this.personas = this.personas.filter((x) => x !== pers);
          alert(result + pers.nombre + ' eliminada correctamente');
        },
        error: () => {
          alert(
            'Ha ocurrido un error al eliminar la Persona.\nVerifique que no existan sucursales'
          );
        },
      });
    }
  }
}
