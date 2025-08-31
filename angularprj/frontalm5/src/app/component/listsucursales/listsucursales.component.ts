import { Component, OnInit } from '@angular/core';
import { Sucursal } from '../../entity/Sucursal';
import { SucursalService } from '../../service/sucursal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listsucursales',
  standalone: false,
  templateUrl: './listsucursales.component.html',
  styleUrl: './listsucursales.component.css'
})
export class ListsucursalesComponent implements OnInit{
  sucursales!: Sucursal[];

  constructor(private sucursalService: SucursalService, private router:Router){}
  ngOnInit(): void {
      this.sucursalService.getAll().subscribe(data => {
        this.sucursales = data;
      })
  }

  deleteSucursal(sucur:Sucursal){
    var validar = confirm("Esta seguro que desea eliminar el Rol?");
    if(validar == true){
      this.sucursalService.deleteSucursal(sucur).subscribe({
        next: (result) => {
          this.sucursales = this.sucursales.filter(x => x !== sucur);
          alert(result);
        },
        error: () => {
          alert("Ha ocurrido un error al eliminar el rol.\nVerifique que no existan usuarios");
        },
      });
    }
  }

  selectSucur(r:Sucursal): void{
    localStorage.setItem("id",r.idSucursal.toString().valueOf());
    this.router.navigate([""])
  }

}
