import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../entityf2/Persona';
import { InterpolationConfig } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_personas');
  }

  buscarPersona(id: String) {
    return this.http.get<Persona>(this.Url + '/list_persona/' + id);
  }

  addPersona(p: Persona) {
    return this.http.post<Persona>(this.Url + '/create_persona', p);
  }

  editPersona(id: String, updateP: Persona) {
    return this.http.put<Persona>(
      this.Url + '/update_persona/' + id,
      updateP
    );
  }

  deletePersona(pers: Persona) {
      return this.http.delete(this.Url + '/delete_persona/' + pers.idPersona, { responseType: 'text' });
    }
}
