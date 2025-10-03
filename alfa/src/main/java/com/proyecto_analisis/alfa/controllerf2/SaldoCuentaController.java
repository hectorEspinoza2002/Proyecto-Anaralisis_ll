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

import com.proyecto_analisis.alfa.model.entity.LoginRequest;
import com.proyecto_analisis.alfa.model.entityf2.SaldoCuenta;
import com.proyecto_analisis.alfa.servicef2.SaldoCuentaService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class SaldoCuentaController {

    @Autowired
    private SaldoCuentaService saldoService;

    @GetMapping("/list_saldo_cuentas")
    public List<SaldoCuenta> listarTodos() {
        return saldoService.findAll();
    }

    @GetMapping("/list_saldo_cuenta/{id}")
    public Optional<SaldoCuenta> obtenerPorId(@PathVariable Integer id) {
        return saldoService.findById(id);
    }

    @PostMapping("/create_saldo_cuenta")
    public SaldoCuenta createSaldoCuenta(@RequestBody SaldoCuenta tscId) {
        if (tscId.getIdSaldoCuenta() != null && saldoService.findById(tscId.getIdSaldoCuenta()).isPresent()) {
            return null;
        } else {
            tscId.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            tscId.setFechaCreacion(LocalDateTime.now());
            return saldoService.guardar(tscId);
        }
    }

    @PutMapping("/update_saldo_cuenta/{id}")
    public SaldoCuenta updateSaldo(@PathVariable("id") Integer cuentaId, @RequestBody SaldoCuenta updateSc) {
        Optional<SaldoCuenta> optionalSc = saldoService.findById(cuentaId);
        if (optionalSc.isPresent()) {
            SaldoCuenta sc = optionalSc.get();
            sc.setPersona(updateSc.getPersona());
            sc.setStatusCuenta(updateSc.getStatusCuenta());
            sc.setTipoSaldoCuenta(updateSc.getTipoSaldoCuenta());
            sc.setSaldoAnterior(updateSc.getSaldoAnterior());
            sc.setDebitos(updateSc.getDebitos());
            sc.setCreditos(updateSc.getCreditos());
            sc.setFechaModificacion(LocalDateTime.now());
            sc.setUsuarioModificacion(LoginRequest.getUsuarioLogueado());
            return saldoService.guardar(sc);
        } else {
            return null;
        }
    }

    @DeleteMapping("/delete_saldo_cuenta/{id}")
    public void deleteSaldoCuenta(@PathVariable("id") Integer saldoId) {
        Optional<SaldoCuenta> optionSaldo = saldoService.findById(saldoId);
        optionSaldo.ifPresent(saldoService::eliminar);
    }

}
