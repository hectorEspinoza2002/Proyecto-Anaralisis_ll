import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovimientoCuenta } from '../entityf2/MovimientoCuenta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientocuentaService {

  private Url = 'http://localhost:9090'; // Ajusta tu URL si cambia el backend

  constructor(private http: HttpClient) {}

  getAll(): Observable<MovimientoCuenta[]> {
    return this.http.get<MovimientoCuenta[]>(`${this.Url}/list_movimiento_cuenta`);
  }

  buscarMovimientoCuenta(id: String){
    return this.http.get<MovimientoCuenta>(this.Url+'/list_movimiento_cuenta/'+id);
  }

  createMovimiento(mov: MovimientoCuenta): Observable<MovimientoCuenta> {
    return this.http.post<MovimientoCuenta>(`${this.Url}/create_movimiento_cuenta`, mov);
  }

  updateMovimiento(id: number, mov: MovimientoCuenta): Observable<MovimientoCuenta> {
    return this.http.put<MovimientoCuenta>(`${this.Url}/update_movimiento_cuenta/${id}`, mov);
  }

  deleteMovimiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.Url}/delete_movimiento_cuenta/${id}`);
  }
}
