import { Component, OnInit } from '@angular/core';
import { StatusUsuario } from '../../entity/statusUsuario';
import { StatusUsuarioService } from '../../service/status-usuario.service';
import { Router } from '@angular/router';
import { PermisosService } from '../../service/permisos.service';

@Component({
  selector: 'app-liststatususuario',
  standalone: false,
  templateUrl: './liststatususuario.component.html',
  styleUrl: './liststatususuario.component.css',
})
export class ListstatususuarioComponent implements OnInit {
  status!: StatusUsuario[];

  puedeAlta = false;
  puedeBaja = false;
  puedeCambio = false;

  puedeExportar = false;
  puedeImprimir = false;

  constructor(
    private statuService: StatusUsuarioService,
    private router: Router,
    private permisosService: PermisosService
  ) {}

  ngOnInit(): void {
    this.statuService.listStatusU().subscribe((data) => {
      this.status = data;
    });

    this.permisosService.permisos$.subscribe((permisos) => {
      console.log('Permisos en localStorage:', permisos);

      const permisosEmpresa = permisos.find(
        (p: any) => p.opcion.nombre === 'Estatus Usuario'
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

  deleteStatus(statusUs: StatusUsuario) {
    var validar = confirm('Esta seguro que desea eliminar Status del Usuario');
    if (validar == true) {
      this.statuService.deleteStatus(statusUs).subscribe({
        next: (result) => {
          this.status = this.status.filter((x) => x !== statusUs);
          alert(result + statusUs.nombre + ' a sido eliminado!');
        },
        error: () => {
          alert('Ha ocurrido un error al eliminar el Estus del Usuario');
        },
      });
    }
  }

  selectEstatus(s: StatusUsuario): void {
    localStorage.setItem('id', s.idStatusUsuario.toString().valueOf());
    this.router.navigate(['editstatususuario']);
  }

  generarPdf(): void {
    if (this.status && this.status.length > 0) {
      this.statuService.generarPdfStatusUsuario(this.status);
    } else {
      alert('No hay datos para generar el PDF');
    }
  }

  generarExcelSimple(): void {
    if (this.status && this.status.length > 0) {
      this.statuService.generarExcelSimple(this.status, 'status');
    } else {
      alert('No hay datos para generar el Excel');
    }
  }
}
