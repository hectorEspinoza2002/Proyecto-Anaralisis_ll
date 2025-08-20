import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entity/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }
  Url = 'http://localhost:9090';

  listUsuarios(){
    return this.http.get<Usuario[]>(this.Url+"/list_usuarios")
  }

  buscarUsuarioId(id:String){
    return this.http.get<Usuario>(this.Url+"/list_usuarios/{id}"+id);
  }

  login(usuario:Usuario): Observable<Usuario|null>{
    return this.http.post<Usuario|null>(this.Url+"/login",usuario)
  }

  addUsuarios(usuario:Usuario){
    return this.http.post<Usuario>(this.Url+"/create_usuarios",usuario);
  }

}
