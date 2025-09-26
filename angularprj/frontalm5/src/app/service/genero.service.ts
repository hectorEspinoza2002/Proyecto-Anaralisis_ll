import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genero } from '../entity/genero';
import { Observable } from 'rxjs';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class GeneroService {
  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  buscarGenero(id: String) {
    return this.http.get<Genero>(this.Url + '/list_generos/' + id);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_generos');
  }

  deleteGenero(genero: Genero) {
    return this.http.delete(this.Url + '/delete_genero/' + genero.idGenero, {
      responseType: 'text',
    });
  }

  listGenero() {
    return this.http.get<Genero[]>(this.Url + '/list_generos');
  }

  addGenero(g: Genero) {
    return this.http.post<Genero>(this.Url + '/create_genero', g);
  }

  editGenero(id: String, updateGen: Genero) {
    return this.http.put<Genero>(this.Url + '/update_genero/' + id, updateGen);
  }

  generarPdfGenero(generos: any[], titulo: string = 'Reporte de Generos') {
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

    generos.forEach((g) => {
      const generoData = [
        g.idGenero,
        g.nombre,
        g.fechaCreacion || '',

      ];
      tableRows.push(generoData);
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
    doc.save(`generos_${new Date().getTime()}.pdf`);
  }

  generarExcelSimple(
    generos: any[],
    nombreArchivo: string = 'generos'
  ): void {
    const datos = generos.map((generos) => ({
      'ID': generos.idGenero,
      'Nombre Genero': generos.nombre,
      'Fecha Creacion': generos.fechaCreacion || ''
    }));

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datos);

    // Ajustar anchos de columnas
    worksheet['!cols'] = [
      { wch: 8 }, // ID
      { wch: 30 }, // Nombre
      { wch: 40 }, // NIT
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Generos');

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
