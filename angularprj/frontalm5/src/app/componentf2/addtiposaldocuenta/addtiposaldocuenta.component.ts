import { Component } from '@angular/core';
import { TipoSaldoCuenta } from '../../entityf2/TipoSaldoCuenta';
import { TiposaldocuentaService } from '../../servicef2/tiposaldocuenta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtiposaldocuenta',
  standalone: false,
  templateUrl: './addtiposaldocuenta.component.html',
  styleUrl: './addtiposaldocuenta.component.css'
})
export class AddtiposaldocuentaComponent {
  tipoC = new TipoSaldoCuenta;

  constructor(private tipoService: TiposaldocuentaService,
    private router: Router
  ){}
  ngOnInit(): void{}

  Cancelar(){
    this.router.navigate(["listtiposaldocuenta"]);
  }

  guardar(tsc:TipoSaldoCuenta){
    if(typeof(tsc.nombre) != "undefined"){
      this.tipoService.addTipoSaldoCuenta(tsc).subscribe(result => {
        if(result != null){
          alert("Tipo Saldo Cuenta: "+tsc.nombre+" ingresado correctamente!");
          this.router.navigate(["listtiposaldocuenta"]);
        }
      });
    } else {
      alert("Debe ingresar Nombre de Tipo Saldo Cuenta")
    }
  }

}
