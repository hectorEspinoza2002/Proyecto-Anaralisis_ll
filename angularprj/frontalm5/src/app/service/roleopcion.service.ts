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
    return this.http.get<any[]>(this.Url + '/list_role_opciones');
  }

  listRoleOpciones(): Observable<RoleOpcion[]> {
    return this.http.get<RoleOpcion[]>(this.Url + "/list_role_opciones");
  }

  addRoleOpcion(roleOpcion: RoleOpcion): Observable<RoleOpcion> {
    return this.http.post<RoleOpcion>(this.Url + "/create_role_opcion", roleOpcion);
  }

  editRoleOpcion(idRole: number, idOpcion: number, updateRo: RoleOpcion): Observable<RoleOpcion> {
    return this.http.put<RoleOpcion>(this.Url + "/update_role_opcion/" + idRole + "/" + idOpcion, updateRo);
  }

  deleteRoleOpcion(idRole: number, idOpcion: number): Observable<any> {
    return this.http.delete(this.Url + "/delete_role_opcion/" + idRole + "/" + idOpcion, { responseType: 'text' });
  }

  buscarRoleOpcion(idRole: number, idOpcion: number): Observable<RoleOpcion> {
    return this.http.get<RoleOpcion>(this.Url + "/get_role_opcion/" + idRole + "/" + idOpcion);
  }

  getRoleOpcion(idRole: number, idOpcion: number) {
  return this.http.get<RoleOpcion>(`${this.Url}/list_role_opciones/${idRole}/${idOpcion}`);
}

}
