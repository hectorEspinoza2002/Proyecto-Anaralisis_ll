import { Component } from '@angular/core';
import { Opcion } from '../../entity/opcion';
import { OpcionService } from '../../service/opcion.service';
import { Router } from '@angular/router';
import { Menu } from '../../entity/menu';
import { MenuService } from '../../service/menu.service';

@Component({
  selector: 'app-addopcion',
  standalone: false,
  templateUrl: './addopcion.component.html',
  styleUrl: './addopcion.component.css'
})
export class AddopcionComponent {
  opcion = new Opcion;

  selectedMenu!: number;
  menu: Menu[] = [];
  mensaje: String = '';

  constructor(private service:OpcionService, private router:Router,
    private menuService:MenuService
  ){}
  ngOnInit(): void{
    this.cargarMenu();
  }

  Cancelar(){
    this.router.navigate(["listopcion"]);
  }

  guardar(opc:Opcion){

    this.opcion.menu = {idMenu: this.selectedMenu} as unknown as Menu;

    if(typeof(opc.nombre) != "undefined" && this.selectedMenu){
      this.service.addOpcion(opc).subscribe(result => {
        if(result != null){
          alert("Rol: "+opc.nombre+" ingresado correctamente!");
          this.router.navigate(["listopcion"]);
        }
        this.resetForm();
      });
    } else{
      alert("Debe ingresar datos!");
    }
  }

  resetForm(): void{
    this.opcion = new Opcion;
    this.selectedMenu = null!;
  }

  cargarMenu(): void{
    this.menuService.getAll().subscribe({
      next: (data) => {
        this.menu = data;
      },
      error: (err) => {
        this.mensaje = 'Error al traer menus';
      }
    })
  }

}
