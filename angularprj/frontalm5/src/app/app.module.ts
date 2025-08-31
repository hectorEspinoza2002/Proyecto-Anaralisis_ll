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
import { ListmoduloComponent } from './component/listmodulo/listmodulo.component';
import { ListmenuComponent } from './component/listmenu/listmenu.component';
import { ListopcionComponent } from './component/listopcion/listopcion.component';
import { ListroleopcionComponent } from './component/listroleopcion/listroleopcion.component';
import { AddempresaComponent } from './component/addempresa/addempresa.component';
import { AddsucursalComponent } from './component/addsucursal/addsucursal.component';
import { AddmoduloComponent } from './component/addmodulo/addmodulo.component';
import { AddmenuComponent } from './component/addmenu/addmenu.component';
import { AddopcionComponent } from './component/addopcion/addopcion.component';
import { EditempresaComponent } from './component/editempresa/editempresa.component';

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
    ListmoduloComponent,
    ListmenuComponent,
    ListopcionComponent,
    ListroleopcionComponent,
    AddempresaComponent,
    AddsucursalComponent,
    AddmoduloComponent,
    AddmenuComponent,
    AddopcionComponent,
    EditempresaComponent
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
