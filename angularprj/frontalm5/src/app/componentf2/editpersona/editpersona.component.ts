import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Persona } from '../../entityf2/Persona';
import { PersonaService } from '../../servicef2/persona.service';
import { Router } from '@angular/router';
import { Genero } from '../../entity/genero';
import { GeneroService } from '../../service/genero.service';
import { EstadocivilService } from '../../servicef2/estadocivil.service';
import { EstadoCivil } from '../../entityf2/EstadoCivil';

@Component({
  selector: 'app-editpersona',
  standalone: false,
  templateUrl: './editpersona.component.html',
  styleUrl: './editpersona.component.css',
})
export class EditpersonaComponent implements OnInit, AfterViewInit {
  persona = new Persona();
  mensaje: string = '';

  selectedGenero: Number | null = null;
  genero: Genero[] = [];

  selectedEstadoCivil: Number | null = null;
  estado: EstadoCivil[] = [];

  constructor(
    private persService: PersonaService,
    private router: Router,
    private generoService: GeneroService,
    private estadoService: EstadocivilService
  ) {}

  ngOnInit(): void {
    this.selectEdit();
    this.cargarDatosIniciales();
  }

  @ViewChild('myFocus') myFocus: any;

  ngAfterViewInit(): void {
    this.myFocus.nativeElement.focus();
  }

  selectEdit() {
    let id = localStorage.getItem('id');

    if (id) {
      this.persService.buscarPersona(id).subscribe((result) => {
        this.persona = result;

        this.selectedGenero = result.genero?.idGenero ?? null;
        this.selectedEstadoCivil = result.estadoCivil?.idEstadoCivil ?? null;
      });
    }
  }

  editRol(p: Persona) {
    if (this.selectedGenero && this.selectedEstadoCivil) {
      p.genero = { idGenero: this.selectedGenero } as Genero;
      p.estadoCivil = {
        idEstadoCivil: this.selectedEstadoCivil,
      } as EstadoCivil;
    }

    let id = localStorage.getItem('id');
    if (id) {
      this.persService.editPersona(id, p).subscribe((result) => {
        this.persona = result;
        this.router.navigate(['listpersona']);
        alert(p.nombre + ' modificado!');
        this.resetForm();
      });
    }
  }

  Cancel() {
    this.router.navigate(['listpersona']);
  }

  private resetForm(): void {
    this.persona = new Persona();
    this.selectedGenero = null;
    this.selectedEstadoCivil = null;
  }

  cargarDatosIniciales(): void {
    this.generoService.getAll().subscribe({
      next: (data) => {
        this.genero = data;
      },
      error: (err) => {
        this.mensaje = 'Error al traer generos';
        console.error(err);
      },
    });

    this.estadoService.getAll().subscribe({
      next: (data) => {
        this.estado = data;
      },
      error: (err) => {
        this.mensaje = 'Error al traer estado';
        console.error(err);
      },
    });
  }
}
