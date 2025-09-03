import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GeneroService } from '../../service/genero.service';
import { Router } from '@angular/router';
import { Genero } from '../../entity/genero';

@Component({
  selector: 'app-editgenero',
  standalone: false,
  templateUrl: './editgenero.component.html',
  styleUrl: './editgenero.component.css'
})
export class EditgeneroComponent implements OnInit, AfterViewInit{

  constructor (private generoService: GeneroService, private router: Router){}

  ngOnInit(): void{
    this.selectEdit();
  }
  generos = new Genero;

  @ViewChild('myFocus') myFocus: any;

  ngAfterViewInit(): void{
    this.myFocus.nativeElement.focus();
  }

  selectEdit(){
    let id = localStorage.getItem("id");

    if(id){
      this.generoService.buscarGenero(id)
      .subscribe(result =>{
        this.generos = result;
      })
    }
  }

  editRol(g:Genero){
    let id = localStorage.getItem("id");
    if(id){
      this.generoService.editGenero(id,g)
      .subscribe(result => {
        this.generos = result;
        this.router.navigate(["listgenero"]);
        alert(g.nombre + " modificado!");
      })
    }
  }

  Cancel(){
    this.router.navigate(["listgenero"]);
  }

}
