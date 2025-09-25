package com.proyecto_analisis.alfa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entity.Empresa;
import com.proyecto_analisis.alfa.model.repository.EmpresaRepository;

@Service
public class EmpresaService {

    private final EmpresaRepository empresaRepo;

    public EmpresaService(EmpresaRepository eRepo) {
        this.empresaRepo = eRepo;
    }

    public List<Empresa> findAll() {
        return empresaRepo.findAll();
    }

    public Optional<Empresa> findById(Integer id) {
        return empresaRepo.findById(id);
    }

    public Empresa guardar(Empresa g) {
        return empresaRepo.save(g);
    }

    public void delete(Empresa ge) {
        empresaRepo.delete(ge);
    }

    /*
    public byte[] generarPdfEmpresas(List<Empresa> empresas) throws DocumentException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, baos);

        document.open();

        // Título
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
        Paragraph title = new Paragraph("Reporte de Empresas", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(20);
        document.add(title);

        // Fecha de generación
        Font dateFont = FontFactory.getFont(FontFactory.HELVETICA, 10);
        Paragraph date = new Paragraph(
                "Generado el: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")),
                dateFont);
        date.setAlignment(Element.ALIGN_RIGHT);
        date.setSpacingAfter(20);
        document.add(date);

        // Tabla de empresas
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10);

        // Encabezados de tabla
        String[] headers = { "ID", "Nombre", "NIT", "Dirección" };
        for (String header : headers) {
            PdfPCell cell = new PdfPCell(new Phrase(header));
            cell.setBackgroundColor(new BaseColor(200, 200, 200));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
        }

        // Datos de empresas
        for (Empresa empresa : empresas) {
            table.addCell(String.valueOf(empresa.getIdEmpresa()));
            table.addCell(empresa.getNombre());
            table.addCell(empresa.getNit() != null ? empresa.getNit() : "");
            table.addCell(empresa.getDireccion() != null ? empresa.getDireccion() : "");
        }

        document.add(table);
        document.close();

        return baos.toByteArray();
    }
         */

}
