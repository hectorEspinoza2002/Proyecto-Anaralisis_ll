package com.proyecto_analisis.alfa.controllerf2;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto_analisis.alfa.model.entity.LoginRequest;
import com.proyecto_analisis.alfa.model.entityf2.DocumentoPersona;
import com.proyecto_analisis.alfa.model.entityf2.DocumentoPersonaId;
import com.proyecto_analisis.alfa.servicef2.DocumentoPersonaService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class DocumentoPersonaController {

    @Autowired
    private DocumentoPersonaService docPersonaService;

    /*
    @Autowired
    private PersonaService personaService;
     */

    @GetMapping("/list_docuemtos_personas")
    public List<DocumentoPersona> listarTodos() {
        return docPersonaService.findAll();
    }

    @GetMapping("/list_documento_persona/{tipoDocumento}/{persona}")
    public Optional<DocumentoPersona> obtenerPorId(@PathVariable Integer tipoDocumento, @PathVariable Integer persona) {
        DocumentoPersonaId id = new DocumentoPersonaId(tipoDocumento, persona);
        return docPersonaService.findById(id);
    }

    @PostMapping("/create_documento_persona")
    public ResponseEntity<?> createDocPersona(@RequestBody DocumentoPersona dp) {
        try {
            DocumentoPersonaId id = new DocumentoPersonaId(dp.getTipoDocumento().getIdTipoDocumento(),
                    dp.getPersona().getIdPersona());

            if (docPersonaService.findById(id).isPresent()) {
                return ResponseEntity.badRequest().body("Ya existe esta asignacion");
            }

            dp.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            dp.setFechaCreacion(LocalDateTime.now());

            DocumentoPersona saved = docPersonaService.guardar(dp);
            return ResponseEntity.ok(saved);

        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + ex.getMessage());
        }
    }

    @PutMapping("/update_documento_persona/{tipoDocumento}/{persona}")
    public ResponseEntity<?> updateDocPersona(@PathVariable Integer tipoDocumento, @PathVariable Integer persona,
    @RequestBody DocumentoPersona updateDocPers){
        DocumentoPersonaId id = new DocumentoPersonaId(tipoDocumento, persona);
        Optional<DocumentoPersona> dpOptional = docPersonaService.findById(id);

        if (dpOptional.isPresent()) {
            DocumentoPersona dpers = dpOptional.get();
            dpers.setNoDocumento(updateDocPers.getNoDocumento());
            dpers.setFechaModificacion(LocalDateTime.now());
            dpers.setUsuarioModificacion(LoginRequest.getUsuarioLogueado());

            docPersonaService.guardar(dpers);

            List<DocumentoPersona> permisoActualizado = docPersonaService.findByTipoDoc(tipoDocumento);
            return ResponseEntity.ok(permisoActualizado);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete_documento_persona/{tipoDocumento}/{persona}")
    public void deleteDocPersona(@PathVariable Integer tipoDocumento, @PathVariable Integer persona){
        DocumentoPersonaId id = new DocumentoPersonaId(tipoDocumento,persona);
        Optional<DocumentoPersona> docOption = docPersonaService.findById(id);
        docOption.ifPresent(d -> docPersonaService.delete(id));
    }

    @GetMapping("/list_documento_persona/documentoPersona/{tipoDocumento}")
    public List<DocumentoPersona> listarPorTipo(@PathVariable Integer tipoDocumento){
        return docPersonaService.findByTipoDoc(tipoDocumento);
    }

}
