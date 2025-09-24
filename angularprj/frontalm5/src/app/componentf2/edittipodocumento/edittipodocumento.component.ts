import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TipodocumentoService } from '../../servicef2/tipodocumento.service';
import { Router } from '@angular/router';
import { TipoDocumento } from '../../entityf2/TipoDocumento';

@Component({
  selector: 'app-edittipodocumento',
  standalone: false,
  templateUrl: './edittipodocumento.component.html',
  styleUrl: './edittipodocumento.component.css'
})
export class EdittipodocumentoComponent implements OnInit, AfterViewInit{

  constructor (private tipoDocService: TipodocumentoService, private router: Router){}

  ngOnInit(): void{
    this.selectEdit();
  }
  tipoDoc = new TipoDocumento;

  @ViewChild('myFocus') myFocus: any;

  ngAfterViewInit(): void{
    this.myFocus.nativeElement.focus();
  }

  selectEdit(){
    let id = localStorage.getItem("id");

    if(id){
      this.tipoDocService.buscarTipoDocumento(id)
      .subscribe(result =>{
        this.tipoDoc = result;
      })
    }
  }

  editRol(td:TipoDocumento){
    let id = localStorage.getItem("id");
    if(id){
      this.tipoDocService.editTipoDocumento(id,td)
      .subscribe(result => {
        this.tipoDoc = result;
        this.router.navigate(["listtipodocumento"]);
        alert(td.nombre + " modificado!");
      })
    }
  }

  Cancel(){
    this.router.navigate(["listtipodocumento"]);
  }

}
