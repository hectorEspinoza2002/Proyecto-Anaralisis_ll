import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../entityf2/TipoDocumento';

@Injectable({
  providedIn: 'root'
})
export class TipodocumentoService {

   constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  getAll(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(`${this.Url}/list_tipo_documentos`);
  }

  buscarTipoDocumento(id: String) {
    return this.http.get<TipoDocumento>(this.Url + '/list_tipo_documento/' + id);
  }

  addTipoDocumento(td: TipoDocumento) {
    return this.http.post<TipoDocumento>(this.Url + '/create_tipo_documento', td);
  }

  editTipoDocumento(id: String, updateTd: TipoDocumento) {
    return this.http.put<TipoDocumento>(this.Url + '/update_tipo_documento/' + id, updateTd);
  }

  deleteTipoDocumento(td: TipoDocumento) {
    return this.http.delete(this.Url + '/delete_tipo_documento/' + td.idTipoDocumento, {
      responseType: 'text',
    });
  }

  getAllTiposDocumento(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(`${this.Url}/list_tipos_documento`);
  }
}
