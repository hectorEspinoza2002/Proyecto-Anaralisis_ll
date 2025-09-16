import { Component, OnInit } from '@angular/core';
import { Menu } from '../../entity/menu';
import { MenuService } from '../../service/menu.service';
import { Router } from '@angular/router';
import { PermisosService } from '../../service/permisos.service';

@Component({
  selector: 'app-listmenu',
  standalone: false,
  templateUrl: './listmenu.component.html',
  styleUrl: './listmenu.component.css',
})
export class ListmenuComponent implements OnInit {
  menus!: Menu[];

  puedeAlta = false;
  puedeBaja = false;
  puedeCambio = false;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private permisosService: PermisosService
  ) {}
  ngOnInit(): void {
    this.menuService.getAll().subscribe((data) => {
      this.menus = data;
    });

    this.permisosService.permisos$.subscribe((permisos) => {
      console.log('Permisos en localStorage:', permisos);

      const permisosEmpresa = permisos.find(
        (p: any) => p.opcion.nombre === 'Menus'
      );

      if (permisosEmpresa) {
        this.puedeAlta = permisosEmpresa.alta == 1;
        this.puedeBaja = permisosEmpresa.baja == 1;
        this.puedeCambio = permisosEmpresa.cambio == 1;
      }
    });
  }

  deleteMenu(men: Menu) {
    var validar = confirm('Esta seguro que desea eliminar el Rol?');
    if (validar == true) {
      this.menuService.deleteMenu(men).subscribe({
        next: (result) => {
          this.menus = this.menus.filter((x) => x !== men);
          alert(result + 'Menu ' + men.nombre + ' eliminado correctamente!');
        },
        error: () => {
          alert(
            'Ha ocurrido un error al eliminar el rol.\nVerifique que no existan usuarios'
          );
        },
      });
    }
  }

  selectMenu(r: Menu): void {
    localStorage.setItem('id', r.idMenu.toString().valueOf());
    this.router.navigate(['editmenu']);
  }
}
