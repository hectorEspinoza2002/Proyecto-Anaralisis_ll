import { Component, OnInit } from '@angular/core';
import { TipoSaldoCuenta } from '../../entityf2/TipoSaldoCuenta';
import { Router } from '@angular/router';
import { TiposaldocuentaService } from '../../servicef2/tiposaldocuenta.service';

@Component({
  selector: 'app-listtiposaldocuenta',
  standalone: false,
  templateUrl: './listtiposaldocuenta.component.html',
  styleUrl: './listtiposaldocuenta.component.css'
})
export class ListtiposaldocuentaComponent implements OnInit{
  tipoSaldo!: TipoSaldoCuenta[];

  puedeAlta = true;
  puedeBaja = true;
  puedeCambio = true;

  constructor(
    private router: Router,
    private tipoService: TiposaldocuentaService
  ) {}

  ngOnInit(): void {
      this.tipoService.getAll().subscribe((data) => {
        this.tipoSaldo = data;
      });
  }

  select(st: TipoSaldoCuenta): void {
      localStorage.setItem('id', st.idTipoSaldoCuenta.toString().valueOf());
      this.router.navigate(['edittiposaldocuenta']);
    }

    delete(stc: TipoSaldoCuenta) {
      var validar = confirm('Esta seguro que desea eliminar el Tipo Saldo Cuenta?');
      if (validar == true) {
        this.tipoService.deleteTipoSaldoCuenta(stc).subscribe({
          next: (result) => {
            this.tipoSaldo = this.tipoSaldo.filter((x) => x !== stc);
            alert(result + stc.nombre + ' eliminada correctamente');
          },
          error: () => {
            alert(
              'Ha ocurrido un error al eliminar el Tipo Saldo Cuenta.'
            );
          },
        });
      }
    }

}
