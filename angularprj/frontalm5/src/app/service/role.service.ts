import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../entity/Role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }
  Url = 'http://localhost:9090';

  listRole(){
    return this.http.get<Role[]>(this.Url+"/list_roles");
  }

  addRole(rol:Role){
    return this.http.post<Role>(this.Url+"/create_role",rol);
  }

  deleteRole(role:Role){
    return this.http.delete(this.Url+"/delete_role/{id}"+role.idRole,{responseType: 'text'});
  }

  buscarRol(id:String){
      return this.http.get<Role>(this.Url+"/list_roles/"+id);
    }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url+"/list_roles")
  }

}
