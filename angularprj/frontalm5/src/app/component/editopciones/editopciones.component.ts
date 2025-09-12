import { OpcionService } from './../../service/opcion.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Opcion } from '../../entity/opcion';
import { Menu } from '../../entity/menu';
import { Router } from '@angular/router';
import { MenuService } from '../../service/menu.service';

@Component({
  selector: 'app-editopciones',
  standalone: false,
  templateUrl: './editopciones.component.html',
  styleUrl: './editopciones.component.css'
})
export class EditopcionesComponent implements OnInit, AfterViewInit {
  opcion: Opcion = new Opcion();

  selectedMenu: Number | null = null;
  menu: Menu[] = [];
  mensaje: string  = '';

  @ViewChild('myFocus') myFocus: any;

  constructor(
    private opcionService: OpcionService,
    private router: Router,
    private menuService: MenuService
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
      this.opcionService.buscarOpcion(id).subscribe((result)=> {
        this.opcion = result;
        this.selectedMenu = result.menu?.idMenu ?? null;
      });
    }
  }

  editMenu(op:Opcion): void{
    if(this.selectedMenu){
      op.menu = {idMenu: this.selectedMenu} as Menu;
    }

    const id = localStorage.getItem('id');
    if(id){
      this.opcionService.editOpcion(id,op).subscribe((result) => {
        this.opcion = result;
        this.router.navigate(['listopcion']);
        alert(op.nombre+' modificado!');
        this.resetForm();
      });
    }
  }

  Cancel(): void {
    this.router.navigate(['listopcion']);
  }

  cargarDatosIniciales(): void {
    this.menuService.getAll().subscribe({
      next: (data) => {
        this.menu = data;
      },
      error: (err) => {
        this.mensaje = 'Erro al traer Menu';
        console.error(err);
      }
    });
  }

  private resetForm(): void{
    this.opcion = new Opcion();
    this.selectedMenu = null;
  }

}
