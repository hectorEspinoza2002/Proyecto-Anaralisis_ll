package com.proyecto_analisis.alfa.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto_analisis.alfa.model.entity.StatusUsuario;
import com.proyecto_analisis.alfa.service.StatusUsuarioService;

@RestController
@RequestMapping(path = "/status_usuarios")
public class StatusUsuarioController {

    @Autowired
    private StatusUsuarioService statusUsuService;

    @GetMapping("/list_status_usuarios")
    public List<StatusUsuario> listarTodos(){
        return statusUsuService.getAllstatusUsuarios();
    }

    @GetMapping("/list_status/{id}")
    public Optional<StatusUsuario> obtenerPorId(@PathVariable Integer id){
        return statusUsuService.findById(id);
    }

}
