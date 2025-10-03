import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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

  selectedTipo!: number;
  tipos: TipoSaldoCuenta[] = [];

  selectedStatus!: number;
  status: StatusCuenta[] = [];

  @ViewChild('myFocus') myFocus: any;

  constructor(
    private service: SaldocuentaService,
    private router: Router,
    private serviceTipo: TiposaldocuentaService,
    private serviceStatus: StatuscuentaService
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
    //this.selectEdit();
  }

  //@ViewChild('myFocus') myFocus: any;

  ngAfterViewInit(): void {
    this.myFocus.nativeElement.focus();
  }

  cargarDatosIniciales() {
    this.service.getTiposSaldoCuenta().subscribe(t => this.tipos = t);
    this.service.getStatusCuenta().subscribe(s => this.status = s);
  }


  selectEdit() {
    let id = localStorage.getItem('id');

    if (id) {
      this.service.getCuentaById(id).subscribe((result) => {
        //this.cuenta = result;

        // precargar selects
        this.selectedTipo = this.cuenta.tipoSaldoCuenta.idTipoSaldoCuenta as number;
        this.selectedStatus = this.cuenta.statusCuenta.idStatusCuenta as number;
      });
    }
  }

  editCuenta(cuenta: SaldoCuenta) {
    let id = localStorage.getItem("id");
    if (id) {
      // armar payload
      const payload = {
        idSaldoCuenta: this.cuenta.idSaldoCuenta,
        persona: { idPersona: this.cuenta.persona.idPersona },
        tipoSaldoCuenta: { idTipoSaldoCuenta: this.selectedTipo },
        statusCuenta: { idStatusCuenta: this.selectedStatus },
        saldoAnterior: this.cuenta.saldoAnterior,
        debitos: this.cuenta.debitos,
        creditos: this.cuenta.creditos
      };

      this.service.updateCuenta(+id, payload).subscribe(result => {
        this.cuenta = result;
        alert("Cuenta modificada correctamente!");
        this.router.navigate(["listsaldocuenta", this.cuenta.persona.idPersona]);
      });
    }
  }

  Cancel() {
    this.router.navigate(["listsaldocuenta"]);
  }

}
