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

import com.proyecto_analisis.alfa.model.entity.Genero;
import com.proyecto_analisis.alfa.model.entity.LoginRequest;
import com.proyecto_analisis.alfa.service.GeneroService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class GeneroController {

    @Autowired
    private GeneroService generoService;

    @GetMapping("/list_generos")
    public List<Genero> listarTodos() {
        return generoService.findAll();
    }

    @GetMapping("/list_generos/{id}")
    public Optional<Genero> obtenerPorId(@PathVariable Integer id) {
        return generoService.findById(id);
    }

    @PostMapping("/create_genero")
    public Genero createGenero(@RequestBody Genero gId) {
        if (gId.getIdGenero() != null && generoService.findById(gId.getIdGenero()).isPresent()) {
            return null;
        } else {
            //Usuario
            gId.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            //Fecha
            gId.setFechaCreacion(LocalDateTime.now());
            return generoService.guardar(gId);
        }

    }

    @PutMapping("/update_genero/{idg}")
    public Genero updateGenero(@PathVariable("idg") Integer generoId, @RequestBody Genero updateGen){
        Optional<Genero> optionGe = generoService.findById(generoId);
        if (optionGe.isPresent()) {
            Genero gnr = optionGe.get();
            gnr.setNombre(updateGen.getNombre());
            //Actualizamos usuario
            gnr.setUsuarioModificacion(LoginRequest.getUsuarioLogueado());
            //Acuatlizamos la hora
            gnr.setFechaModificacion(LocalDateTime.now());
            return generoService.guardar(gnr);
        } else {
            return null;
        }
    }

    @DeleteMapping("delete_genero/{gId}")
    public void deleteGenero(@PathVariable("gId") Integer genId){
        Optional<Genero> genOption = generoService.findById(genId);
        genOption.ifPresent(generoService::delete);
    }

}
