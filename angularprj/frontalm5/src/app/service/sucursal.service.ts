import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sucursal } from '../entity/Sucursal';
import { Observable } from 'rxjs';

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

  addSucursal(s:Sucursal){
      return this.http.post<Sucursal>(this.Url+"/create_sucursal",s);
    }

  deleteSucursal(sucursal: Sucursal) {
    return this.http.delete(
      this.Url + '/delete_sucursal/{id}' + sucursal.idSucursal,
      { responseType: 'text' }
    );
  }
}
