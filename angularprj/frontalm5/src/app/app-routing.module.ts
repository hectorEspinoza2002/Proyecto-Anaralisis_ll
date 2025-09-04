import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './component/menu/menu.component';
import { PrincipalComponent } from './component/principal/principal.component';
import { LoginComponent } from './component/login/login.component';
import { ListusuarioComponent } from './component/listusuario/listusuario.component';
import { AddusuarioComponent } from './component/addusuario/addusuario.component';
import { ListroleComponent } from './component/listrole/listrole.component';
import { AddroleComponent } from './component/addrole/addrole.component';
import { ListsucursalesComponent } from './component/listsucursales/listsucursales.component';
import { ListempresaComponent } from './component/listempresa/listempresa.component';
import { Listmodulo2Component } from './component/listmodulo2/listmodulo2.component';
import { ListmenuComponent } from './component/listmenu/listmenu.component';
import { ListopcionComponent } from './component/listopcion/listopcion.component';
import { ListroleopcionComponent } from './component/listroleopcion/listroleopcion.component';
import { AddempresaComponent } from './component/addempresa/addempresa.component';
import { AddsucursalComponent } from './component/addsucursal/addsucursal.component';
import { AddmoduloComponent } from './component/addmodulo/addmodulo.component';
import { AddmenuComponent } from './component/addmenu/addmenu.component';
import { AddopcionComponent } from './component/addopcion/addopcion.component';
import { EditempresaComponent } from './component/editempresa/editempresa.component';
import { Editmodulo2Component } from './component/editmodulo2/editmodulo2.component';
import { EditsucursalComponent } from './component/editsucursal/editsucursal.component';
import { EditroleComponent } from './component/editrole/editrole.component';
import { EditmenuComponent } from './component/editmenu/editmenu.component';
import { ListgeneroComponent } from './component/listgenero/listgenero.component';
import { ListstatususuarioComponent } from './component/liststatususuario/liststatususuario.component';
import { AddgeneroComponent } from './component/addgenero/addgenero.component';
import { EditgeneroComponent } from './component/editgenero/editgenero.component';
import { AddstatususuarioComponent } from './component/addstatususuario/addstatususuario.component';
import { EditstatususuarioComponent } from './component/editstatususuario/editstatususuario.component';

const routes: Routes = [

  {    path: "listrolopcion", component:ListroleopcionComponent },
  {    path: "listopcion", component:ListopcionComponent  },
  {    path: "listmenu", component:ListmenuComponent  },
  {    path: "listmodulo", component:Listmodulo2Component  },
  {    path: "listempresa", component:ListempresaComponent  },
  {    path: "listsucursal", component:ListsucursalesComponent  },
  {    path: "listrole", component:ListroleComponent  },
  {    path: "liststatususuario", component:ListstatususuarioComponent },
  {    path: "listgenero", component:ListgeneroComponent },
  {    path: "listusuarios", component:ListusuarioComponent  },


  {    path: "addgenero", component:AddgeneroComponent },
  {    path: "addopcion", component:AddopcionComponent },
  {    path: "addmenu", component:AddmenuComponent },
  {    path: "addmodulo", component:AddmoduloComponent },
  {    path: "addsucursal", component:AddsucursalComponent },
  {    path: "addempresa", component:AddempresaComponent },
  {    path: "addrole", component:AddroleComponent  },
  {    path: "addusuarios", component:AddusuarioComponent  },
  {    path: "addstatususuario", component:AddstatususuarioComponent  },

  {    path: "editstatususuario", component:EditstatususuarioComponent },
  {    path: "editgenero", component:EditgeneroComponent },
  {    path: "editmenu", component:EditmenuComponent },
  {    path: "editrol", component:EditroleComponent },
  {    path: "editsucursal", component:EditsucursalComponent },
  {    path: "editmodulo", component:Editmodulo2Component },
  {    path: "editempresa", component:EditempresaComponent },

  {    path: "menu", component:MenuComponent  },
  {    path: "principal", component: PrincipalComponent  },
  {    path: "login", component: LoginComponent  },
  {    path: "", redirectTo: "login", pathMatch: "full"  },
  {    path: "**", redirectTo: "login", pathMatch: "full"  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
