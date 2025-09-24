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
import com.proyecto_analisis.alfa.model.entityf2.TipoMovimientoCxc;
import com.proyecto_analisis.alfa.servicef2.TipoMovimientoCxcService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class TipoMovimientoCxcController {

    @Autowired
    private TipoMovimientoCxcService tipoMovCxcService;

    @GetMapping("/list_tipo_movimiento_cxc")
    public List<TipoMovimientoCxc> listarTodos() {
        return tipoMovCxcService.findAll();
    }

    @GetMapping("/list_tipo_movimiento_cxc/{id}")
    public Optional<TipoMovimientoCxc> obtenerPorId(@PathVariable Integer tmcxcId) {
        return tipoMovCxcService.findById(tmcxcId);
    }

    @PostMapping("/create_tipo_movimiento_cxc")
    public TipoMovimientoCxc createMovimientoCxc(@RequestBody TipoMovimientoCxc tmcxcId) {
        if (tmcxcId.getIdTipoMovimientoCXC() != null
                && tipoMovCxcService.findById(tmcxcId.getIdTipoMovimientoCXC()).isPresent()) {
            return null;
        } else {
            tmcxcId.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            tmcxcId.setFechaCreacion(LocalDateTime.now());
            return tipoMovCxcService.guardar(tmcxcId);
        }
    }

    @PutMapping("/update_tipo_movimiento_cxc/{id}")
    public TipoMovimientoCxc updateTipoMovimiento(@PathVariable("id") Integer tipoMovId,
            @RequestBody TipoMovimientoCxc updateMov) {
        Optional<TipoMovimientoCxc> optionTipMov = tipoMovCxcService.findById(tipoMovId);
        if (optionTipMov.isPresent()) {
            TipoMovimientoCxc tipo = optionTipMov.get();
            tipo.setNombre(updateMov.getNombre());
            tipo.setOperacionCuentaCorriente(updateMov.getOperacionCuentaCorriente());
            tipo.setFechaModificacion(LocalDateTime.now());
            tipo.setUsuarioModificacion(LoginRequest.getUsuarioLogueado());
            return tipoMovCxcService.guardar(tipo);
        } else {
            return null;
        }
    }
    
    @DeleteMapping("/delete_tipo_movimiento_cxc/{id}")
    public void deleteMovimientoCXC(@PathVariable("id") Integer tmcxcId){
        Optional<TipoMovimientoCxc> tipoOtion = tipoMovCxcService.findById(tmcxcId);
        tipoOtion.ifPresent(tipoMovCxcService::eliminar);
    }

}
