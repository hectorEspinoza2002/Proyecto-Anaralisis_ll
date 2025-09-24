import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StatuscuentaService } from '../../servicef2/statuscuenta.service';
import { Router } from '@angular/router';
import { StatusCuenta } from '../../entityf2/StatusCuenta';

@Component({
  selector: 'app-editstatuscuenta',
  standalone: false,
  templateUrl: './editstatuscuenta.component.html',
  styleUrl: './editstatuscuenta.component.css'
})
export class EditstatuscuentaComponent implements OnInit, AfterViewInit{
  constructor (private statusService: StatuscuentaService, private router: Router){}

  ngOnInit(): void{
    this.selectEdit();
  }
  statusC = new StatusCuenta;

  @ViewChild('myFocus') myFocus: any;

  ngAfterViewInit(): void{
    this.myFocus.nativeElement.focus();
  }

  selectEdit(){
    let id = localStorage.getItem("id");

    if(id){
      this.statusService.buscarStatusCuenta(id)
      .subscribe(result =>{
        this.statusC = result;
      })
    }
  }

  editRol(sc:StatusCuenta){
    let id = localStorage.getItem("id");
    if(id){
      this.statusService.editStatusCuenta(id,sc)
      .subscribe(result => {
        this.statusC = result;
        this.router.navigate(["liststatuscuenta"]);
        alert(sc.nombre + " modificado!");
      })
    }
  }

  Cancel(){
    this.router.navigate(["liststatuscuenta"]);
  }

}
