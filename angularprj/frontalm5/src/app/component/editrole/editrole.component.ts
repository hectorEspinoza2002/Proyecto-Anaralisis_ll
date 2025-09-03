import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../entity/Role';
import { RoleService } from '../../service/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editrole',
  standalone: false,
  templateUrl: './editrole.component.html',
  styleUrl: './editrole.component.css'
})
export class EditroleComponent implements OnInit, AfterViewInit{

  constructor (private rolService: RoleService, private router: Router){}

  ngOnInit(): void{
    this.selectEdit();
  }
  rol = new Role;

  @ViewChild('myFocus') myFocus: any;

  ngAfterViewInit(): void{
    this.myFocus.nativeElement.focus();
  }

  selectEdit(){
    let id = localStorage.getItem("id");

    if(id){
      this.rolService.buscarRol(id)
      .subscribe(result =>{
        this.rol = result;
      })
    }
  }

  editRol(r:Role){
    let id = localStorage.getItem("id");
    if(id){
      this.rolService.editRol(id,r)
      .subscribe(result => {
        this.rol = result;
        this.router.navigate(["listrole"]);
        alert(r.nombre + " modificado!");
      })
    }
  }

  Cancel(){
    this.router.navigate(["listrole"]);
  }

}
