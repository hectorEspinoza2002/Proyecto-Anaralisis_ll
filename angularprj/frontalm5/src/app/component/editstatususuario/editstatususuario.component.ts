import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StatusUsuarioService } from '../../service/status-usuario.service';
import { Router } from '@angular/router';
import { StatusUsuario } from '../../entity/statusUsuario';

@Component({
  selector: 'app-editstatususuario',
  standalone: false,
  templateUrl: './editstatususuario.component.html',
  styleUrl: './editstatususuario.component.css'
})
export class EditstatususuarioComponent implements OnInit, AfterViewInit{
  constructor(private statuService:StatusUsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectEdit();
  }

  status = new StatusUsuario;

  @ViewChild('myFocus') myFocus: any;

  ngAfterViewInit(): void {
      this.myFocus.nativeElement.focus();
  }

  selectEdit(){
    let id = localStorage.getItem("id");

    if(id){
      this.statuService.buscarStatusU(id).subscribe (result => {
        this.status = result;
      })
    }
  }

  editStatus(s:StatusUsuario){
    let id = localStorage.getItem("id");
    if(id){
      this.statuService.editStatus(id,s).subscribe(result => {
        this.status = result;
        this.router.navigate(["liststatususuario"]);
      })
    }
  }

  Cancela(){
    this.router.navigate(["liststatususuario"]);
  }

}
