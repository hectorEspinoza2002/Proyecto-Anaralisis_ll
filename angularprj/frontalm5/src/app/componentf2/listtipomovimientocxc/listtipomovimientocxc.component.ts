import { Component, OnInit } from '@angular/core';
import { TipoMovimientoCxc } from '../../entityf2/TipoMovimientoCxc';
import { Router } from '@angular/router';
import { TipomovimientocxcService } from '../../servicef2/tipomovimientocxc.service';

@Component({
  selector: 'app-listtipomovimientocxc',
  standalone: false,
  templateUrl: './listtipomovimientocxc.component.html',
  styleUrl: './listtipomovimientocxc.component.css',
})
export class ListtipomovimientocxcComponent implements OnInit {
  tipoCxc!: TipoMovimientoCxc[];

  puedeAlta = true;
  puedeBaja = true;
  puedeCambio = true;

  constructor(
    private router: Router,
    private tipoMovService: TipomovimientocxcService
  ) {}

  ngOnInit(): void {
    this.tipoMovService.getAll().subscribe((data) => {
      this.tipoCxc = data;
    });
  }

  select(st: TipoMovimientoCxc): void {
    localStorage.setItem('id', st.idTipoMovimientoCXC.toString().valueOf());
    this.router.navigate(['editempresa']);
  }

  delete(tmcxc: TipoMovimientoCxc) {
    var validar = confirm('Esta seguro que desea eliminar la Tipo Movimiento CXC?');
    if (validar == true) {
      this.tipoMovService.deleteTipoMovimientoCxc(tmcxc).subscribe({
        next: (result) => {
          this.tipoCxc = this.tipoCxc.filter((x) => x !== tmcxc);
          alert(result + tmcxc.nombre + ' eliminada correctamente');
        },
        error: () => {
          alert('Ha ocurrido un error al eliminar Movimiento CXC.');
        },
      });
    }
  }
}
