import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listestadocuenta',
  standalone: false,
  templateUrl: './listestadocuenta.component.html',
  styleUrl: './listestadocuenta.component.css'
})
export class ListestadocuentaComponent {
  //implements OnInit
/*
  // Variables de búsqueda
  searchControl = new FormControl('');
  //filteredCuentas: EstadoCuenta[] = [];
  //selectedCuenta!: EstadoCuenta | null;
  cuentaSeleccionadaTexto = '';
  cargando = false;

  //constructor(private estadoCuentaService: EstadoCuentaService) {}
/*
  ngOnInit(): void {
    // Escucha del buscador
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(valor => {
        if (valor && valor.length >= 2) {
          this.buscarCuenta(valor);
        } else {
          this.filteredCuentas = [];
        }
      });
  }

  /*
  buscarCuenta(termino: string): void {
    this.cargando = true;
    this.estadoCuentaService.buscarCuentas(termino).subscribe({
      next: (resp) => {
        this.filteredCuentas = resp;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        alert('❌ Error al buscar las cuentas.');
      }
    });
  }

  seleccionarCuenta(cuenta: EstadoCuenta): void {
    this.selectedCuenta = cuenta;
    this.cuentaSeleccionadaTexto = `${cuenta.nombreCompleto} - Cuenta #${cuenta.idCuenta}`;
    this.filteredCuentas = [];
  }

  limpiarBusqueda(): void {
    this.searchControl.setValue('');
    this.selectedCuenta = null;
    this.cuentaSeleccionadaTexto = '';
  }

  obtenerEstadoCuenta(): void {
    if (!this.selectedCuenta) {
      alert('⚠️ Debe seleccionar una cuenta para consultar el estado.');
      return;
    }

    this.cargando = true;
    this.estadoCuentaService.obtenerEstadoCuenta(this.selectedCuenta.idCuenta).subscribe({
      next: (resp) => {
        this.selectedCuenta!.movimientos = resp.movimientos;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        alert('❌ Error al obtener el estado de cuenta.');
      }
    });
  }
  */

}
