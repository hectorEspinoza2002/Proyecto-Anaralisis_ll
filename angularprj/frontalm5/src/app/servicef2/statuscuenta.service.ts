import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusCuenta } from '../entityf2/StatusCuenta';

@Injectable({
  providedIn: 'root',
})
export class StatuscuentaService {
  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_status_cuenta');
  }

  buscarStatusCuenta(id: String) {
    return this.http.get<StatusCuenta>(this.Url + '/list_status_cuenta/' + id);
  }

  addStatusCuenta(sc: StatusCuenta) {
    return this.http.post<StatusCuenta>(this.Url + '/create_status_cuenta', sc);
  }

  editStatusCuenta(id: String, updateSc: StatusCuenta) {
    return this.http.put<StatusCuenta>(this.Url + '/update_status_cuenta/' + id, updateSc);
  }

  deleteStatusCuenta(stc: StatusCuenta) {
    return this.http.delete(this.Url + '/delete_status_cuenta/' + stc.idStatusCuenta, {
      responseType: 'text',
    });
  }
}
