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
import { EditusuarioComponent } from './component/editusuario/editusuario.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { EditopcionesComponent } from './component/editopciones/editopciones.component';
import { AddroleopcionComponent } from './component/addroleopcion/addroleopcion.component';
import { EditroleopcionComponent } from './component/editroleopcion/editroleopcion.component';
import { ListpersonaComponent } from './componentf2/listpersona/listpersona.component';
import { ListdocumentopersonaComponent } from './componentf2/listdocumentopersona/listdocumentopersona.component';
import { ListestadocivilComponent } from './componentf2/listestadocivil/listestadocivil.component';
import { ListmovimientocuentaComponent } from './componentf2/listmovimientocuenta/listmovimientocuenta.component';
import { ListperiodocierremesComponent } from './componentf2/listperiodocierremes/listperiodocierremes.component';
import { ListsaldocuentaComponent } from './componentf2/listsaldocuenta/listsaldocuenta.component';
import { ListstatuscuentaComponent } from './componentf2/liststatuscuenta/liststatuscuenta.component';
import { ListtipodocumentoComponent } from './componentf2/listtipodocumento/listtipodocumento.component';
import { ListtipomovimientocxcComponent } from './componentf2/listtipomovimientocxc/listtipomovimientocxc.component';
import { ListtiposaldocuentaComponent } from './componentf2/listtiposaldocuenta/listtiposaldocuenta.component';
import { ListsaldocuentahistComponent } from './componentf2/listsaldocuentahist/listsaldocuentahist.component';
import { AddestadocivilComponent } from './componentf2/addestadocivil/addestadocivil.component';
import { AddstatuscuentaComponent } from './componentf2/addstatuscuenta/addstatuscuenta.component';
import { AddtipodocumentoComponent } from './componentf2/addtipodocumento/addtipodocumento.component';
import { AddtipomovimientocxcComponent } from './componentf2/addtipomovimientocxc/addtipomovimientocxc.component';
import { AddtiposaldocuentaComponent } from './componentf2/addtiposaldocuenta/addtiposaldocuenta.component';
import { EditestadocivilComponent } from './componentf2/editestadocivil/editestadocivil.component';
import { EditstatuscuentaComponent } from './componentf2/editstatuscuenta/editstatuscuenta.component';
import { EdittipodocumentoComponent } from './componentf2/edittipodocumento/edittipodocumento.component';
import { EdittipomovimientocxcComponent } from './componentf2/edittipomovimientocxc/edittipomovimientocxc.component';
import { EdittiposaldocuentaComponent } from './componentf2/edittiposaldocuenta/edittiposaldocuenta.component';
import { AddpersonaComponent } from './componentf2/addpersona/addpersona.component';
import { EditpersonaComponent } from './componentf2/editpersona/editpersona.component';

const routes: Routes = [

  //f1
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
  {    path: "listrolopcion", component:ListroleopcionComponent  },

  {    path: "listpersona", component:ListpersonaComponent  },
  //{    path: "listdocumentopersona", component:ListdocumentopersonaComponent  },
  { path: 'listdocumentopersona/:idPersona', component: ListdocumentopersonaComponent },
  {    path: "listestadocivil", component:ListestadocivilComponent  },
  {    path: "listmovimientocuenta", component:ListmovimientocuentaComponent  },
  {    path: "listperiodocierremes", component:ListperiodocierremesComponent  },
  {    path: "listsaldocuenta", component:ListsaldocuentaComponent  },
  {    path: "liststatuscuenta", component:ListstatuscuentaComponent  },
  {    path: "listtipodocumento", component:ListtipodocumentoComponent  },
  {    path: "listtipomovimientocxc", component:ListtipomovimientocxcComponent  },
  {    path: "listtiposaldocuenta", component:ListtiposaldocuentaComponent  },
  {    path: "listsaldocuentahist", component:ListsaldocuentahistComponent  },


  {    path: "perfil", component:PerfilComponent },

  {    path: "addgenero", component:AddgeneroComponent },
  {    path: "addopcion", component:AddopcionComponent },
  {    path: "addmenu", component:AddmenuComponent },
  {    path: "addmodulo", component:AddmoduloComponent },
  {    path: "addsucursal", component:AddsucursalComponent },
  {    path: "addempresa", component:AddempresaComponent },
  {    path: "addrole", component:AddroleComponent  },
  {    path: "addusuarios", component:AddusuarioComponent  },
  {    path: "addstatususuario", component:AddstatususuarioComponent  },
  {    path: "addroleopcion", component:AddroleopcionComponent  },

  {    path: "addestadocivil", component:AddestadocivilComponent  },
  {    path: "addstatuscuenta", component:AddstatuscuentaComponent  },
  {    path: "addtipodocumento", component:AddtipodocumentoComponent  },
  {    path: "addtipomovimientocxc", component:AddtipomovimientocxcComponent  },
  {    path: "addtiposaldocuenta", component:AddtiposaldocuentaComponent  },
  {    path: "addpersona", component:AddpersonaComponent  },

  {    path: "editusuario", component:EditusuarioComponent },
  {    path: "editstatususuario", component:EditstatususuarioComponent },
  {    path: "editgenero", component:EditgeneroComponent },
  {    path: "editmenu", component:EditmenuComponent },
  {    path: "editrol", component:EditroleComponent },
  {    path: "editsucursal", component:EditsucursalComponent },
  {    path: "editmodulo", component:Editmodulo2Component },
  {    path: "editempresa", component:EditempresaComponent },
  {    path: "editopcion", component:EditopcionesComponent },
  {    path: "editroleopcion", component:EditroleopcionComponent },

  {    path: "editestadocivil", component:EditestadocivilComponent },
  {    path: "editstatuscuenta", component:EditstatuscuentaComponent },
  {    path: "edittipodocumento", component:EdittipodocumentoComponent },
  {    path: "edittipomovimientocxc", component:EdittipomovimientocxcComponent },
  {    path: "edittiposaldocuenta", component:EdittiposaldocuentaComponent },
  {    path: "editpersona", component:EditpersonaComponent },

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
