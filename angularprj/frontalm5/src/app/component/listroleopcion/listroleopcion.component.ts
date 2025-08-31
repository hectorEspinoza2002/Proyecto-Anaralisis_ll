import { Component, OnInit } from '@angular/core';
import { RoleOpcion } from '../../entity/roleopcion';
import { RoleopcionService } from '../../service/roleopcion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listroleopcion',
  standalone: false,
  templateUrl: './listroleopcion.component.html',
  styleUrl: './listroleopcion.component.css'
})
export class ListroleopcionComponent implements OnInit{

  rolOpc!: RoleOpcion[];

  constructor(private rolOpService: RoleopcionService, private router:Router){}
  ngOnInit(): void {
      this.rolOpService.getAll().subscribe(data => {
        this.rolOpc = data;
      })
  }

}
