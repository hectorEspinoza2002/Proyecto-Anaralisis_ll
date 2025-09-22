package com.proyecto_analisis.alfa.controllerf2;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto_analisis.alfa.servicef2.TipoDocumentoService;
import com.proyecto_analisis.alfa.model.entity.LoginRequest;
import com.proyecto_analisis.alfa.model.entityf2.TipoDocumento;;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class TipoDocumentoController {

    @Autowired
    private TipoDocumentoService tipoDocumentoService;

    @GetMapping("/list_tipo_documentos")
    public List<TipoDocumento> listarTodos(){
        return tipoDocumentoService.findAll();
    }

    @GetMapping("/list_tipo_documento/{id}")
    public Optional<TipoDocumento> obtenerPorId(@PathVariable Integer id){
        return tipoDocumentoService.findById(id);
    }

    @PostMapping("/create_tipo_documento")
    public TipoDocumento createTipoDoc(@RequestBody TipoDocumento tDocId) {
        
        if (tDocId.getIdTipoDocumento() != null && tipoDocumentoService.findById(tDocId.getIdTipoDocumento()).isPresent()) {
            return null;
        } else {
            tDocId.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            tDocId.setFechaCreacion(LocalDateTime.now());
            return tipoDocumentoService.guardar(tDocId);
        }
    }

    @PutMapping("/update_tipo_documento/{id}")
    public TipoDocumento udpateTipoDoc(@PathVariable("id") Integer docId, @RequestBody TipoDocumento udpateTipoD){
        Optional<TipoDocumento> optionalDoc = tipoDocumentoService.findById(docId);
        if (optionalDoc.isPresent()) {
            TipoDocumento td = optionalDoc.get();
            td.setNombre(udpateTipoD.getNombre());
            td.setFechaModificacion(LocalDateTime.now());
            td.setUsuarioModificacion(LoginRequest.getUsuarioLogueado());
            return tipoDocumentoService.guardar(td);
        } else {
            return null;
        }
    }

    @DeleteMapping("/delete_tipo_documento/{id}")
    public void deleteDoc(@PathVariable("id") Integer id){
        Optional<TipoDocumento> optipoDoc = tipoDocumentoService.findById(id);
        optipoDoc.ifPresent(tipoDocumentoService::eliminar);
    }

}
