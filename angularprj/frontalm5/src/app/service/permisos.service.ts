import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoleopcionService } from './roleopcion.service';

@Injectable({
  providedIn: 'root',
})
export class PermisosService {
  Url = 'http://localhost:9090';

  private permisosSubject = new BehaviorSubject<any[]>([]);
  permisos$ = this.permisosSubject.asObservable();

  constructor() {
    const permisos = JSON.parse(localStorage.getItem('permisos') || '[]');
    this.permisosSubject.next(permisos);
  }

  actualizarPermisos(permisos: any[]) {
    localStorage.setItem('permisos', JSON.stringify(permisos));
    this.permisosSubject.next(permisos);

  }

  getPermisos() {
    return this.permisosSubject.value;
  }
}
