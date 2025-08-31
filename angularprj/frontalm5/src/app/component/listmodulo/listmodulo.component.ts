import { Component, OnInit } from '@angular/core';
import { Modulo } from '../../entity/modulo';
import { ModuloService } from '../../service/modulo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listmodulo',
  standalone: false,
  templateUrl: './listmodulo.component.html',
  styleUrl: './listmodulo.component.css'
})
export class ListmoduloComponent implements OnInit{

  modulos!: Modulo[];

  constructor(private modService: ModuloService, private router:Router){}
  ngOnInit(): void {
      this.modService.getAll().subscribe(data => {
        this.modulos = data;
      })
  }

  deleteModulo(sucur:Modulo){
    var validar = confirm("Esta seguro que desea eliminar el Rol?");
    if(validar == true){
      this.modService.deleteModulo(sucur).subscribe({
        next: (result) => {
          this.modulos = this.modulos.filter(x => x !== sucur);
          alert(result);
        },
        error: () => {
          alert("Ha ocurrido un error al eliminar el rol.\nVerifique que no existan usuarios");
        },
      });
    }
  }

  selectModulo(r:Modulo): void{
    localStorage.setItem("id",r.idModulo.toString().valueOf());
    this.router.navigate([""])
  }
}
