import { Component, OnInit } from '@angular/core';
import { Menu } from '../../entity/menu';
import { MenuService } from '../../service/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listmenu',
  standalone: false,
  templateUrl: './listmenu.component.html',
  styleUrl: './listmenu.component.css'
})
export class ListmenuComponent implements OnInit{

  menus!: Menu[];

  constructor(private menuService: MenuService, private router:Router){}
  ngOnInit(): void {
      this.menuService.getAll().subscribe(data => {
        this.menus = data;
      })
  }

  deleteMenu(men:Menu){
    var validar = confirm("Esta seguro que desea eliminar el Rol?");
    if(validar == true){
      this.menuService.deleteMenu(men).subscribe({
        next: (result) => {
          this.menus = this.menus.filter(x => x !== men);
          alert(result);
        },
        error: () => {
          alert("Ha ocurrido un error al eliminar el rol.\nVerifique que no existan usuarios");
        },
      });
    }
  }

  selectMenu(r:Menu): void{
    localStorage.setItem("id",r.idMenu.toString().valueOf());
    this.router.navigate([""])
  }

}
