import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class EstadocuentaService {

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

  generarExcelEmpresas(
    empresas: any[],
    nombreArchivo: string = 'reporte_empresas'
  ): void {
    // Preparar los datos para Excel
    const datos = empresas.map((empresa) => ({
      ID: empresa.idEmpresa,
      Nombre: empresa.nombre,
      NIT: empresa.nit || '',
      Dirección: empresa.direccion || '',
      'Mayúsculas Requeridas': empresa.passwordCantidadMayusculas || 0,
      'Minúsculas Requeridas': empresa.passwordCantidadMinusculas || 0,
      'Caracteres Especiales':
        empresa.passwordCantidadCaracteresEspeciales || 0,
      'Días Caducidad': empresa.passwordCantidadCaducidadDias || 0,
      'Largo Password': empresa.passwordLargo || 0,
      'Intentos Bloqueo': empresa.passwordIntentosAntesDeBloquear || 0,
      'Números Requeridos': empresa.passwordCantidadNumeros || 0,
      'Preguntas Validar': empresa.passwordCantidadPreguntasValidar || 0,
      'Fecha Creación': empresa.fechaCreacion
        ? new Date(empresa.fechaCreacion).toLocaleDateString('es-ES')
        : '',
      'Usuario Creación': empresa.usuarioCreacion || '',
    }));

    // Crear libro de trabajo
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Crear hoja de trabajo
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datos);

    // Ajustar el ancho de las columnas
    const columnWidths = [
      { wch: 8 }, // ID
      { wch: 25 }, // Nombre
      { wch: 15 }, // NIT
      { wch: 30 }, // Dirección
      { wch: 20 }, // Mayúsculas
      { wch: 20 }, // Minúsculas
      { wch: 20 }, // Caracteres Especiales
      { wch: 15 }, // Días Caducidad
      { wch: 15 }, // Largo Password
      { wch: 15 }, // Intentos Bloqueo
      { wch: 18 }, // Números Requeridos
      { wch: 18 }, // Preguntas Validar
      { wch: 15 }, // Fecha Creación
      { wch: 20 }, // Usuario Creación
    ];

    worksheet['!cols'] = columnWidths;

    // Agregar hoja al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Empresas');

    // Generar archivo Excel
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // Guardar archivo
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    saveAs(data, `${nombreArchivo}_${new Date().getTime()}.xlsx`);
  }

  // Versión simplificada solo con datos básicos
  generarExcelSimple(
    empresas: any[],
    nombreArchivo: string = 'empresas'
  ): void {
    const datos = empresas.map((empresa) => ({
      ID: empresa.idEmpresa,
      'Nombre Empresa': empresa.nombre,
      NIT: empresa.nit || '',
      Dirección: empresa.direccion || '',
    }));

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datos);

    // Ajustar anchos de columnas
    worksheet['!cols'] = [
      { wch: 8 }, // ID
      { wch: 30 }, // Nombre
      { wch: 20 }, // NIT
      { wch: 40 }, // Dirección
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Empresas');

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
