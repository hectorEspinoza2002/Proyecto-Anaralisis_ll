import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../entity/usuario';

@Component({
  selector: 'app-editusuario',
  standalone: false,
  templateUrl: './editusuario.component.html',
  styleUrl: './editusuario.component.css'
})
export class EditusuarioComponent implements OnInit, AfterViewInit{
  constructor(private userService:UsuarioService,
    private router:Router
  ){}

  ngOnInit(): void {
      this.selectEdit();
  }

  usuario = new Usuario;

  @ViewChild('myFocus') myFocus: any;

  ngAfterViewInit(): void {
      this.myFocus.nativeElement.focus();
  }

  selectEdit(){
    let id = localStorage.getItem("id");

    if(id){
      this.userService.buscarUsuarioId(id).subscribe( restul => {
        this.usuario = restul;
      })
    }
  }

  editUser(u:Usuario){
    let id = localStorage.getItem("id");
    if(id){
      this.userService.editUsuario(id,u).subscribe(result => {
        this.usuario = result;
        this.router.navigate(["listusuarios"]);
      })
    }
  }

  Cancelar(){
    this.router.navigate(["listusuarios"]);
  }

}
