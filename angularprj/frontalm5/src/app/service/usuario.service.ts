import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entity/usuario';
import { Observable } from 'rxjs';
import { Role } from '../entity/Role';
import { Sucursal } from '../entity/Sucursal';
import { Genero } from '../entity/genero';
import { StatusUsuario } from '../entity/statusUsuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090/api';

  listUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.Url}/usuarios`);
  }

  buscarUsuarioId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.Url}/${id}`);
  }

  login(loginRequest: { idUsuario: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.Url}/login`, loginRequest);
  }

  addUsuarios(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.Url}/usuarios`, usuario);
  }

  deleteUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.Url}/${id}`, { responseType: 'text' });
  }

  getReglasEmpresa(idSucursal: number): Observable<any> {
    // Necesitarás crear este endpoint en el backend
    return this.http.get<any>(`${this.Url}/reglas-empresa/${idSucursal}`);
  }

  // Método para obtener sucursales (necesario para el formulario)
  getSucursales(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(`${this.Url}/sucursales`);
  }

  // Método para obtener roles (necesario para el formulario)
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.Url}/roles`);
  }

  getGeneros(): Observable<Genero[]>{
    return this.http.get<Genero[]>(`${this.Url}/generos`);
  }

  getStatusUsuarios(): Observable<StatusUsuario[]>{
    return this.http.get<StatusUsuario[]>(`${this.Url}/statusUsuarios`);
  }

}
