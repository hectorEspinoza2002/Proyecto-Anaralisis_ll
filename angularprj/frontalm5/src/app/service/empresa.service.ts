import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../entity/empresa';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  getReglasEmpresa(idSucursal: number): Observable<any> {
    return this.http.get<any>(this.Url + '/empresa/reglas/' + idSucursal);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_empresas');
  }

  searchEmpresa(id:String){
    return this.http.get<Empresa>(this.Url + '/list_empresas/'+id);
  }

  editEmpresa(id:String, updateEmp:Empresa){
    return this.http.put<Empresa>(this.Url+"/update_empresa/"+id,updateEmp);
  }

  addEmpresa(emp:Empresa){
      return this.http.post<Empresa>(this.Url+"/create_empresa",emp);
    }

  deleteEmpresa(emp: Empresa) {
    return this.http.delete(this.Url + '/delete_empresa/' + emp.idEmpresa, { responseType: 'text' });
  }
}
