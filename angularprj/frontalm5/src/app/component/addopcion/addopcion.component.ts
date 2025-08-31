import { Component } from '@angular/core';
import { Opcion } from '../../entity/opcion';
import { OpcionService } from '../../service/opcion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addopcion',
  standalone: false,
  templateUrl: './addopcion.component.html',
  styleUrl: './addopcion.component.css'
})
export class AddopcionComponent {
  opn = new Opcion;

  constructor(private service:OpcionService, private router:Router){}
  ngOnInit(): void{}

  Cancelar(){
    this.router.navigate(["listopcion"]);
  }

  guardar(opc:Opcion){
    if(typeof(opc.nombre) != "undefined"){
      this.service.addOpcion(opc).subscribe(result => {
        if(result != null){
          alert("Rol: "+opc.nombre+" ingresado correctamente!");
          this.router.navigate(["listopcion"]);
        }
      });
    } else{
      alert("Debe ingresar datos!");
    }
  }

}
