import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './component/menu/menu.component';
import { PrincipalComponent } from './component/principal/principal.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
import { ListusuarioComponent } from './component/listusuario/listusuario.component';
import { AddusuarioComponent } from './component/addusuario/addusuario.component';
import { ListroleComponent } from './component/listrole/listrole.component';
import { AddroleComponent } from './component/addrole/addrole.component';
import { PassowrdValidatorDirective } from './service/passowrd-validator.directive';
import { ListsucursalesComponent } from './component/listsucursales/listsucursales.component';
import { ListempresaComponent } from './component/listempresa/listempresa.component';
import { ListmenuComponent } from './component/listmenu/listmenu.component';
import { ListopcionComponent } from './component/listopcion/listopcion.component';
import { ListroleopcionComponent } from './component/listroleopcion/listroleopcion.component';
import { AddempresaComponent } from './component/addempresa/addempresa.component';
import { AddsucursalComponent } from './component/addsucursal/addsucursal.component';
import { AddmoduloComponent } from './component/addmodulo/addmodulo.component';
import { AddmenuComponent } from './component/addmenu/addmenu.component';
import { AddopcionComponent } from './component/addopcion/addopcion.component';
import { EditempresaComponent } from './component/editempresa/editempresa.component';
import { EditmenuComponent } from './component/editmenu/editmenu.component';
import { EditopcionesComponent } from './component/editopciones/editopciones.component';
import { Listmodulo2Component } from './component/listmodulo2/listmodulo2.component';
import { Editmodulo2Component } from './component/editmodulo2/editmodulo2.component';
import { EditsucursalComponent } from './component/editsucursal/editsucursal.component';
import { EditroleComponent } from './component/editrole/editrole.component';
import { ListgeneroComponent } from './component/listgenero/listgenero.component';
import { ListstatususuarioComponent } from './component/liststatususuario/liststatususuario.component';
import { AddgeneroComponent } from './component/addgenero/addgenero.component';
import { EditgeneroComponent } from './component/editgenero/editgenero.component';
import { AddstatususuarioComponent } from './component/addstatususuario/addstatususuario.component';
import { EditstatususuarioComponent } from './component/editstatususuario/editstatususuario.component';
import { EditusuarioComponent } from './component/editusuario/editusuario.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { AddroleopcionComponent } from './component/addroleopcion/addroleopcion.component';
import { EditroleopcionComponent } from './component/editroleopcion/editroleopcion.component';
import { ListdocumentopersonaComponent } from './componentf2/listdocumentopersona/listdocumentopersona.component';
import { ListestadocivilComponent } from './componentf2/listestadocivil/listestadocivil.component';
import { ListmovimientocuentaComponent } from './componentf2/listmovimientocuenta/listmovimientocuenta.component';
import { ListperiodocierremesComponent } from './componentf2/listperiodocierremes/listperiodocierremes.component';
import { ListpersonaComponent } from './componentf2/listpersona/listpersona.component';
import { ListsaldocuentaComponent } from './componentf2/listsaldocuenta/listsaldocuenta.component';
import { ListsaldocuentahistComponent } from './componentf2/listsaldocuentahist/listsaldocuentahist.component';
import { ListstatuscuentaComponent } from './componentf2/liststatuscuenta/liststatuscuenta.component';
import { ListtipodocumentoComponent } from './componentf2/listtipodocumento/listtipodocumento.component';
import { ListtipomovimientocxcComponent } from './componentf2/listtipomovimientocxc/listtipomovimientocxc.component';
import { ListtiposaldocuentaComponent } from './componentf2/listtiposaldocuenta/listtiposaldocuenta.component';
import { EditstatuscuentaComponent } from './componentf2/editstatuscuenta/editstatuscuenta.component';
import { EditestadocivilComponent } from './componentf2/editestadocivil/editestadocivil.component';
import { EdittipodocumentoComponent } from './componentf2/edittipodocumento/edittipodocumento.component';
import { EdittipomovimientocxcComponent } from './componentf2/edittipomovimientocxc/edittipomovimientocxc.component';
import { EdittiposaldocuentaComponent } from './componentf2/edittiposaldocuenta/edittiposaldocuenta.component';
import { AddtiposaldocuentaComponent } from './componentf2/addtiposaldocuenta/addtiposaldocuenta.component';
import { AddtipomovimientocxcComponent } from './componentf2/addtipomovimientocxc/addtipomovimientocxc.component';
import { AddtipodocumentoComponent } from './componentf2/addtipodocumento/addtipodocumento.component';
import { AddestadocivilComponent } from './componentf2/addestadocivil/addestadocivil.component';
import { AddstatuscuentaComponent } from './componentf2/addstatuscuenta/addstatuscuenta.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PrincipalComponent,
    LoginComponent,
    ListusuarioComponent,
    AddusuarioComponent,
    ListroleComponent,
    AddroleComponent,
    PassowrdValidatorDirective,
    ListsucursalesComponent,
    ListempresaComponent,
    ListmenuComponent,
    ListopcionComponent,
    ListroleopcionComponent,
    AddempresaComponent,
    AddsucursalComponent,
    AddmoduloComponent,
    AddmenuComponent,
    AddopcionComponent,
    EditempresaComponent,
    EditmenuComponent,
    EditopcionesComponent,
    Listmodulo2Component,
    Editmodulo2Component,
    EditsucursalComponent,
    EditroleComponent,
    ListgeneroComponent,
    ListstatususuarioComponent,
    AddgeneroComponent,
    EditgeneroComponent,
    AddstatususuarioComponent,
    EditstatususuarioComponent,
    EditusuarioComponent,
    PerfilComponent,
    AddroleopcionComponent,
    EditroleopcionComponent,
    ListdocumentopersonaComponent,
    ListestadocivilComponent,
    ListmovimientocuentaComponent,
    ListperiodocierremesComponent,
    ListpersonaComponent,
    ListsaldocuentaComponent,
    ListsaldocuentahistComponent,
    ListstatuscuentaComponent,
    ListtipodocumentoComponent,
    ListtipomovimientocxcComponent,
    ListtiposaldocuentaComponent,
    EditstatuscuentaComponent,
    EditestadocivilComponent,
    EdittipodocumentoComponent,
    EdittipomovimientocxcComponent,
    EdittiposaldocuentaComponent,
    AddtiposaldocuentaComponent,
    AddtipomovimientocxcComponent,
    AddtipodocumentoComponent,
    AddestadocivilComponent,
    AddstatuscuentaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
