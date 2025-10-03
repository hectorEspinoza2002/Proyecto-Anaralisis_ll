import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaldoCuenta } from '../entityf2/SaldoCuenta';
import { Observable } from 'rxjs';
import { TipoSaldoCuenta } from '../entityf2/TipoSaldoCuenta';
import { StatusCuenta } from '../entityf2/StatusCuenta';

@Injectable({
  providedIn: 'root',
})
export class SaldocuentaService {
  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';


  getCuentaById(id: string){
    return this.http.get<SaldoCuenta>(`${this.Url}/list_saldo_cuenta/${id}`);
  }


  getCuentasByPersona(): Observable<SaldoCuenta[]> {
    return this.http.get<SaldoCuenta[]>(
      `${this.Url}/list_saldo_cuentas`
    );
  }

  getTiposSaldoCuenta(): Observable<TipoSaldoCuenta[]> {
    return this.http.get<TipoSaldoCuenta[]>(
      `${this.Url}/list_tipo_saldo_cuentas`
    );
  }

  getStatusCuenta(): Observable<StatusCuenta[]> {
    return this.http.get<StatusCuenta[]>(`${this.Url}/list_status_cuenta`);
  }

  createCuenta(cuenta: any): Observable<any> {
    return this.http.post(`${this.Url}/create_saldo_cuenta`, cuenta);
  }

  updateCuenta(idSaldoCuenta: String, cuenta: SaldoCuenta) {
    return this.http.put<SaldoCuenta>(
      `${this.Url}/update_saldo_cuenta/${idSaldoCuenta}`,
      cuenta
    );
  }

  deleteCuenta(idSaldoCuenta: number): Observable<any> {
    return this.http.delete(`${this.Url}/delete_saldo_cuenta/${idSaldoCuenta}`);
  }

}
