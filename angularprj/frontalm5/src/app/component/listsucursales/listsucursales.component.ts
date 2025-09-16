import { Component, OnInit } from '@angular/core';
import { Sucursal } from '../../entity/Sucursal';
import { SucursalService } from '../../service/sucursal.service';
import { Router } from '@angular/router';
import { PermisosService } from '../../service/permisos.service';

@Component({
  selector: 'app-listsucursales',
  standalone: false,
  templateUrl: './listsucursales.component.html',
  styleUrl: './listsucursales.component.css'
})
export class ListsucursalesComponent implements OnInit{
  sucursales!: Sucursal[];

  puedeAlta = false;
  puedeBaja = false;
  puedeCambio = false;

  constructor(private sucursalService: SucursalService, private router:Router,
    private permisosService: PermisosService
  ){}
  ngOnInit(): void {
      this.sucursalService.getAll().subscribe(data => {
        this.sucursales = data;
      });

      this.permisosService.permisos$.subscribe((permisos) => {
      console.log('Permisos en localStorage:', permisos);

      const permisosEmpresa = permisos.find(
        (p: any) => p.opcion.nombre === 'Sucursales'
      );

      if (permisosEmpresa) {
        this.puedeAlta = permisosEmpresa.alta == 1;
        this.puedeBaja = permisosEmpresa.baja == 1;
        this.puedeCambio = permisosEmpresa.cambio == 1;
      }
    });
  }

  deleteSucursal(sucur:Sucursal){
    var validar = confirm("Esta seguro que desea eliminar el Rol?");
    if(validar == true){
      this.sucursalService.deleteSucursal(sucur).subscribe({
        next: (result) => {
          this.sucursales = this.sucursales.filter(x => x !== sucur);
          alert(result + "Sucursal: "+sucur.nombre+" a sido eliminada!");
        },
        error: () => {
          alert("Ha ocurrido un error al eliminar el rol.\nVerifique que no existan usuarios");
        },
      });
    }
  }

  selectSucur(r:Sucursal): void{
    localStorage.setItem("id",r.idSucursal.toString().valueOf());
    this.router.navigate(["editsucursal"])
  }

}
