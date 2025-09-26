import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusUsuario } from '../entity/statusUsuario';
import { Observable } from 'rxjs';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class StatusUsuarioService {
  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  buscarStatusU(id: String) {
    return this.http.get<StatusUsuario>(
      this.Url + '/list_status_usuarios/' + id
    );
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_status_usuario');
  }

  listStatusU() {
    return this.http.get<StatusUsuario[]>(this.Url + '/list_status_usuario');
  }

  addStatus(su: StatusUsuario) {
    return this.http.post<StatusUsuario>(
      this.Url + '/create_status_usuario',
      su
    );
  }

  editStatus(id: String, updateStatus: StatusUsuario) {
    return this.http.put<StatusUsuario>(
      this.Url + '/update_statusUs/' + id,
      updateStatus
    );
  }

  deleteStatus(status: StatusUsuario) {
    return this.http.delete(
      this.Url + '/delete_status/' + status.idStatusUsuario,
      { responseType: 'text' }
    );
  }

  generarPdfStatusUsuario(status: any[], titulo: string = 'Reporte de Status Usuario') {
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

    status.forEach((status) => {
      const statusData = [
        status.idStatusUsuario,
        status.nombre,
        status.fechaCreacion || '',
      ];
      tableRows.push(statusData);
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
    doc.save(`statusUsuario_${new Date().getTime()}.pdf`);
  }

  generarExcelSimple(
    status: any[],
    nombreArchivo: string = 'status'
  ): void {
    const datos = status.map((status) => ({
      'ID': status.idStatusUsuario,
      'Nombre Status': status.nombre,
      'Fecha Creacion': status.fechaCreacion || ''
    }));

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datos);

    // Ajustar anchos de columnas
    worksheet['!cols'] = [
      { wch: 8 }, // ID
      { wch: 30 }, // Nombre
      { wch: 20 }, // NIT
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Status');

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
