import { Component, ViewChild } from '@angular/core';
import { EmpresaService } from '../../service/empresa.service';
import { Router } from '@angular/router';
import { Empresa } from '../../entity/empresa';

@Component({
  selector: 'app-editempresa',
  standalone: false,
  templateUrl: './editempresa.component.html',
  styleUrl: './editempresa.component.css'
})
export class EditempresaComponent {

  constructor (private empService: EmpresaService, private router: Router){}
  ngOnInit(): void{
    this.selectEdit();
  }
  emps = new Empresa;
  @ViewChild('myFocus') myFocus: any;

  ngAfterVieeInit(): void{
    this.myFocus.nativeElement.focus();
  }

  selectEdit(){
    let id = localStorage.getItem("id");

    if(id){
      this.empService.searchEmpresa(id)
      .subscribe(result =>{
        this.emps = result;
      })
    }
  }

  editEmpresa(empresa:Empresa){
    let id = localStorage.getItem("id");
    if(id){
      this.empService.editEmpresa(id,empresa)
      .subscribe(result => {
        this.emps = result;
        this.router.navigate(["listempresa"]);
        alert(empresa.nombre + " modificado!");
      })
    }
  }

  Cancel(){
    this.router.navigate(["listempresa"]);
  }

}
