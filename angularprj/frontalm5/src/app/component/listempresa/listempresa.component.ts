import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../entity/empresa';
import { EmpresaService } from '../../service/empresa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listempresa',
  standalone: false,
  templateUrl: './listempresa.component.html',
  styleUrl: './listempresa.component.css'
})
export class ListempresaComponent implements OnInit{
  empresas!: Empresa[];

  constructor(private empresaService: EmpresaService, private router:Router){}
  ngOnInit(): void {
      this.empresaService.getAll().subscribe(data => {
        this.empresas = data;
      })
  }

  deleteEmpresa(empr:Empresa){
    var validar = confirm("Esta seguro que desea eliminar el Empresa?");
    if(validar == true){
      this.empresaService.deleteEmpresa(empr).subscribe({
        next: (result) => {
          this.empresas = this.empresas.filter(x => x !== empr);
          alert(result +empr.nombre+" eliminada correctamente");
        },
        error: () => {
          alert("Ha ocurrido un error al eliminar el Empresa.\nVerifique que no existan sucursales");
        },
      });
    }
  }

  selectEmpresa(r:Empresa): void{
    localStorage.setItem("id",r.idEmpresa.toString().valueOf());
    this.router.navigate(["editempresa"])
  }


}
