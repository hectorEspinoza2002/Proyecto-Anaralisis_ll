import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modulo } from '../entity/modulo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  buscarModulo(id: String) {
    return this.http.get<Modulo>(this.Url + '/list_modulos/' + id);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_modulos');
  }

  addModulo(m:Modulo){
      return this.http.post<Modulo>(this.Url+"/create_modulo",m);
    }

  deleteModulo(mod: Modulo) {
    return this.http.delete(
      this.Url + '/delete_modulos/{id}' + mod.idModulo,
      { responseType: 'text' }
    );
  }
}
