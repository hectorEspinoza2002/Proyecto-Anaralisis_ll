import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SaldoCuenta } from '../../entityf2/SaldoCuenta';
import { TipoSaldoCuenta } from '../../entityf2/TipoSaldoCuenta';
import { StatusCuenta } from '../../entityf2/StatusCuenta';
import { SaldocuentaService } from '../../servicef2/saldocuenta.service';
import { Router } from '@angular/router';
import { TiposaldocuentaService } from '../../servicef2/tiposaldocuenta.service';
import { StatuscuentaService } from '../../servicef2/statuscuenta.service';

@Component({
  selector: 'app-editsaldocuenta',
  standalone: false,
  templateUrl: './editsaldocuenta.component.html',
  styleUrl: './editsaldocuenta.component.css'
})
export class EditsaldocuentaComponent implements OnInit, AfterViewInit {
  cuenta = new SaldoCuenta();

  selectedTipo: Number | null = null;
  tipos: TipoSaldoCuenta[] = [];

  selectedStatus: Number | null = null;
  status: StatusCuenta[] = [];

  constructor(
    private serviceSaldo: SaldocuentaService,
    private router: Router,
    private serviceTipo: TiposaldocuentaService,
    private serviceStatus: StatuscuentaService
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
    this.selectEdit();
  }

  //@ViewChild('myFocus') myFocus: any;

  @ViewChild('myFocus', { static: false }) myFocus!: ElementRef;

  ngAfterViewInit(): void {
    this.myFocus.nativeElement.focus();
  }

  selectEdit() {
    let id = localStorage.getItem('id');

    if (id) {

      this.serviceSaldo.getCuentaById(id).subscribe((result) => {
        this.cuenta = result;

        // precargar selects
        //this.selectedTipo = this.cuenta.tipoSaldoCuenta.idTipoSaldoCuenta as number;
        //this.selectedStatus = this.cuenta.statusCuenta.idStatusCuenta as number;
        this.selectedTipo = result.tipoSaldoCuenta?.idTipoSaldoCuenta ?? null;
        this.selectedStatus = result.statusCuenta?.idStatusCuenta ?? null;
      });
    }
  }

  editCuenta(c: SaldoCuenta) {
    if(this.selectedStatus && this.selectedTipo){
      c.statusCuenta = {idStatusCuenta: this.selectedStatus} as StatusCuenta;
      c.tipoSaldoCuenta = {idTipoSaldoCuenta: this.selectedTipo} as TipoSaldoCuenta;
    }

    let id = localStorage.getItem('id');
    if(id){
      this.serviceSaldo.updateCuenta(id, c).subscribe((result) => {
        this.cuenta = result;
        this.router.navigate(["/listsaldocuenta"]);
        alert("Modificacion exitosa");
        this.resetForm();
      });
    }
  }

  Cancel() {
    this.router.navigate(["/listsaldocuenta"]);
  }

  private resetForm(): void {
    this.cuenta = new SaldoCuenta();
    this.selectedStatus = null;
    this.selectedTipo = null;
  }

  cargarDatosIniciales() {
    this.serviceSaldo.getTiposSaldoCuenta().subscribe(t => this.tipos = t);
    this.serviceSaldo.getStatusCuenta().subscribe(s => this.status = s);
  }

}
