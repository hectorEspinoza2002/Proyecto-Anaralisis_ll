import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../entity/menu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  buscarMenu(id: String) {
    return this.http.get<Menu>(this.Url + '/list_menus/' + id);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_menus');
  }

  addMenu(m:Menu){
      return this.http.post<Menu>(this.Url+"/create_role",m);
    }

  deleteMenu(menu: Menu) {
    return this.http.delete(
      this.Url + '/delete_menus/{id}' + menu.idMenu,
      { responseType: 'text' }
    );
  }
}
