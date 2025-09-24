import { Component } from '@angular/core';
import { TipoDocumento } from '../../entityf2/TipoDocumento';
import { TipodocumentoService } from '../../servicef2/tipodocumento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtipodocumento',
  standalone: false,
  templateUrl: './addtipodocumento.component.html',
  styleUrl: './addtipodocumento.component.css'
})
export class AddtipodocumentoComponent {
  tdoc = new TipoDocumento;

  constructor(private tipoService: TipodocumentoService, private router:Router){}
  ngOnInit(): void{}

  Cancelar(){
    this.router.navigate(["listtipodocumento"]);
  }

  guardar(tipoDoc: TipoDocumento){
    if(typeof(tipoDoc.nombre) != "undefined"){
      this.tipoService.addTipoDocumento(tipoDoc).subscribe( result => {
        if(result != null){
          alert("Tipo Documento: "+tipoDoc.nombre+" ingresado correctamente!");
          this.router.navigate(["listtipodocumento"]);
        }
      });
    } else {
      alert("Debe ingresar Nombre de Tipo Documento");
    }
  }

}
