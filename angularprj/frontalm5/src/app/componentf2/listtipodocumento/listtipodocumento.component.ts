import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipodocumentoService } from '../../servicef2/tipodocumento.service';
import { TipoDocumento } from '../../entityf2/TipoDocumento';

@Component({
  selector: 'app-listtipodocumento',
  standalone: false,
  templateUrl: './listtipodocumento.component.html',
  styleUrl: './listtipodocumento.component.css'
})
export class ListtipodocumentoComponent implements OnInit{
  tipodocumento!: TipoDocumento[];

  puedeAlta = true;
  puedeBaja = true;
  puedeCambio = true;

  constructor(
    private router: Router,
    private tipoDocService: TipodocumentoService
  ) {}

  ngOnInit(): void {
      this.tipoDocService.getAll().subscribe((data) => {
        this.tipodocumento = data;
      })
  }

  select(st: TipoDocumento): void {
      localStorage.setItem('id', st.idTipoDocumento.toString().valueOf());
      this.router.navigate(['edittipodocumento']);
    }

    delete(stc: TipoDocumento) {
      var validar = confirm('Esta seguro que desea eliminar la Tipo Documento?');
      if (validar == true) {
        this.tipoDocService.deleteTipoDocumento(stc).subscribe({
          next: (result) => {
            this.tipodocumento = this.tipodocumento.filter((x) => x !== stc);
            alert(result + stc.nombre + ' eliminada correctamente');
          },
          error: () => {
            alert(
              'Ha ocurrido un error al eliminar Tipo Documento.'
            );
          },
        });
      }
    }

}
