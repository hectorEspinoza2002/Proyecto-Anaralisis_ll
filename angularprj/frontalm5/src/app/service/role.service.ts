import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../entity/Role';
import { Observable } from 'rxjs';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  listRole() {
    return this.http.get<Role[]>(this.Url + '/list_roles');
  }

  addRole(rol: Role) {
    return this.http.post<Role>(this.Url + '/create_role', rol);
  }

  editRol(id: String, updateRol: Role) {
    return this.http.put<Role>(this.Url + '/update_role/' + id, updateRol);
  }

  deleteRole(role: Role) {
    return this.http.delete(this.Url + '/delete_role/' + role.idRole, {
      responseType: 'text',
    });
  }

  buscarRol(id: String) {
    return this.http.get<Role>(this.Url + '/list_roles/' + id);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_roles');
  }

  generarPdfRol(roles: any[], titulo: string = 'Reporte de Roles') {
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
    const tableColumn = ['ID', 'Nombre', 'Fecha Creacion'];
    const tableRows: any[] = [];

    roles.forEach((rol) => {
      const empresaData = [
        rol.idRole,
        rol.nombre,
        rol.fechaCreacion || ''
      ];
      tableRows.push(empresaData);
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
    doc.save(`roles_${new Date().getTime()}.pdf`);
  }

  generarExcelSimple(
      roles: any[],
      nombreArchivo: string = 'roles'
    ): void {
      const datos = roles.map((rol) => ({
        'ID': rol.idRole,
        'Nombre Rol': rol.nombre,
        'Fecha Creacion': rol.fechaCreacion || ''
      }));

      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datos);

      // Ajustar anchos de columnas
      worksheet['!cols'] = [
        { wch: 8 }, // ID
        { wch: 30 }, // Nombre
        { wch: 20 }, // NIT
      ];

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Roles');

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
