package com.proyecto_analisis.alfa.controller;

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
import com.proyecto_analisis.alfa.model.entity.StatusUsuario;
import com.proyecto_analisis.alfa.service.StatusUsuarioService;

@RestController
@CrossOrigin(origins = {"http://localhost:5500", "http://localhost:9090"})
public class StatusUsuarioController {

    @Autowired
    private StatusUsuarioService statusUsuService;

    @GetMapping("/list_status_usuario")
    public List<StatusUsuario> listarTodos(){
        return statusUsuService.findAll();
    }

    @GetMapping("/list_status_usuarios/{sid}")
    public Optional<StatusUsuario> obtenerPorId(@PathVariable Integer sid){
        return statusUsuService.findById(sid);
    }

    @PostMapping("/create_status_usuario")
    public StatusUsuario createStatusUsuario(@RequestBody StatusUsuario suId){
        if (suId.getIdStatusUsuario() != null && statusUsuService.findById(suId.getIdStatusUsuario()).isPresent()) {
            return null;            
        } else {
            suId.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            suId.setFechaCreacion(LocalDateTime.now());
            return statusUsuService.save(suId);
        }
    }

    @PutMapping("/update_statusUs/{sId}")
    public StatusUsuario updateStatus(@PathVariable Integer sId,@RequestBody StatusUsuario updateS){

        Optional<StatusUsuario> suOptional = statusUsuService.findById(sId);
        if (suOptional.isPresent()) {
            StatusUsuario stus = suOptional.get();
            stus.setNombre(updateS.getNombre());
            stus.setUsuarioModificado(LoginRequest.getUsuarioLogueado());
        //Acuatlizamos la hora
            stus.setFechaModificacion(LocalDateTime.now());
            return statusUsuService.save(stus);
        } else {
            return null;
        }
    }

    @DeleteMapping("/delete_status/{id}")
    public void deleteStatus(@PathVariable("id") Integer stuId){
        Optional<StatusUsuario> suOption = statusUsuService.findById(stuId);
        suOption.ifPresent(statusUsuService::delete);
    }

}
