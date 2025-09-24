import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusCuenta } from '../../entityf2/StatusCuenta';
import { StatuscuentaService } from '../../servicef2/statuscuenta.service';

@Component({
  selector: 'app-liststatuscuenta',
  standalone: false,
  templateUrl: './liststatuscuenta.component.html',
  styleUrl: './liststatuscuenta.component.css',
})
export class ListstatuscuentaComponent implements OnInit {
  statusCuentas!: StatusCuenta[];

  puedeAlta = true;
  puedeBaja = true;
  puedeCambio = true;

  constructor(
    private router: Router,
    private statusService: StatuscuentaService
  ) {}

  ngOnInit(): void {
    this.statusService.getAll().subscribe((data) => {
      this.statusCuentas = data;
    });
  }

  select(st: StatusCuenta): void {
    localStorage.setItem('id', st.idStatusCuenta.toString().valueOf());
    this.router.navigate(['editstatuscuenta']);
  }

  delete(stc: StatusCuenta) {
    var validar = confirm('Esta seguro que desea eliminar la Estatus Cuenta?');
    if (validar == true) {
      this.statusService.deleteStatusCuenta(stc).subscribe({
        next: (result) => {
          this.statusCuentas = this.statusCuentas.filter((x) => x !== stc);
          alert(result + stc.nombre + ' eliminada correctamente');
        },
        error: () => {
          alert(
            'Ha ocurrido un error al eliminar la Estatus.'
          );
        },
      });
    }
  }
}
