import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoCivil } from '../../entityf2/EstadoCivil';
import { Router } from '@angular/router';
import { EstadocivilService } from '../../servicef2/estadocivil.service';

@Component({
  selector: 'app-listestadocivil',
  standalone: false,
  templateUrl: './listestadocivil.component.html',
  styleUrl: './listestadocivil.component.css',
})
export class ListestadocivilComponent implements OnInit {
  estadoCivil!: EstadoCivil[];

  puedeAlta = true;
  puedeBaja = true;
  puedeCambio = true;

  constructor(
    private router: Router,
    private estadoService: EstadocivilService
  ) {}

  ngOnInit(): void {
    this.estadoService.getAll().subscribe((data) => {
      this.estadoCivil = data;
    });
  }

  select(st: EstadoCivil): void {
    localStorage.setItem('id', st.idEstadoCivil.toString().valueOf());
    this.router.navigate(['editempresa']);
  }

  delete(estado: EstadoCivil) {
    var validar = confirm('Esta seguro que desea eliminar el Estado Civil?');
    if (validar == true) {
      this.estadoService.deleteEstadoCivil(estado).subscribe({
        next: (result) => {
          this.estadoCivil = this.estadoCivil.filter((x) => x !== estado);
          alert(result + estado.nombre + ' eliminada correctamente');
        },
        error: () => {
          alert('Ha ocurrido un error al eliminar el Estado Civil.');
        },
      });
    }
  }
}
