import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Menu } from '../../entity/menu';
import { Modulo } from '../../entity/modulo';
import { MenuService } from '../../service/menu.service';
import { Router } from '@angular/router';
import { ModuloService } from '../../service/modulo.service';

@Component({
  selector: 'app-editmenu',
  standalone: false,
  templateUrl: './editmenu.component.html',
  styleUrl: './editmenu.component.css'
})
export class EditmenuComponent implements OnInit, AfterViewInit{

  //tools combo
  menu : Menu = new Menu();
  selectedModulo: Number | null = null;
  modulo: Modulo[] = [];
  mensaje: string = '';

  @ViewChild('myFocus') myFocus: any;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private moduloService: ModuloService
  ){}

  ngOnInit(): void {
    this.selectEdit();
    this.cargarDatosIniciales();
  }

  ngAfterViewInit(): void {
      this.myFocus.nativeElement.focus();
  }

  selectEdit(): void {
    const id = localStorage.getItem('id');
    if(id){
      this.menuService.buscarMenu(id).subscribe((result) => {
        this.menu = result;
        this.selectedModulo = result.modulo?.idModulo ?? null;
      });
    }
  }

  editMenu(m:Menu): void {
    if(this.selectedModulo){
      m.modulo = {idModulo: this.selectedModulo} as Modulo;
    }

    const id = localStorage.getItem('id');
    if(id){
      this.menuService.editMenu(id,m).subscribe((result) => {
        this.menu = result;
        this.router.navigate(['listmenu']);
        alert(m.nombre+' modificado!');
        this.resetFom();
      });
    }
  }

  Cancel(): void {
    this.router.navigate(['listmenu']);
  }

  cargarDatosIniciales(): void{
    this.moduloService.getAll().subscribe({
      next: (data) => {
        this.modulo = data;
      },
      error: (error) => {
        this.mensaje = 'Error al traer modulos';
        console.error(error);
      }
    });
  }

  private resetFom(): void{
    this.menu = new Menu();
    this.selectedModulo = null;
  }
}
