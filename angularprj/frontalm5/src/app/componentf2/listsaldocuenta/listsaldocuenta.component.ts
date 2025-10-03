import { Component, OnInit } from '@angular/core';
import { SaldoCuenta } from '../../entityf2/SaldoCuenta';
import { SaldocuentaService } from '../../servicef2/saldocuenta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listsaldocuenta',
  standalone: false,
  templateUrl: './listsaldocuenta.component.html',
  styleUrl: './listsaldocuenta.component.css',
})
export class ListsaldocuentaComponent implements OnInit {
  cuentas!: SaldoCuenta[];

  saldoAnterior!: number;
  debitos!: number;
  creditos!: number;

  constructor(
    private serviceSaldo: SaldocuentaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviceSaldo.getCuentasByPersona().subscribe((data) => {
      this.cuentas = data;
    });
  }

  getSaldoActual(cuenta: SaldoCuenta): number {
    return cuenta.saldoAnterior + cuenta.debitos - cuenta.creditos;
  }

  select(sc: SaldoCuenta): void {
    localStorage.setItem('id', sc.idSaldoCuenta.toString().valueOf());
    this.router.navigate(['editsaldocuenta']);
  }

  eliminarCuenta(saldoC: SaldoCuenta) {
    var validar = confirm('¿Seguro que deseas eliminar esta cuenta?');
    if (validar == true) {
      this.serviceSaldo.deleteCuenta(saldoC.idSaldoCuenta).subscribe({
        next: (result) => {
          this.cuentas = this.cuentas.filter((x) => x !== saldoC);
          alert(result + saldoC.idSaldoCuenta + ' eliminada correctamente');
        },
        error: () => {
          alert('Ha ocurrido un error');
        },
      });
    }
  }

  verDocumentos(idPersona: Number): void {
  this.router.navigate(['/listdocumentopersona', idPersona]);
  }
}
