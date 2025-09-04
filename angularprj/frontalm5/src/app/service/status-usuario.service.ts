import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusUsuario } from '../entity/statusUsuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusUsuarioService {
  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  buscarStatusU(id: String) {
    return this.http.get<StatusUsuario>(
      this.Url + '/list_status_usuarios/' + id
    );
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_status_usuario')
  }

  listStatusU(){
      return this.http.get<StatusUsuario[]>(this.Url+"/list_status_usuario");
    }

  addStatus(su: StatusUsuario) {
    return this.http.post<StatusUsuario>(
      this.Url + '/create_status_usuario',
      su
    );
  }

  editStatus(id: String, updateStatus: StatusUsuario) {
    return this.http.put<StatusUsuario>(
      this.Url + '/update_statusUs/' + id,
      updateStatus
    );
  }

  deleteStatus(status: StatusUsuario) {
    return this.http.delete(
      this.Url + '/delete_status/' + status.idStatusUsuario,
      { responseType: 'text' }
    );
  }
}
