import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Opcion } from '../entity/opcion';

@Injectable({
  providedIn: 'root'
})
export class OpcionService {

  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  buscarOpcion(id: String) {
    return this.http.get<Opcion>(this.Url + '/list_opciones/' + id);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_opciones');
  }

  addOpcion(o:Opcion){
      return this.http.post<Opcion>(this.Url+"/create_role",o);
    }

  deleteOpcion(opc: Opcion) {
    return this.http.delete(
      this.Url + '/delete_mudulos/{id}' + opc.idOpcion,
      { responseType: 'text' }
    );
  }
}
