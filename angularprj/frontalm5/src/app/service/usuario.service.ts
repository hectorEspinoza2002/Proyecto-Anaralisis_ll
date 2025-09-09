import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entity/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  listUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.Url}/list_usuario`);
  }

  buscarUsuarioId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.Url}/list_usuario/${id}`);
  }

  login(loginRequest: {
    idUsuario: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.Url}/login`, loginRequest);
  }

  addUsuario(usuarios: Usuario) {
    return this.http.post<Usuario>(this.Url + '/create_usuario', usuarios);
  }

  deleteUsuario(user: Usuario) {
    return this.http.delete(this.Url + '/delete_usuario/' + user.idUsuario, {
      responseType: 'text',
    });
  }

  editUsuario(id: String, updateUs: Usuario) {
    return this.http.put<Usuario>(this.Url + '/update_usuario/' + id, updateUs);
  }

  updatePassword(id: string, password: string): Observable<any> {
    return this.http.put(`${this.Url}/update_password/${id}`, { password });
  }
}
