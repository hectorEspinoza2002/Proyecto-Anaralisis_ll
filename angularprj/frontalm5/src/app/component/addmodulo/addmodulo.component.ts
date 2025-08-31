import { Component } from '@angular/core';
import { Modulo } from '../../entity/modulo';
import { ModuloService } from '../../service/modulo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addmodulo',
  standalone: false,
  templateUrl: './addmodulo.component.html',
  styleUrl: './addmodulo.component.css'
})
export class AddmoduloComponent {

  mod = new Modulo;

  constructor(private modService:ModuloService, private router:Router){}

  ngOnInit(): void{}

    Cancelar(){
      this.router.navigate(["listmodulo"]);
    }

    guardar(modul:Modulo){
      if(typeof(modul.nombre) != "undefined"){
        this.modService.addModulo(modul).subscribe(result => {
          if(result != null){
            alert("Modulo: "+modul.nombre+" ingresado correctamente!");
            this.router.navigate(["listmodulo"]);
          }
        });
      } else{
        alert("Debe ingresar algunos datos!");
      }
    }

}
