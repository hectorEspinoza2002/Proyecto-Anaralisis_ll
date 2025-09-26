//import { Sucursal } from './../entity/Sucursal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sucursal } from '../entity/Sucursal';
import { Observable } from 'rxjs';
import { Empresa } from '../entity/empresa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class SucursalService {
  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  buscarSucursal(id: String) {
    return this.http.get<Sucursal>(this.Url + '/list_sucursal/' + id);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_sucursal');
  }

  searchSucursal(id: String) {
    return this.http.get<Sucursal>(this.Url + '/list_sucursal/' + id);
  }

  editSucursal(id: String, updateS: Sucursal) {
    return this.http.put<Sucursal>(
      this.Url + '/update_sucursal/' + id,
      updateS
    );
  }

  addSucursal(s: Sucursal) {
    return this.http.post<Sucursal>(this.Url + '/create_sucursal', s);
  }

  deleteSucursal(sucursal: Sucursal) {
    return this.http.delete(
      this.Url + '/delete_sucursal/' + sucursal.idSucursal,
      { responseType: 'text' }
    );
  }

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.Url}/list_empresas`);
  }

  generarPdf(sucursales: any[], titulo: string = 'Reporte de Sucursales') {
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
      const tableColumn = ['ID', 'Nombre', 'Dirección', 'Empresa'];
      const tableRows: any[] = [];

      sucursales.forEach((sucursal) => {
        const esucursalData = [
          sucursal.idSucursal,
          sucursal.nombre,
          sucursal.direccion || '',
          sucursal.empresa.nombre || '',
        ];
        tableRows.push(esucursalData);
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
      doc.save(`sucursales_${new Date().getTime()}.pdf`);
    }

    // Versión simplificada solo con datos básicos
      generarExcelSimple(sucursales: any[], nombreArchivo: string = 'reporte_sucursales'): void {
        const datos = sucursales.map(sucursal => ({
          'ID': sucursal.idSucursal,
          'Nombre Sucursal': sucursal.nombre,
          'Dirección': sucursal.direccion || '',
          'Empresa': sucursal.empresa.nombre || ''
        }));

        const workbook: XLSX.WorkBook = XLSX.utils.book_new();
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datos);

        // Ajustar anchos de columnas
        worksheet['!cols'] = [
          { wch: 8 },  // ID
          { wch: 30 }, // Nombre
          { wch: 40 }, // NIT
          { wch: 20 }  // Dirección
        ];

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sucursal');

        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data: Blob = new Blob([excelBuffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        });

        saveAs(data, `${nombreArchivo}_${new Date().getTime()}.xlsx`);
      }


}
