import { Component, OnInit } from '@angular/core';
import { Opcion } from '../../entity/opcion';
import { OpcionService } from '../../service/opcion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listopcion',
  standalone: false,
  templateUrl: './listopcion.component.html',
  styleUrl: './listopcion.component.css'
})
export class ListopcionComponent implements OnInit{

  opciones!: Opcion[];

  constructor(private opService: OpcionService, private router:Router){}
  ngOnInit(): void {
      this.opService.getAll().subscribe(data => {
        this.opciones = data;
      })
  }

  deleteOpcion(opc:Opcion){
    var validar = confirm("Esta seguro que desea eliminar el Rol?");
    if(validar == true){
      this.opService.deleteOpcion(opc).subscribe({
        next: (result) => {
          this.opciones = this.opciones.filter(x => x !== opc);
          alert(result);
        },
        error: () => {
          alert("Ha ocurrido un error al eliminar el rol.\nVerifique que no existan usuarios");
        },
      });
    }
  }

  selectOp(r:Opcion): void{
    localStorage.setItem("id",r.idOpcion.toString().valueOf());
    this.router.navigate([""])
  }

}
