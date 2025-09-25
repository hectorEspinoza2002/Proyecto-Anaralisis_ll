package com.proyecto_analisis.alfa.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto_analisis.alfa.model.entity.Empresa;
import com.proyecto_analisis.alfa.model.entity.LoginRequest;
import com.proyecto_analisis.alfa.model.entity.Sucursal;
import com.proyecto_analisis.alfa.model.repository.EmpresaRepository;
import com.proyecto_analisis.alfa.model.repository.SucursalRepository;
import com.proyecto_analisis.alfa.service.EmpresaService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @Autowired
    private SucursalRepository sucursalRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @GetMapping("/list_empresas")
    public List<Empresa> listarTodos() {
        return empresaService.findAll();
    }

    @GetMapping("/list_empresas/{id}")
    public Optional<Empresa> obtenerPorId(@PathVariable Integer id) {
        return empresaService.findById(id);
    }

    @PostMapping("/create_empresa")
    public Empresa createEmpresa(@RequestBody Empresa empId) {
        // String idEm = String.valueOf(empId.getIdEmpresa());

        if (empId.getIdEmpresa() != null && empresaService.findById(empId.getIdEmpresa()).isPresent()) {
            return null;
        } else {
            // Usuario
            empId.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            // Fecha
            empId.setFechaCreacion(LocalDateTime.now());
            return empresaService.guardar(empId);
        }

    }

    @PutMapping("/update_empresa/{id}")
    public Empresa updateEmpresa(@PathVariable("id") Integer empreId, @RequestBody Empresa updateEmp) {
        Optional<Empresa> optionEmp = empresaService.findById(empreId);
        if (optionEmp.isPresent()) {
            Empresa emp = optionEmp.get();
            emp.setNombre(updateEmp.getNombre());
            emp.setDireccion(updateEmp.getDireccion());
            emp.setNit(updateEmp.getNit());
            emp.setPasswordCantidadMayusculas(updateEmp.getPasswordCantidadMayusculas());
            emp.setPasswordCantidadMinusculas(updateEmp.getPasswordCantidadMinusculas());
            emp.setPasswordCantidadCaracteresEspeciales(updateEmp.getPasswordCantidadCaracteresEspeciales());
            emp.setPasswordCantidadCaducidadDias(updateEmp.getPasswordCantidadCaducidadDias());
            emp.setPasswordLargo(updateEmp.getPasswordLargo());
            emp.setPasswordIntentosAntesDeBloquear(updateEmp.getPasswordIntentosAntesDeBloquear());
            emp.setPasswordCantidadNumeros(updateEmp.getPasswordCantidadNumeros());
            emp.setPasswordCantidadPreguntasValidar(updateEmp.getPasswordCantidadMayusculas());
            // Actualizamos usuario
            emp.setUsuarioModificacion(LoginRequest.getUsuarioLogueado());
            // Acuatlizamos la hora
            emp.setFechaModificacion(LocalDateTime.now());
            return empresaService.guardar(emp);
        } else {
            return null;
        }
    }

    @DeleteMapping("/delete_empresa/{emId}")
    public void deleteEmpresa(@PathVariable("emId") Integer Id) {
        Optional<Empresa> empOption = empresaService.findById(Id);
        empOption.ifPresent(empresaService::delete);
    }

    // Mandamos los campos obligatoiras
    @GetMapping("/empresa_por_sucursal/{idSucursal}")
    public ResponseEntity<Empresa> getEmpresaPorSucursal(@PathVariable Integer idSucursal) {
        Sucursal sucursal = sucursalRepository.findById(idSucursal)
                .orElseThrow(() -> new RuntimeException("Sucursal no encontrada"));

        Empresa empresa = empresaRepository.findById(sucursal.getEmpresa().getIdEmpresa())
                .orElseThrow(() -> new RuntimeException("Empresa no encontrada"));

        return ResponseEntity.ok(empresa);
    }
    /*
     * @GetMapping("/empresas/pdf")
     * public ResponseEntity<byte[]> descargarPdfEmpresas() {
     * try {
     * List<Empresa> empresas = empresaService.findAll();
     * byte[] pdfBytes = empresaService.generarPdfEmpresas(empresas);
     * 
     * HttpHeaders headers = new HttpHeaders();
     * headers.setContentType(MediaType.APPLICATION_PDF);
     * headers.setContentDispositionFormData("attachment", "empresas_" +
     * LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")) +
     * ".pdf");
     * headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
     * 
     * return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
     * } catch (Exception e) {
     * return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
     * }
     * }
     * 
     * 
     * @GetMapping("/empresas/pdf")
     * public ResponseEntity<byte[]> exportEmpresasPdf() {
     * try {
     * List<Empresa> empresas = empresaService.findAll();
     * 
     * ByteArrayOutputStream baos = new ByteArrayOutputStream();
     * Document document = new Document();
     * PdfWriter.getInstance(document, baos);
     * document.open();
     * 
     * document.add(new Paragraph("Listado de Empresas"));
     * document.add(new Paragraph(" "));
     * 
     * for (Empresa emp : empresas) {
     * document.add(new Paragraph("ID: " + emp.getIdEmpresa()
     * + " | Nombre: " + emp.getNombre()
     * + " | NIT: " + emp.getNit()
     * + " | Dirección: " + emp.getDireccion()));
     * }
     * 
     * document.close();
     * 
     * return ResponseEntity.ok()
     * .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=empresas.pdf")
     * .contentType(MediaType.APPLICATION_PDF)
     * .body(baos.toByteArray());
     * 
     * } catch (Exception e) {
     * return ResponseEntity.status(500).build();
     * }
     * }
     */

}
