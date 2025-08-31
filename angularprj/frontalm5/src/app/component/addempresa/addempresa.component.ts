import { EmpresaService } from './../../service/empresa.service';
import { Component } from '@angular/core';
import { Empresa } from '../../entity/empresa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addempresa',
  standalone: false,
  templateUrl: './addempresa.component.html',
  styleUrl: './addempresa.component.css'
})
export class AddempresaComponent {
  emp = new Empresa();

  constructor(private empService:EmpresaService ,private router:Router){}

  ngOnInit(): void{}

    Cancelar(){
      this.router.navigate(["listempresa"]);
    }

    guardar(empresa:Empresa){
      if(typeof(empresa.nombre) != "undefined"){
        this.empService.addEmpresa(empresa).subscribe(result => {
          if(result != null){
            alert("Empresa: "+empresa.nombre+" ingresado correctamente!");
            this.router.navigate(["listempresa"]);
          }
        });
      } else{
        alert("Faltan datos!");
      }
    }

}
