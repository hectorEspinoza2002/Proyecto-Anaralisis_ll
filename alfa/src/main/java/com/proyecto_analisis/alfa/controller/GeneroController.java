package com.proyecto_analisis.alfa.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto_analisis.alfa.model.entity.Genero;
import com.proyecto_analisis.alfa.service.GeneroService;

@RestController
@RequestMapping(path = "/genero")
public class GeneroController {

    @Autowired
    private GeneroService generoService;

    @GetMapping("/list_generos")
    public List<Genero> listarTodos(){
        return generoService.listarGeneros();
    }

    @GetMapping("/list_generos/{id}")
    public Optional<Genero> obtenerPorId(@PathVariable Integer id){
        return generoService.findById(id);
    }


}
