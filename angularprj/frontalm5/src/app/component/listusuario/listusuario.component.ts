import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../entity/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listusuario',
  standalone: false,
  templateUrl: './listusuario.component.html',
  styleUrl: './listusuario.component.css'
})
export class ListusuarioComponent implements OnInit{
  usuarios!: Usuario[];

  constructor(private uService: UsuarioService, private router:Router){}
  ngOnInit(): void {
      this.uService.listUsuarios().subscribe(data =>{
        this.usuarios = data;
      })
  }

  deleteUsuario(us: Usuario){
    var valida = confirm("Estas seguro que deseas eliminar el usuario?");
    if(valida == true){
//      this.uService.
    }
  }

}
