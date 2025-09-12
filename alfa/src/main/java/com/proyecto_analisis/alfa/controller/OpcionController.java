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
import com.proyecto_analisis.alfa.model.entity.Opcion;
import com.proyecto_analisis.alfa.service.OpcionService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class OpcionController {

    @Autowired
    private OpcionService opService;

    @GetMapping("/list_opciones")
    public List<Opcion> listarTodos() {
        return opService.findAll();
    }

    @GetMapping("/list_opciones/{id}")
    public Optional<Opcion> obtenerPorId(@PathVariable Integer id) {
        return opService.findById(id);
    }

    @PostMapping("/create_opcion")
    public Opcion createOpcion(@RequestBody Opcion opId) {
        if (opId.getIdOpcion() != null && opService.findById(opId.getIdOpcion()).isPresent()) {
            return null;
        } else {
            //Usuario
            opId.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            //Fecha
            opId.setFechaCreacion(LocalDateTime.now());
            return opService.guardarOpcion(opId);
        }

    }

    @PutMapping("/update_opcion/{idop}")
    public Opcion updateOpcion(@PathVariable("idop") Integer opId, @RequestBody Opcion updateGen){
        Optional<Opcion> optionOp = opService.findById(opId);
        if (optionOp.isPresent()) {
            Opcion op = optionOp.get();
            op.setMenu(updateGen.getMenu());
            op.setNombre(updateGen.getNombre());
            op.setOrdenMenu(updateGen.getOrdenMenu());
            op.setPagina(updateGen.getPagina());
            //Actualizamos usuario
            op.setUsuarioModificacion(LoginRequest.getUsuarioLogueado());
            //Acuatlizamos la hora
            op.setFechaModificacion(LocalDateTime.now());
            return opService.guardarOpcion(op);
        } else {
            return null;
        }
    }

    @DeleteMapping("delete_opciones/{mId}")
    public void deleteOpciones(@PathVariable("mId") Integer Id){
        Optional<Opcion> Option = opService.findById(Id);
        Option.ifPresent(opService::deleteOpcion);
    }

}
