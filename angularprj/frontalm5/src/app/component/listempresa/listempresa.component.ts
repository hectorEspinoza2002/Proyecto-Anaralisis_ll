import { Opcion } from './../../entity/opcion';
import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../entity/empresa';
import { EmpresaService } from '../../service/empresa.service';
import { Router } from '@angular/router';
import { PermisosService } from '../../service/permisos.service';

@Component({
  selector: 'app-listempresa',
  standalone: false,
  templateUrl: './listempresa.component.html',
  styleUrl: './listempresa.component.css',
})
export class ListempresaComponent implements OnInit {
  empresas!: Empresa[];

  puedeAlta = false;
  puedeBaja = false;
  puedeCambio = false;
  puedeExportar = false;
  puedeImprimir = false;

  constructor(
    private empresaService: EmpresaService,
    private router: Router,
    private permisosService: PermisosService
  ) {}
  ngOnInit(): void {
    this.empresaService.getAll().subscribe((data) => {
      this.empresas = data;
    });

    //const permisos = JSON.parse(localStorage.getItem("permisos") || '[]');
    this.permisosService.permisos$.subscribe((permisos) => {
      console.log('Permisos en localStorage:', permisos);

      const permisosEmpresa = permisos.find(
        (p: any) => p.opcion.nombre === 'Empresas'
      );

      if (permisosEmpresa) {
        this.puedeAlta = permisosEmpresa.alta == 1;
        this.puedeBaja = permisosEmpresa.baja == 1;
        this.puedeCambio = permisosEmpresa.cambio == 1;
        this.puedeExportar = permisosEmpresa.exportar == 1;
        this.puedeImprimir = permisosEmpresa.imprimir == 1;
      }
    });
  }

  deleteEmpresa(empr: Empresa) {
    var validar = confirm('Esta seguro que desea eliminar el Empresa?');
    if (validar == true) {
      this.empresaService.deleteEmpresa(empr).subscribe({
        next: (result) => {
          this.empresas = this.empresas.filter((x) => x !== empr);
          alert(result + empr.nombre + ' eliminada correctamente');
        },
        error: () => {
          alert(
            'Ha ocurrido un error al eliminar el Empresa.\nVerifique que no existan sucursales'
          );
        },
      });
    }
  }

  selectEmpresa(r: Empresa): void {
    localStorage.setItem('id', r.idEmpresa.toString().valueOf());
    this.router.navigate(['editempresa']);
  }

  generarPdf(): void {
    if (this.empresas && this.empresas.length > 0) {
      this.empresaService.generarPdfEmpresas(this.empresas);
    } else {
      alert('No hay datos para generar el PDF');
    }
  }

  generarExcel(): void {
    if (this.empresas && this.empresas.length > 0) {
      this.empresaService.generarExcelEmpresas(this.empresas, 'reporte_empresas');
    } else {
      alert('No hay datos para generar el Excel');
    }
  }

  generarExcelSimple(): void {
    if (this.empresas && this.empresas.length > 0) {
      this.empresaService.generarExcelSimple(this.empresas, 'empresas');
    } else {
      alert('No hay datos para generar el Excel');
    }
  }
}
