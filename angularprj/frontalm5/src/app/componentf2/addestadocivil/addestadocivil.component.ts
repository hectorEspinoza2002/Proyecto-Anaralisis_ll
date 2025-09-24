import { Component } from '@angular/core';
import { EstadoCivil } from '../../entityf2/EstadoCivil';
import { EstadocivilService } from '../../servicef2/estadocivil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addestadocivil',
  standalone: false,
  templateUrl: './addestadocivil.component.html',
  styleUrl: './addestadocivil.component.css'
})
export class AddestadocivilComponent {
  estadoCivil = new EstadoCivil();

  constructor(private estadoService: EstadocivilService, private router: Router){}

  ngOnInit(): void {}

  guardar(estado:EstadoCivil){
    if(typeof(estado.nombre) != "undefined"){
      this.estadoService.addEstatusCivil(estado).subscribe(result => {
        if(result != null){
          alert("Estado Civil: "+estado.nombre+" ingresado correctamente!");
          this.router.navigate(["listestadocivil"]);
        }
      });
    } else {
      alert("Faltan datos!");
    }
  }

  Cancelar(){
    this.router.navigate(["listestadocivil"]);
  }

}
