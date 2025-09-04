import { Component, OnInit } from '@angular/core';
import { StatusUsuario } from '../../entity/statusUsuario';
import { StatusUsuarioService } from '../../service/status-usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liststatususuario',
  standalone: false,
  templateUrl: './liststatususuario.component.html',
  styleUrl: './liststatususuario.component.css'
})
export class ListstatususuarioComponent implements OnInit{
  status!: StatusUsuario[];

  constructor(private statuService: StatusUsuarioService,
    private router:Router ){}

    ngOnInit(): void {
        this.statuService.listStatusU().subscribe(data => {
          this.status = data;
        })
    }

    deleteStatus(statusUs:StatusUsuario){
      var validar = confirm("Esta seguro que desea eliminar Status del Usuario");
    if(validar == true){
      this.statuService.deleteStatus(statusUs).subscribe({
        next: (result) => {
          this.status = this.status.filter(x => x !== statusUs);
          alert(result + statusUs.nombre + " a sido eliminado!");
        },
        error:() => {
          alert("Ha ocurrido un error al eliminar el Estus del Usuario");
        }
      });
    }
  }

  selectEstatus(s:StatusUsuario): void {
    localStorage.setItem("id",s.idStatusUsuario.toString().valueOf());
    this.router.navigate(["editstatususuario"])
  }

}
