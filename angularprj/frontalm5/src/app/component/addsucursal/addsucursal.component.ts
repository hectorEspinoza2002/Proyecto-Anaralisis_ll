import { Component, OnInit } from '@angular/core';
import { Sucursal } from '../../entity/Sucursal';
import { SucursalService } from '../../service/sucursal.service';
import { Router } from '@angular/router';
import { Empresa } from '../../entity/empresa';
import { EmpresaService } from '../../service/empresa.service';

@Component({
  selector: 'app-addsucursal',
  standalone: false,
  templateUrl: './addsucursal.component.html',
  styleUrl: './addsucursal.component.css'
})
export class AddsucursalComponent implements OnInit{
  sucursal = new Sucursal;
  selectedEmpresa!: number;
  empresa: Empresa[] = [];
  mensaje: String = '';


  constructor(private sucurService:SucursalService, private router:Router,
    private empresaService:EmpresaService
  ){}

  ngOnInit(): void{
    this.cargarEmpresa();
  }

    Cancelar(){
      this.router.navigate(["listsucursal"]);
    }

    guardar(sucurs:Sucursal){
      this.sucursal.empresa = {idEmpresa: this.selectedEmpresa } as unknown as Empresa;
      if(typeof(sucurs.nombre) != "undefined" && this.selectedEmpresa){


        this.sucurService.addSucursal(sucurs).subscribe(result => {
          if(result != null){
            alert("Sucursal: "+sucurs.nombre+" ingresado correctamente!");
            this.router.navigate(["listsucursal"]);
          }
          this.resetForm();
        });
      } else{
        alert("Debe ingresar algunos datos!");
      }
    }

    resetForm(): void {
      this.sucursal = new Sucursal;
      this.selectedEmpresa = null!;
    }

    //cargamos las empresas para poderlas ver

    cargarEmpresa():void {
      this.empresaService.getAll().subscribe({
        next: (data) => {
          this.empresa = data;
        },
        error:(err) => {
          this.mensaje = 'Error al traer empresa';
        }
      })
    }
}
