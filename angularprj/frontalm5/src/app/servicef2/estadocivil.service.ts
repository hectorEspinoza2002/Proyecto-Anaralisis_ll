import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoCivil } from '../entityf2/EstadoCivil';

@Injectable({
  providedIn: 'root'
})
export class EstadocivilService {

  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_estados_civiles');
  }

  buscarEstadoCivil(id: String) {
    return this.http.get<EstadoCivil>(this.Url + '/list_estado_civil/' + id);
  }

  addEstatusCivil(sc: EstadoCivil) {
    return this.http.post<EstadoCivil>(this.Url + '/create_estado_civil', sc);
  }

  editEstatusCivil(id: String, updateSc: EstadoCivil) {
    return this.http.put<EstadoCivil>(this.Url + '/update_estado_civil/' + id, updateSc);
  }

  deleteEstadoCivil(stc: EstadoCivil) {
    return this.http.delete(this.Url + '/delete_estado/' + stc.idEstadoCivil, {
      responseType: 'text',
    });
  }
}
