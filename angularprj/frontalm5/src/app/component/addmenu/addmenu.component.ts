import { Component } from '@angular/core';
import { Menu } from '../../entity/menu';
import { MenuService } from '../../service/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addmenu',
  standalone: false,
  templateUrl: './addmenu.component.html',
  styleUrl: './addmenu.component.css'
})
export class AddmenuComponent {
  men = new Menu;

  constructor(private service:MenuService, private router:Router){}
  ngOnInit(): void{}

  Cancelar(){
    this.router.navigate(["listmenu"]);
  }

  guardar(menu:Menu){
    if(typeof(menu.nombre) != "undefined"){
      this.service.addMenu(menu).subscribe(result => {
        if(result != null){
          alert("Rol: "+menu.nombre+" ingresado correctamente!");
          this.router.navigate(["listmenu"]);
        }
      });
    } else{
      alert("Debe ingresar Nombre del rol y Fecha");
    }
  }

}
