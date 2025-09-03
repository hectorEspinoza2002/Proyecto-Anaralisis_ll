import { Component, OnInit } from '@angular/core';
import { Genero } from '../../entity/genero';
import { GeneroService } from '../../service/genero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listgenero',
  standalone: false,
  templateUrl: './listgenero.component.html',
  styleUrl: './listgenero.component.css'
})
export class ListgeneroComponent implements OnInit{
  generos!: Genero[];

  constructor(private generoService: GeneroService, private router:Router){}
  ngOnInit(): void {
      this.generoService.listGenero().subscribe(data => {
        this.generos = data;
      })
  }

  deleteGenero(ge:Genero){
    var validar = confirm("Esta seguro que desea eliminar el Rol?");
    if(validar == true){
      this.generoService.deleteGenero(ge).subscribe({
        next: (result) => {
          this.generos = this.generos.filter(x => x !== ge);
          alert(result + ge.nombre +" a sido eliminado!");
        },
        error: () => {
          alert("Ha ocurrido un error al eliminar el rol.\nVerifique que no existan usuarios");
        },
      });
    }
  }

  selectGenero(gr:Genero): void{
    localStorage.setItem("id",gr.idGenero.toString().valueOf());
    this.router.navigate(["editgenero"]);
  }

}
