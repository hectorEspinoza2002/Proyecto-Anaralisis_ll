import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeriodoCierremes } from '../entityf2/PeriodoCierremes';

@Injectable({
  providedIn: 'root'
})
export class PeriodocierremesService {

  constructor(private http: HttpClient) { }
  Url = 'http://localhost:9090';

  getAll(): Observable<PeriodoCierremes[]> {
    return this.http.get<PeriodoCierremes[]>(`${this.Url}/list_periodo_cierre_mes`);
  }

  getById(anio: number, mes: number): Observable<PeriodoCierremes> {
    return this.http.get<PeriodoCierremes>(`${this.Url}/list_periodo_cierre_mes/${anio}/${mes}`);
  }

  create(pcm: PeriodoCierremes): Observable<PeriodoCierremes> {
    return this.http.post<PeriodoCierremes>(`${this.Url}/create_periodo_cierre_mes`, pcm);
  }

  update(pcm: PeriodoCierremes): Observable<PeriodoCierremes> {
    return this.http.put<PeriodoCierremes>(`${this.Url}/update_periodo_cierre_mes`, pcm);
  }

  delete(anio: number, mes: number): Observable<void> {
    return this.http.delete<void>(`${this.Url}/delete_periodo_cierre_mes/${anio}/${mes}`);
  }

  cerrarMes(anio: number, mes: number): Observable<string> {
    return this.http.post(`${this.Url}/cerrar-mes/${anio}/${mes}`, {}, { responseType: 'text' });
  }

}
