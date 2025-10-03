import { Component, OnInit } from '@angular/core';
import { SaldoCuenta } from '../../entityf2/SaldoCuenta';
import { TipoSaldoCuenta } from '../../entityf2/TipoSaldoCuenta';
import { StatusCuenta } from '../../entityf2/StatusCuenta';
import { ActivatedRoute, Router } from '@angular/router';
import { SaldocuentaService } from '../../servicef2/saldocuenta.service';

@Component({
  selector: 'app-listsaldocuenta',
  standalone: false,
  templateUrl: './listsaldocuenta.component.html',
  styleUrl: './listsaldocuenta.component.css'
})
export class ListsaldocuentaComponent implements OnInit {

  cuentas!: SaldoCuenta[];
  personaId!: number;

  saldoAnterior!: number;
  debitos!: number;
  creditos!: number;

  constructor(
    private route: ActivatedRoute,
    private service: SaldocuentaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.personaId = Number(this.route.snapshot.paramMap.get('idPersona'));
    this.cargarDatos();
  }

  cargarDatos() {
    this.service.getCuentasByPersona().subscribe(c => {
      console.log("Cuentas recibidas: ",c);
      this.cuentas = c
    });

  }

  getSaldoActual(cuenta: SaldoCuenta): number {
    return cuenta.saldoAnterior + cuenta.debitos - cuenta.creditos;
  }



  select(r: SaldoCuenta): void {
      localStorage.setItem('id', r.idSaldoCuenta.toString().valueOf());
      this.router.navigate(['editsaldocuenta']);
    }

  eliminarCuenta(c: SaldoCuenta) {
    if (confirm('¿Seguro que deseas eliminar esta cuenta?')) {
      this.service.deleteCuenta(c.idSaldoCuenta).subscribe(() => {
        alert('Cuenta eliminada');
        this.cargarDatos();
      });
    }
  }

  resetForm() {
    this.saldoAnterior = 0;
    this.debitos = 0;
    this.creditos = 0;
  }

}
