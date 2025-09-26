import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../entity/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';
import { PermisosService } from '../../service/permisos.service';

@Component({
  selector: 'app-listusuario',
  standalone: false,
  templateUrl: './listusuario.component.html',
  styleUrl: './listusuario.component.css',
})
export class ListusuarioComponent implements OnInit {
  usuarios!: Usuario[];

  puedeAlta = false;
  puedeBaja = false;
  puedeCambio = false;
  puedeExportar = false;
  puedeImprimir = false;

  constructor(private userService: UsuarioService, private router: Router,
    private permisosService: PermisosService
  ) {}

  ngOnInit(): void {
    this.userService.listUsuarios().subscribe(data => {
      this.usuarios = data;
    });

    this.permisosService.permisos$.subscribe((permisos) => {
      console.log('Permisos en localStorage:', permisos);

      const permisosEmpresa = permisos.find(
        (p: any) => p.opcion.nombre === 'Usuarios'
      );

      if (permisosEmpresa) {
        this.puedeAlta = permisosEmpresa.alta == 1;
        this.puedeBaja = permisosEmpresa.baja == 1;
        this.puedeCambio = permisosEmpresa.cambio == 1;
        this.puedeExportar = permisosEmpresa.exportar == 1;
        this.puedeImprimir = permisosEmpresa.imprimir == 1;
      }
    });
  }

  deleteUsuario(user: Usuario) {
    var validar = confirm(
      'Esta seguro que desea eliminar el usuario ' +
        user.nombre +
        ' ' +
        user.apellido
    );
    if (validar == true) {
      this.userService.deleteUsuario(user).subscribe({
        next: (result) => {
          this.usuarios = this.usuarios.filter(x => x !== user);
          alert(result+ " Usuario: "+user.correoElectronico+" a sido eliminado!");
        },
        error:() => {
          alert("Ha ocurrido un error al eliminar el usuario.");
        },
      });
    }
  }

  selectUser(usr: Usuario): void {
    localStorage.setItem('id', usr.idUsuario.toString().valueOf());
    this.router.navigate(['/editusuario']);
  }

  crearNuevoUsuario(): void {
    this.router.navigate(['/addusuarios']);
  }

  generarPdf(): void {
    if (this.usuarios && this.usuarios.length > 0) {
      this.userService.generarPdfUsuarios(this.usuarios);
    } else {
      alert('No hay datos para generar el PDF');
    }
  }

  generarExcelSimple(): void {
    if (this.usuarios && this.usuarios.length > 0) {
      this.userService.generarExcelSimple(this.usuarios, 'usuarios');
    } else {
      alert('No hay datos para generar el Excel');
    }
  }
}
