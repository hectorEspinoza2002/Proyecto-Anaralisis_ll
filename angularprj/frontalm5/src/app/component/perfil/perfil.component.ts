import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../entity/usuario';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  usuario!: Usuario;

  constructor(private userService: UsuarioService){}

  ngOnInit(): void {
      const id = localStorage.getItem('usuario');
      if(id) {
        this.userService.buscarUsuarioId(id).subscribe(data => {
          this.usuario = data;
        });
      }
  }

}
