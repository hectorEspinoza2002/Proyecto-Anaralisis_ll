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
import { EditsaldocuentaComponent } from './componentf2/editsaldocuenta/editsaldocuenta.component';
import { AddsaldocuentaComponent } from './componentf2/addsaldocuenta/addsaldocuenta.component';
import { ListconsultasaldosComponent } from './componentf2/listconsultasaldos/listconsultasaldos.component';
import { ListestadocuentaComponent } from './componentf2/listestadocuenta/listestadocuenta.component';
import { ListgrabacionmovimientosComponent } from './componentf2/listgrabacionmovimientos/listgrabacionmovimientos.component';
import { authGuard } from './component/auth.guard';

const routes: Routes = [

  //f1
  {    path: "listrolopcion", component:ListroleopcionComponent, canActivate: [authGuard] },
  {    path: "listopcion", component:ListopcionComponent, canActivate: [authGuard]  },
  {    path: "listmenu", component:ListmenuComponent, canActivate: [authGuard]  },
  {    path: "listmodulo", component:Listmodulo2Component, canActivate: [authGuard]  },
  {    path: "listempresa", component:ListempresaComponent, canActivate: [authGuard]  },
  {    path: "listsucursal", component:ListsucursalesComponent, canActivate: [authGuard]  },
  {    path: "listrole", component:ListroleComponent, canActivate: [authGuard]  },
  {    path: "liststatususuario", component:ListstatususuarioComponent, canActivate: [authGuard] },
  {    path: "listgenero", component:ListgeneroComponent, canActivate: [authGuard] },
  {    path: "listusuarios", component:ListusuarioComponent, canActivate: [authGuard] },
  {    path: "listrolopcion", component:ListroleopcionComponent, canActivate: [authGuard]  },

  {    path: "listpersona", component:ListpersonaComponent, canActivate: [authGuard]  },
  {    path: 'listdocumentopersona/:idPersona', component: ListdocumentopersonaComponent, canActivate: [authGuard] },
  {    path: "listestadocivil", component:ListestadocivilComponent, canActivate: [authGuard]  },
  {    path: "listmovimientocuenta", component:ListmovimientocuentaComponent, canActivate: [authGuard]  },
  {    path: "listperiodocierremes", component:ListperiodocierremesComponent, canActivate: [authGuard]  },
  {    path: "listsaldocuenta", component:ListsaldocuentaComponent, canActivate: [authGuard]  },
  {    path: "liststatuscuenta", component:ListstatuscuentaComponent, canActivate: [authGuard]  },
  {    path: "listtipodocumento", component:ListtipodocumentoComponent, canActivate: [authGuard]  },
  {    path: "listtipomovimientocxc", component:ListtipomovimientocxcComponent, canActivate: [authGuard]  },
  {    path: "listtiposaldocuenta", component:ListtiposaldocuentaComponent, canActivate: [authGuard]  },
  {    path: "listsaldocuentahist", component:ListsaldocuentahistComponent, canActivate: [authGuard]  },
  {    path: "listconsultasaldos", component:ListconsultasaldosComponent, canActivate: [authGuard] },
  {    path: "listestadocuenta", component:ListestadocuentaComponent, canActivate: [authGuard]  },
  {    path: "listgrabacionmovimientos", component:ListgrabacionmovimientosComponent, canActivate: [authGuard]  },


  {    path: "perfil", component:PerfilComponent, canActivate: [authGuard] },

  {    path: "addgenero", component:AddgeneroComponent, canActivate: [authGuard] },
  {    path: "addopcion", component:AddopcionComponent, canActivate: [authGuard] },
  {    path: "addmenu", component:AddmenuComponent, canActivate: [authGuard] },
  {    path: "addmodulo", component:AddmoduloComponent, canActivate: [authGuard] },
  {    path: "addsucursal", component:AddsucursalComponent, canActivate: [authGuard] },
  {    path: "addempresa", component:AddempresaComponent, canActivate: [authGuard] },
  {    path: "addrole", component:AddroleComponent, canActivate: [authGuard]  },
  {    path: "addusuarios", component:AddusuarioComponent, canActivate: [authGuard]  },
  {    path: "addstatususuario", component:AddstatususuarioComponent, canActivate: [authGuard]  },
  {    path: "addroleopcion", component:AddroleopcionComponent, canActivate: [authGuard]  },

  {    path: "addestadocivil", component:AddestadocivilComponent, canActivate: [authGuard]  },
  {    path: "addstatuscuenta", component:AddstatuscuentaComponent, canActivate: [authGuard]  },
  {    path: "addtipodocumento", component:AddtipodocumentoComponent, canActivate: [authGuard]  },
  {    path: "addtipomovimientocxc", component:AddtipomovimientocxcComponent, canActivate: [authGuard]  },
  {    path: "addtiposaldocuenta", component:AddtiposaldocuentaComponent, canActivate: [authGuard]  },
  {    path: "addpersona", component:AddpersonaComponent, canActivate: [authGuard]  },
  {    path: "addsaldocuenta", component:AddsaldocuentaComponent, canActivate: [authGuard]  },

  {    path: "editusuario", component:EditusuarioComponent, canActivate: [authGuard] },
  {    path: "editstatususuario", component:EditstatususuarioComponent, canActivate: [authGuard] },
  {    path: "editgenero", component:EditgeneroComponent, canActivate: [authGuard] },
  {    path: "editmenu", component:EditmenuComponent, canActivate: [authGuard]},
  {    path: "editrol", component:EditroleComponent, canActivate: [authGuard] },
  {    path: "editsucursal", component:EditsucursalComponent, canActivate: [authGuard] },
  {    path: "editmodulo", component:Editmodulo2Component, canActivate: [authGuard] },
  {    path: "editempresa", component:EditempresaComponent, canActivate: [authGuard] },
  {    path: "editopcion", component:EditopcionesComponent, canActivate: [authGuard] },
  {    path: "editroleopcion", component:EditroleopcionComponent, canActivate: [authGuard] },

  {    path: "editestadocivil", component:EditestadocivilComponent, canActivate: [authGuard] },
  {    path: "editstatuscuenta", component:EditstatuscuentaComponent, canActivate: [authGuard] },
  {    path: "edittipodocumento", component:EdittipodocumentoComponent, canActivate: [authGuard] },
  {    path: "edittipomovimientocxc", component:EdittipomovimientocxcComponent, canActivate: [authGuard] },
  {    path: "edittiposaldocuenta", component:EdittiposaldocuentaComponent, canActivate: [authGuard] },
  {    path: "editpersona", component:EditpersonaComponent, canActivate: [authGuard] },
  {    path: "editsaldocuenta", component:EditsaldocuentaComponent, canActivate: [authGuard] },

  {    path: "menu", component:MenuComponent, canActivate: [authGuard]  },
  {    path: "principal", component: PrincipalComponent, canActivate: [authGuard]  },
  {    path: "login", component: LoginComponent  },
  {    path: "", redirectTo: "login", pathMatch: "full"  },
  {    path: "**", redirectTo: "login", pathMatch: "full"  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
