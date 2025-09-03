import { Component, OnInit } from '@angular/core';
import { Menu } from '../../entity/menu';
import { MenuService } from '../../service/menu.service';
import { Router } from '@angular/router';
import { Modulo } from '../../entity/modulo';

@Component({
  selector: 'app-addmenu',
  standalone: false,
  templateUrl: './addmenu.component.html',
  styleUrl: './addmenu.component.css'
})
export class AddmenuComponent implements OnInit{
  //men = new Menu;
  menus: Menu = {} as Menu;
  moduloDisponibles: Modulo[] = [];
  selectedModulo: number | null = null;

  constructor(private service:MenuService, private router:Router){}

  ngOnInit(): void{ this.cargarDatosIniciales(); }

  Cancelar(): void{
    this.router.navigate(["listmenu"]);
  }

  guardar(menus:Menu): void {
    if (!this.validarFormulario()) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const modulo = this.moduloDisponibles.find(g => g.idModulo === this.selectedModulo);
    if (!modulo) {
      alert("Debe seleccionar un módulo válido");
      return;
    }

    this.menus.modulo = modulo;

    this.service.addMenu(menus).subscribe({
      next: (result) => {
        if (result) {
          alert("Menu: " + menus.nombre + " ingresado correctamente!");
          this.router.navigate(["listmenu"]);
        }
      },
      error: (err) => {
        console.error("Error al guardar el menú:", err);
        alert("Ocurrió un error al guardar el menú");
      }
    });
  }

  /*
  guardar(menus:Menu){

    if (!this.validarFormulario()) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const modulo = this.moduloDisponibles.find(g => g.idModulo === this.selectedModulo);

    if(!modulo){
      alert('Debe seleccionar un modulo');
      return;
    }
    this.menus.modulo = modulo;

    if(typeof(menus.nombre) != "undefined"){
      this.service.addMenu(menus).subscribe(result => {
        if(result != null){
          alert("Rol: "+menus.nombre+" ingresado correctamente!");
          this.router.navigate(["listmenu"]);
        }
      });
    } else{
      alert("Debe ingresar Nombre y orden");
    }
  }
    */

  cargarDatosIniciales(): void {
    // Cargar modulo
    this.service.getModulos().subscribe({
      next: (mod) => this.moduloDisponibles = mod,
      error: (error) => console.error('Error cargando modulos:', error)
    });
  }


  private validarFormulario(): boolean {
    return !!(this.menus.nombre && this.selectedModulo !== null);
  }
}
