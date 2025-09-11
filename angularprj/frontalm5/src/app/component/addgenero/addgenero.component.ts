import { Component } from '@angular/core';
import { Genero } from '../../entity/genero';
import { GeneroService } from '../../service/genero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addgenero',
  standalone: false,
  templateUrl: './addgenero.component.html',
  styleUrl: './addgenero.component.css'
})
export class AddgeneroComponent {
  generos = new Genero;

  constructor(private generoService:GeneroService, private router:Router){}
  ngOnInit(): void{}

  Cancelar(){
    this.router.navigate(["listgenero"]);
  }

  guardar(g:Genero){
    if(typeof(g.nombre) != "undefined"){
      this.generoService.addGenero(g).subscribe(result => {
        if(result != null){
          alert("Genero: "+g.nombre+" ingresado correctamente!");
          this.router.navigate(["listgenero"]);
        }
      });
    } else{
      alert("Debe ingresar Nombre de genero");
    }
  }

}
