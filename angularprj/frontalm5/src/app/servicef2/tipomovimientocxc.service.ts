import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoMovimientoCxc } from '../entityf2/TipoMovimientoCxc';

@Injectable({
  providedIn: 'root'
})
export class TipomovimientocxcService {

  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_tipo_movimiento_cxc');
  }

  buscarTipoMovimientoCxc(id: String) {
    return this.http.get<TipoMovimientoCxc>(this.Url + '/list_tipo_movimiento_cxc/' + id);
  }

  addTipoMovimientoCxc(tpcxc: TipoMovimientoCxc) {
    return this.http.post<TipoMovimientoCxc>(this.Url + '/create_tipo_movimiento_cxc', tpcxc);
  }

  editTipoMovimientoCxc(id: String, updatetpcxc: TipoMovimientoCxc) {
    return this.http.put<TipoMovimientoCxc>(this.Url + '/update_tipo_movimiento_cxc/' + id, updatetpcxc);
  }

  deleteTipoMovimientoCxc(tpcxc: TipoMovimientoCxc) {
    return this.http.delete(this.Url + '/delete_tipo_movimiento_cxc/' + tpcxc.idTipoMovimientoCXC, {
      responseType: 'text',
    });
  }
}
