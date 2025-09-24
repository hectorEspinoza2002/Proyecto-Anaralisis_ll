import { TipomovimientocxcService } from './../../servicef2/tipomovimientocxc.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TipoMovimientoCxc } from '../../entityf2/TipoMovimientoCxc';

@Component({
  selector: 'app-edittipomovimientocxc',
  standalone: false,
  templateUrl: './edittipomovimientocxc.component.html',
  styleUrl: './edittipomovimientocxc.component.css'
})
export class EdittipomovimientocxcComponent implements OnInit, AfterViewInit{

  constructor (private tipoCxcService:TipomovimientocxcService, private router: Router){}

  ngOnInit(): void{
    this.selectEdit();
  }
  tipoCxc = new TipoMovimientoCxc;

  @ViewChild('myFocus') myFocus: any;

  ngAfterViewInit(): void{
    this.myFocus.nativeElement.focus();
  }

  selectEdit(){
    let id = localStorage.getItem("id");

    if(id){
      this.tipoCxcService.buscarTipoMovimientoCxc(id)
      .subscribe(result =>{
        this.tipoCxc = result;
      })
    }
  }

  editRol(tmcxc:TipoMovimientoCxc){
    let id = localStorage.getItem("id");
    if(id){
      this.tipoCxcService.editTipoMovimientoCxc(id,tmcxc)
      .subscribe(result => {
        this.tipoCxc = result;
        this.router.navigate(["listtipomovimientocxc"]);
        alert(tmcxc.nombre + " modificado!");
      })
    }
  }

  Cancel(){
    this.router.navigate(["listtipomovimientocxc"]);
  }

}
