package com.proyecto_analisis.alfa.servicef2;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entityf2.Persona;
import com.proyecto_analisis.alfa.model.repositoryf2.PersonaRepository;

@Service
public class PersonaService {

    private final PersonaRepository personaRepo;

    public PersonaService(PersonaRepository pRepo){
        this.personaRepo = pRepo;
    }

    public List<Persona> findAll(){
        return personaRepo.findAll();
    }

    public Optional<Persona> findById(Integer id){
        return personaRepo.findById(id);
    }

    public Persona guardar(Persona pers){
        return personaRepo.save(pers);
    }

    public void eliminar(Persona p){
        personaRepo.delete(p);
    }

}
