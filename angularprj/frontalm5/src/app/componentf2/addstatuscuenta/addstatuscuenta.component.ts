import { Component } from '@angular/core';
import { StatusCuenta } from '../../entityf2/StatusCuenta';
import { StatuscuentaService } from '../../servicef2/statuscuenta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addstatuscuenta',
  standalone: false,
  templateUrl: './addstatuscuenta.component.html',
  styleUrl: './addstatuscuenta.component.css'
})
export class AddstatuscuentaComponent {
  status = new StatusCuenta;

  constructor(private statusService: StatuscuentaService, private router: Router){}

  ngOnInit(): void{}

  Cancelar(){
    this.router.navigate(["liststatuscuenta"]);
  }

  guardar(statusC: StatusCuenta){
    if(typeof(statusC.nombre) != "undefined"){
      this.statusService.addStatusCuenta(statusC).subscribe(result => {
        if(result != null){
          alert("Status: "+statusC.nombre+" ingresado correctamente!");
          this.router.navigate(["liststatuscuenta"]);
        }
      });
    } else {
      alert("Debe ingresar Nombre de estatus");
    }
  }

}
