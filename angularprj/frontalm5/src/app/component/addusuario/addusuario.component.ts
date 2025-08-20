import { UsuarioService } from './../../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../entity/usuario';
import { Router } from '@angular/router';
import { GeneroService } from '../../service/genero.service';
import { StatusUsuarioService } from '../../service/status-usuario.service';
import { Genero } from '../../entity/genero';
import { StatusUsuario } from '../../entity/statusUsuario';

@Component({
  selector: 'app-addusuario',
  standalone: false,
  templateUrl: './addusuario.component.html',
  styleUrl: './addusuario.component.css'
})
export class AddusuarioComponent implements OnInit{
  usuario = new Usuario;

  selectedStatus: string = '';
  selectedGenero: string = '';
  generoDisponibles: Genero [] = [];
  statuDisponibles: StatusUsuario [] = [];

  constructor(
    private uService:UsuarioService,
    private router:Router,
    private generoService:GeneroService,
    private statusService:StatusUsuarioService

  ){}

  ngOnInit(): void {

    this.generoService.getAll().subscribe(generos => {
      this.generoDisponibles = generos;
    });

    this.statusService.getAll().subscribe(statusU => {
      this.statuDisponibles = statusU;
    });

  }

    Cancel(){
      this.router.navigate(["listusuarios"]);
    }

  save(usuario:Usuario){

    if(!this.selectedStatus && !this.selectedGenero){
      alert("Debe seleccionar estatus o genero del usuario");
      return;
    }

    const statusIdStr = this.selectedStatus.toString();
    const generoIdStr = this.selectedGenero.toString();

    this.usuario.idGenero = {idGenero: +this.selectedGenero} as any;
    this.usuario.idStatusUsuario = {idStatusUsuario: + this.selectedStatus} as any;

    this.usuario.fechaCreacion = new Date();
    this.usuario.usuarioCreacion = 'system';

    this.uService.addUsuarios(this.usuario).subscribe(res => {
      if(res != null){
        alert("Usuario registrado con exito");
        this.router.navigate(["listusuarios"]);
      } else {
        alert("El usuario ya existe u ocurrio un error");

      }
    })

    //buscar genero por id
    /*
    this.generoService.buscarGenero(generoIdStr).subscribe(genero => {
      usuario.idGenero = genero;

      this.statusService.buscarStatusU(statusIdStr).subscribe(status => {
        usuario.idStatusUsuario = status;



        //Guardar
        this.uService.addUsuarios(usuario).subscribe(result => {
          if(result != null){
            alert("Usuario: "+usuario.correoElectronico+" registrado exitosamente");
            this.router.navigate(["listusuarios"]);
          } else {
            alert("El usuario ya existe o ocurrio un error");
          }
        });
      });
    });
    */

    /*
    if(typeof(usuario.idUsuario) != "undefined"){
      this.uService.addUsuarios(usuario).subscribe(result => {
        if(result != null){
          alert("Usuario Ingreado Correctamente");
          this.router.navigate(["listusuarios"]);
        } else {
          alert("Usario ya existente");
        }
      });
    } else {
      alert("Debe ingresar los datos");
    }*/
  }

}
