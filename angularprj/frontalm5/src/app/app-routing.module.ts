import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './component/menu/menu.component';
import { PrincipalComponent } from './component/principal/principal.component';
import { LoginComponent } from './component/login/login.component';
import { ListusuarioComponent } from './component/listusuario/listusuario.component';
import { AddusuarioComponent } from './component/addusuario/addusuario.component';
import { ListroleComponent } from './component/listrole/listrole.component';
import { AddroleComponent } from './component/addrole/addrole.component';

const routes: Routes = [
  {    path: "listrole", component:ListroleComponent  },
  {    path: "addrole", component:AddroleComponent  },
  {    path: "listusuarios", component:ListusuarioComponent  },
  {    path: "addusuarios", component:AddusuarioComponent  },
  {    path: "menu", component:MenuComponent  },
  {    path: "principal", component: PrincipalComponent  },
  {    path: "principal", component: LoginComponent  },
  {    path: "", redirectTo: "principal", pathMatch: "full"  },
  {    path: "**", redirectTo: "principal", pathMatch: "full"  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
