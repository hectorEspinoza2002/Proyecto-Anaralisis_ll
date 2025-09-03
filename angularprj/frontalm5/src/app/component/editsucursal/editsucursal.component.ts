import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SucursalService } from '../../service/sucursal.service';
import { Router } from '@angular/router';
import { Sucursal } from '../../entity/Sucursal';
import { Empresa } from '../../entity/empresa';
import { EmpresaService } from '../../service/empresa.service';

@Component({
  selector: 'app-editsucursal',
  standalone: false,
  templateUrl: './editsucursal.component.html',
  styleUrl: './editsucursal.component.css',
})
export class EditsucursalComponent implements OnInit, AfterViewInit {
  //combo
  sucursal: Sucursal = new Sucursal();
  selectedEmpresa: Number | null = null;
  empresa: Empresa[] = [];
  mensaje: string = '';

  @ViewChild('myFocus') myFocus: any;

  constructor(
    private sucursalService: SucursalService,
    private router: Router,
    private empresaService: EmpresaService
  ) {}

  ngOnInit(): void {
    this.selectEdit();
    this.cargarDatosIniciales();
  }

  ngAfterViewInit(): void {
    this.myFocus.nativeElement.focus();
  }

  selectEdit(): void {
    const id = localStorage.getItem('id');
    if (id) {
      this.sucursalService.searchSucursal(id).subscribe((result) => {
        this.sucursal = result;
        this.selectedEmpresa = result.empresa?.idEmpresa ?? null;
      });
    }
  }

  editEmpresa(sucur: Sucursal): void {
    if (this.selectedEmpresa) {
      sucur.empresa = { idEmpresa: this.selectedEmpresa } as unknown as Empresa;
    }

    const id = localStorage.getItem('id');
    if (id) {
      this.sucursalService.editSucursal(id, sucur).subscribe((result) => {
        this.sucursal = result;
        this.router.navigate(['listsucursal']);
        alert(sucur.nombre + ' modificado!');
        this.resetForm();
      });
    }
  }

  Cancel(): void {
    this.router.navigate(['listsucursal']);
  }

  // metodos combo
  cargarDatosIniciales(): void {
    this.empresaService.getAll().subscribe({
      next: (data) => {
        this.empresa = data;
      },
      error: (error) => {
        this.mensaje = 'Error al traer empresa';
        console.error(error);
      },
    });
  }

  private resetForm(): void {
    this.sucursal = new Sucursal();
    this.selectedEmpresa = null;
  }
}
