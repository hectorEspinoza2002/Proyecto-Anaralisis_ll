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
import com.proyecto_analisis.alfa.model.entityf2.TipoSaldoCuenta;
import com.proyecto_analisis.alfa.servicef2.TipoSaldoCuentaService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class TipoSaldoCuentaController {

    @Autowired
    private TipoSaldoCuentaService tipoSaldoService;

    @GetMapping("/list_tipo_saldo_cuentas")
    public List<TipoSaldoCuenta> listarTodos(){
        return tipoSaldoService.findAll();
    }

    @GetMapping("/list_tipo_saldo_cuenta/{id}")
    public Optional<TipoSaldoCuenta> obtenerPorId(@PathVariable Integer id){
        return tipoSaldoService.findById(id);
    }

    @PostMapping("/create_tipo_saldo_cuenta")
    public TipoSaldoCuenta createCuenta(@RequestBody TipoSaldoCuenta tscId){
        if (tscId.getIdTipoSaldoCuenta() != null && tipoSaldoService.findById(tscId.getIdTipoSaldoCuenta()).isPresent()) {
            return null;    
        } else {
            tscId.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            tscId.setFechaCreacion(LocalDateTime.now());
            return tipoSaldoService.guardar(tscId);
        }
    }

    @PutMapping("/update_tipo_saldo_cuenta/{id}")
    public TipoSaldoCuenta updateCuenta(@PathVariable("id") Integer cuentaId, @RequestBody TipoSaldoCuenta updateCuenta){
        Optional<TipoSaldoCuenta> optionalCuenta = tipoSaldoService.findById(cuentaId);
        if (optionalCuenta.isPresent()) {
            TipoSaldoCuenta tsc = optionalCuenta.get();
            tsc.setNombre(updateCuenta.getNombre());
            tsc.setUsuarioModificacion(LoginRequest.getUsuarioLogueado());
            tsc.setFechaModificacion(LocalDateTime.now());
            return tipoSaldoService.guardar(tsc);
        } else {
            return null;
        }
    }

    @DeleteMapping("/delete_tipo_saldo_cuenta/{id}")
    public void deleteTipoCuenta(@PathVariable("tcId") Integer tipoId){
        Optional<TipoSaldoCuenta> cuentaOptional = tipoSaldoService.findById(tipoId);
        cuentaOptional.ifPresent(tipoSaldoService::eliminar);
    }

}
