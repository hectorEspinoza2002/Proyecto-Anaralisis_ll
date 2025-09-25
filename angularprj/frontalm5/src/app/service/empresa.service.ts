import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../entity/empresa';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  constructor(private http: HttpClient) {}
  Url = 'http://localhost:9090';

  getReglasEmpresa(idSucursal: number): Observable<any> {
    return this.http.get<any>(this.Url + '/empresa/reglas/' + idSucursal);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list_empresas');
  }

  searchEmpresa(id: String) {
    return this.http.get<Empresa>(this.Url + '/list_empresas/' + id);
  }

  editEmpresa(id: String, updateEmp: Empresa) {
    return this.http.put<Empresa>(
      this.Url + '/update_empresa/' + id,
      updateEmp
    );
  }

  addEmpresa(emp: Empresa) {
    return this.http.post<Empresa>(this.Url + '/create_empresa', emp);
  }

  deleteEmpresa(emp: Empresa) {
    return this.http.delete(this.Url + '/delete_empresa/' + emp.idEmpresa, {
      responseType: 'text',
    });
  }

  getEmpresaPorSucursal(idSucursal: number): Observable<any> {
    return this.http.get<any>(`${this.Url}/empresa_por_sucursal/${idSucursal}`);
  }
  /*
  downloadPdf(): Observable<Blob> {
    return this.http.get(this.Url + '/empresas/pdf', { responseType: 'blob' });
  }
  */
  generarPdfEmpresas(empresas: any[], titulo: string = 'Reporte de Empresas') {
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
    const tableColumn = ['ID', 'Nombre', 'NIT', 'Dirección'];
    const tableRows: any[] = [];

    empresas.forEach((empresa) => {
      const empresaData = [
        empresa.idEmpresa,
        empresa.nombre,
        empresa.nit || '',
        empresa.direccion || '',
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
    doc.save(`empresas_${new Date().getTime()}.pdf`);
  }
}
