import { TipoMovimientoCxc } from './../../entityf2/TipoMovimientoCxc';
import { Component } from '@angular/core';
import { TipomovimientocxcService } from '../../servicef2/tipomovimientocxc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtipomovimientocxc',
  standalone: false,
  templateUrl: './addtipomovimientocxc.component.html',
  styleUrl: './addtipomovimientocxc.component.css'
})
export class AddtipomovimientocxcComponent {
  tmcxc = new TipoMovimientoCxc;

  constructor(private tmService: TipomovimientocxcService,
    private router: Router
  ) {}
  ngOnInit(): void{}

  Cancelar(){
    this.router.navigate(["listtipomovimientocxc"]);
  }

  guardar(tmc:TipoMovimientoCxc){
    if(typeof(tmc.nombre) != "undefined"){
      this.tmService.addTipoMovimientoCxc(tmc).subscribe(result => {
        if(result != null){
          alert("Tipo Movimiento: "+tmc.nombre+" ingresado correctamente!");
          this.router.navigate(["listtipomovimientocxc"]);
        }
      });
    } else {
      alert("Debe ingresar Nombre Tipo Movimiento");
    }
  }

}
