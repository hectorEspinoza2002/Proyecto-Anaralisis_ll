import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sucursal } from '../entity/Sucursal';
import { Observable } from 'rxjs';
import { Empresa } from '../entity/empresa';

@Injectable({
  providedIn: 'root',
})
export class SucursalService {
  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  buscarSucursal(id: String) {
    return this.http.get<Sucursal>(this.Url + '/list_sucursal/' + id);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_sucursal');
  }

  searchSucursal(id: String) {
    return this.http.get<Sucursal>(this.Url + '/list_sucursal/' + id);
  }

  editSucursal(id: String, updateS: Sucursal) {
    return this.http.put<Sucursal>(
      this.Url + '/update_sucursal/' + id,
      updateS
    );
  }

  addSucursal(s: Sucursal) {
    return this.http.post<Sucursal>(this.Url + '/create_sucursal', s);
  }

  deleteSucursal(sucursal: Sucursal) {
    return this.http.delete(
      this.Url + '/delete_sucursal/' + sucursal.idSucursal,
      { responseType: 'text' }
    );
  }

  getEmpresas(): Observable<Empresa[]>{
      return this.http.get<Empresa[]>(`${this.Url}/list_empresas`);
    }
}
