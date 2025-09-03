import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genero } from '../entity/genero';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneroService {
  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  buscarGenero(id: String) {
    return this.http.get<Genero>(this.Url + '/list_generos/' + id);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_generos');
  }

  deleteGenero(genero: Genero) {
    return this.http.delete(this.Url + '/delete_genero/' + genero.idGenero, {
      responseType: 'text',
    });
  }

  listGenero() {
    return this.http.get<Genero[]>(this.Url + '/list_generos');
  }

  addGenero(g: Genero) {
    return this.http.post<Genero>(this.Url + '/create_genero', g);
  }

  editGenero(id: String, updateGen: Genero) {
    return this.http.put<Genero>(this.Url + '/update_genero/' + id, updateGen);
  }
}
