import { Component } from '@angular/core';
import { Sucursal } from '../../entity/Sucursal';
import { SucursalService } from '../../service/sucursal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addsucursal',
  standalone: false,
  templateUrl: './addsucursal.component.html',
  styleUrl: './addsucursal.component.css'
})
export class AddsucursalComponent {
  sucursal = new Sucursal;

  constructor(private sucurService:SucursalService, private router:Router){}

  ngOnInit(): void{}

    Cancelar(){
      this.router.navigate(["listsucursal"]);
    }

    guardar(sucurs:Sucursal){
      if(typeof(sucurs.nombre) != "undefined"){
        this.sucurService.addSucursal(sucurs).subscribe(result => {
          if(result != null){
            alert("Sucursal: "+sucurs.nombre+" ingresado correctamente!");
            this.router.navigate(["listsucursal"]);
          }
        });
      } else{
        alert("Debe ingresar algunos datos!");
      }
    }
}
