import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EstadocivilService } from '../../servicef2/estadocivil.service';
import { Router } from '@angular/router';
import { EstadoCivil } from '../../entityf2/EstadoCivil';

@Component({
  selector: 'app-editestadocivil',
  standalone: false,
  templateUrl: './editestadocivil.component.html',
  styleUrl: './editestadocivil.component.css'
})
export class EditestadocivilComponent implements OnInit, AfterViewInit{
  estadoC = new EstadoCivil;

  constructor(
    private estadoService: EstadocivilService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.selectEdit();
  }

  @ViewChild('myFocus') myFocus: any;

  ngAfterViewInit(): void {
      this.myFocus.nativeElement.focus();
  }

  selectEdit(){
      let id = localStorage.getItem("id");

      if(id){
        this.estadoService.buscarEstadoCivil(id)
        .subscribe(result =>{
          this.estadoC = result;
        })
      }
    }

    editRol(ec:EstadoCivil){
      let id = localStorage.getItem("id");
      if(id){
        this.estadoService.editEstatusCivil(id,ec)
        .subscribe(result => {
          this.estadoC = result;
          this.router.navigate(["listestadocivil"]);
          alert(ec.nombre + " modificado!");
        })
      }
    }

    Cancel(){
      this.router.navigate(["listestadocivil"]);
    }


}
