package com.proyecto_analisis.alfa.controllerf2;

import java.time.LocalDateTime;
import java.util.List;

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

import com.proyecto_analisis.alfa.model.entity.LoginRequest;
import com.proyecto_analisis.alfa.model.entityf2.SaldoCuentaHist;
import com.proyecto_analisis.alfa.model.entityf2.SaldoCuentaHistId;
import com.proyecto_analisis.alfa.servicef2.SaldoCuentaHistService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class SaldoCuentaHistController {

     @Autowired
    private SaldoCuentaHistService saldoHistService;

    // Listar todos
    @GetMapping("/list")
    public List<SaldoCuentaHist> listarTodos() {
        return saldoHistService.findAll();
    }

    // Obtener por ID compuesto
    @GetMapping("/{anio}/{mes}/{idSaldoCuenta}")
    public ResponseEntity<SaldoCuentaHist> obtenerPorId(
            @PathVariable Integer anio,
            @PathVariable Integer mes,
            @PathVariable Integer idSaldoCuenta) {

        SaldoCuentaHistId id = new SaldoCuentaHistId(anio, mes, idSaldoCuenta);
        return saldoHistService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear nuevo
    @PostMapping("/create")
    public ResponseEntity<SaldoCuentaHist> create(@RequestBody SaldoCuentaHist sch) {
        sch.setFechaCreacion(LocalDateTime.now());
        sch.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());

        SaldoCuentaHist saved = saldoHistService.guardar(sch);
        return ResponseEntity.ok(saved);
    }

    // Actualizar
    @PutMapping("/update/{anio}/{mes}/{idSaldoCuenta}")
    public ResponseEntity<SaldoCuentaHist> update(
            @PathVariable Integer anio,
            @PathVariable Integer mes,
            @PathVariable Integer idSaldoCuenta,
            @RequestBody SaldoCuentaHist updateSch) {

        SaldoCuentaHistId id = new SaldoCuentaHistId(anio, mes, idSaldoCuenta);

        return saldoHistService.findById(id).map(sch -> {
            sch.setDebitos(updateSch.getDebitos());
            sch.setCreditos(updateSch.getCreditos());
            sch.setSaldoAnterior(updateSch.getSaldoAnterior());
            sch.setFechaModificacion(LocalDateTime.now());
            sch.setUsuarioModificacion(LoginRequest.getUsuarioLogueado());

            SaldoCuentaHist updated = saldoHistService.guardar(sch);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    // Eliminar
    @DeleteMapping("/delete/{anio}/{mes}/{idSaldoCuenta}")
    public ResponseEntity<Void> delete(
            @PathVariable Integer anio,
            @PathVariable Integer mes,
            @PathVariable Integer idSaldoCuenta) {

        SaldoCuentaHistId id = new SaldoCuentaHistId(anio, mes, idSaldoCuenta);

        if (saldoHistService.findById(id).isPresent()) {
            saldoHistService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
