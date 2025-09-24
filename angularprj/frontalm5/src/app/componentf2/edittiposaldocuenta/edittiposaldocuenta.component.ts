import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TiposaldocuentaService } from '../../servicef2/tiposaldocuenta.service';
import { TipoSaldoCuenta } from '../../entityf2/TipoSaldoCuenta';

@Component({
  selector: 'app-edittiposaldocuenta',
  standalone: false,
  templateUrl: './edittiposaldocuenta.component.html',
  styleUrl: './edittiposaldocuenta.component.css'
})
export class EdittiposaldocuentaComponent implements OnInit, AfterViewInit{

  constructor (private tipoService: TiposaldocuentaService, private router: Router){}

  ngOnInit(): void{
    this.selectEdit();
  }
  tipoSaldoC = new TipoSaldoCuenta;

  @ViewChild('myFocus') myFocus: any;

  ngAfterViewInit(): void{
    this.myFocus.nativeElement.focus();
  }

  selectEdit(){
    let id = localStorage.getItem("id");

    if(id){
      this.tipoService.buscarTipoSaldoCuenta(id)
      .subscribe(result =>{
        this.tipoSaldoC = result;
      })
    }
  }

  editRol(tsc:TipoSaldoCuenta){
    let id = localStorage.getItem("id");
    if(id){
      this.tipoService.editTipoSaldoCuenta(id,tsc)
      .subscribe(result => {
        this.tipoSaldoC = result;
        this.router.navigate(["listtiposaldocuenta"]);
        alert(tsc.nombre + " modificado!");
      })
    }
  }

  Cancel(){
    this.router.navigate(["listtiposaldocuenta"]);
  }

}
