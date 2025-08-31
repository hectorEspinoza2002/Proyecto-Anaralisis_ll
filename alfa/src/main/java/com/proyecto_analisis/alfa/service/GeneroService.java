package com.proyecto_analisis.alfa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entity.Genero;
import com.proyecto_analisis.alfa.model.repository.GeneroRepository;

@Service
public class GeneroService {

    private final GeneroRepository generoRepo;

    public GeneroService(GeneroRepository gRepo){
        this.generoRepo = gRepo;
    }

    public List<Genero> findAll(){
        return generoRepo.findAll();
    }

    public Optional<Genero> findById(Integer id){
        return generoRepo.findById(id);
    }

    public Genero guardar(Genero g){
        return generoRepo.save(g);
    }

    public void delete(Genero ge){
        generoRepo.delete(ge);
    }

}
