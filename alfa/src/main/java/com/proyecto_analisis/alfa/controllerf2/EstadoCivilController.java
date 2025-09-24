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
import com.proyecto_analisis.alfa.model.entityf2.EstadoCivil;
import com.proyecto_analisis.alfa.servicef2.EstadoCivilService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class EstadoCivilController {

    @Autowired
    private EstadoCivilService estadoCivilService;

    @GetMapping("/list_estados_civiles")
    public List<EstadoCivil> listarTodos(){
        return estadoCivilService.findAll();
    }

    @GetMapping("/list_estado_civil/{id}")
    public Optional<EstadoCivil> obtenerPorId(@PathVariable Integer id){
        return estadoCivilService.findById(id);
    }

    @PostMapping("/create_estado_civil")
    public EstadoCivil createEstado(@RequestBody EstadoCivil ecId){
        if (ecId.getIdEstadoCivil() != null && estadoCivilService.findById(ecId.getIdEstadoCivil()).isPresent()) {
            return null;
        } else {
            ecId.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            ecId.setFechaCreacion(LocalDateTime.now());
            return estadoCivilService.guardar(ecId);
        }
    }

    @PutMapping("/update_estado_civil/{id}")
    public EstadoCivil updateEstadoCivil(@PathVariable("id") Integer estCid, @RequestBody EstadoCivil updateEstado){
        Optional<EstadoCivil> optionEst = estadoCivilService.findById(estCid);
        if (optionEst.isPresent()) {
            EstadoCivil ec = optionEst.get();
            ec.setNombre(updateEstado.getNombre());
            ec.setUsuarioModificacion(LoginRequest.getUsuarioLogueado());
            ec.setFechaModificacion(LocalDateTime.now());
            return estadoCivilService.guardar(ec);
        } else {
            return null;
        }
    }

    @DeleteMapping("/delete_estado/{id}")
    public void eliminarEstado(@PathVariable("id") Integer estadoId){
        Optional<EstadoCivil> estOptional = estadoCivilService.findById(estadoId);
        estOptional.ifPresent(estadoCivilService::delete);
    }

}
