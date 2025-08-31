import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleOpcion } from '../entity/roleopcion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleopcionService {

  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  buscar(id: String) {
    return this.http.get<RoleOpcion>(this.Url + '/list_roleOp/' + id);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_roleOp');
  }
}
