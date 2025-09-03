import { Component, ViewChild } from '@angular/core';
import { ModuloService } from '../../service/modulo.service';
import { Router } from '@angular/router';
import { Modulo } from '../../entity/modulo';

@Component({
  selector: 'app-editmodulo2',
  standalone: false,
  templateUrl: './editmodulo2.component.html',
  styleUrl: './editmodulo2.component.css'
})
export class Editmodulo2Component {

  constructor (private modService: ModuloService, private router: Router){}
  ngOnInit(): void{
    this.selectEdit();
  }
  modul = new Modulo;
  @ViewChild('myFocus') myFocus: any;

  ngAfterVieeInit(): void{
    this.myFocus.nativeElement.focus();
  }

  selectEdit(){
    let id = localStorage.getItem("id");

    if(id){
      this.modService.searchModulo(id)
      .subscribe(result =>{
        this.modul = result;
      })
    }
  }

  editEmpresa(md:Modulo){
    let id = localStorage.getItem("id");
    if(id){
      this.modService.editModulo(id,md)
      .subscribe(result => {
        this.modul = result;
        this.router.navigate(["listmodulo"]);
        alert(md.nombre + " modificado!");
      })
    }
  }

  Cancel(){
    this.router.navigate(["listmodulo"]);
  }

}
