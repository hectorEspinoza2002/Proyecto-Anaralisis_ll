import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entity/usuario';
import { catchError, Observable, throwError } from 'rxjs';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  listUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.Url}/list_usuario`);
  }

  buscarUsuarioId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.Url}/list_usuario/${id}`);
  }

  login(loginRequest: {
    idUsuario: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.Url}/login`, loginRequest);
  }

  addUsuario(usuarios: Usuario) {
    return this.http.post<Usuario>(this.Url + '/create_usuario', usuarios);
  }

  deleteUsuario(user: Usuario) {
    return this.http.delete(this.Url + '/delete_usuario/' + user.idUsuario, {
      responseType: 'text',
    });
  }

  editUsuario(id: String, updateUs: Usuario) {
    return this.http.put<Usuario>(this.Url + '/update_usuario/' + id, updateUs);
  }

  updatePassword(id: string, password: string): Observable<any> {
    return this.http.put(
      `${this.Url}/update_password/${id}`,
      { password },
      { responseType: 'text' }
    );
  }

  // Método de logout
  logout(): Observable<any> {
    return this.http.delete<any>(`${this.Url}/logout`).pipe(
      catchError((error) => {
        console.error('Error en logout:', error);
        return throwError(error); // Si hay error, lo pasa al siguiente bloque
      })
    );
  }

  generarPdfUsuarios(usuarios: any[], titulo: string = 'Reporte de Usuarios') {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text(titulo, doc.internal.pageSize.width / 2, 15, { align: 'center' });

    // Fecha
    doc.setFontSize(10);
    doc.setTextColor(100);
    const fecha = new Date().toLocaleDateString('es-ES');
    doc.text(`Generado el: ${fecha}`, doc.internal.pageSize.width - 15, 25, {
      align: 'right',
    });

    // Tabla
    const tableColumn = ['ID', 'Nombre', 'Apellido', 'Fecha Nacimiento',
      'Status', 'Genero', 'Correo', 'Telefono', 'Sucursal', 'Rol'
    ];
    const tableRows: any[] = [];

    usuarios.forEach((usuario) => {
      const usuarioData = [
        usuario.idUsuario,
        usuario.nombre,
        usuario.apellido,
        usuario.fechaNacimiento,
        usuario.idStatusUsuario.nombre,
        usuario.idGenero.nombre,
        usuario.correoElectronico,
        usuario.telefonoMovil,
        usuario.idSucursal.nombre,
        usuario.idRole.nombre,
      ];
      tableRows.push(usuarioData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [66, 139, 202] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 35 },
    });

    // Guardar PDF
    doc.save(`empresas_${new Date().getTime()}.pdf`);
  }

  generarExcelSimple(
    usuarios: any[],
    nombreArchivo: string = 'usuarios'
  ): void {
    const datos = usuarios.map((usuario) => ({
      'ID': usuario.idUsuario,
      'Nombre Usuario': usuario.nombre,
      'Apellido':usuario.apellido,
      'Fecha Nacimiento':usuario.fechaNacimiento,
      'Status':usuario.idStatusUsuario.nombre,
      'Genero':usuario.idGenero.nombre,
      'Correo':usuario.correoElectronico,
      'Telefono':usuario.telefonoMovil,
      'Sucursal':usuario.idSucursal.nombre,
      'Rol':usuario.idRole.nombre,

    }));

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datos);

    // Ajustar anchos de columnas
    worksheet['!cols'] = [
      { wch: 8 }, // ID
      { wch: 30 }, // Nombre
      { wch: 30 }, // NIT
      { wch: 40 }, // Dirección
      { wch: 30 }, // Dirección
      { wch: 30 }, // Dirección
      { wch: 40 }, // Dirección
      { wch: 30 }, // Dirección
      { wch: 30 }, // Dirección
      { wch: 20 }, // Dirección
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    saveAs(data, `${nombreArchivo}_${new Date().getTime()}.xlsx`);
  }
}
