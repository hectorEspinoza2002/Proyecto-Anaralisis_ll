import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoSaldoCuenta } from '../entityf2/TipoSaldoCuenta';

@Injectable({
  providedIn: 'root'
})
export class TiposaldocuentaService {

  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_tipo_saldo_cuentas');
  }

  buscarTipoSaldoCuenta(id: String) {
    return this.http.get<TipoSaldoCuenta>(this.Url + '/list_tipo_saldo_cuenta/' + id);
  }

  addTipoSaldoCuenta(tsc: TipoSaldoCuenta) {
    return this.http.post<TipoSaldoCuenta>(this.Url + '/create_tipo_saldo_cuenta', tsc);
  }

  editTipoSaldoCuenta(id: String, updatetsc: TipoSaldoCuenta) {
    return this.http.put<TipoSaldoCuenta>(this.Url + '/update_tipo_saldo_cuenta/' + id, updatetsc);
  }

  deleteTipoSaldoCuenta(tsc: TipoSaldoCuenta) {
    return this.http.delete(this.Url + '/delete_tipo_saldo_cuenta/' + tsc.idTipoSaldoCuenta, {
      responseType: 'text',
    });
  }
}
