import { Component } from '@angular/core';
import { StatusUsuario } from '../../entity/statusUsuario';
import { StatusUsuarioService } from '../../service/status-usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addstatususuario',
  standalone: false,
  templateUrl: './addstatususuario.component.html',
  styleUrl: './addstatususuario.component.css'
})
export class AddstatususuarioComponent {
  status = new StatusUsuario;

  constructor(private statusService:StatusUsuarioService,
    private router:Router
  ){}

  Cancelar(){
    this.router.navigate(["liststatususuario"]);
  }

  guardarStatus(statusUs:StatusUsuario){
    if(typeof(statusUs.nombre) != "undefined"){
      this.statusService.addStatus(statusUs).subscribe(result => {
        if(result != null){
          alert("Estatus: "+statusUs.nombre+" ingresado correctamente!");
          this.router.navigate(["liststatususuario"]);
        }
      });
    } else {
      alert("Debe ingresar datos!")
    }
  }

}
