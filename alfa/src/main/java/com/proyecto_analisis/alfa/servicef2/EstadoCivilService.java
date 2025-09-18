package com.proyecto_analisis.alfa.servicef2;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entityf2.EstadoCivil;
import com.proyecto_analisis.alfa.model.repositoryf2.EstadoCivilRepository;

@Service
public class EstadoCivilService {

    private final EstadoCivilRepository estadoRepo;

    public EstadoCivilService(EstadoCivilRepository eRepo){
        this.estadoRepo = eRepo;
    }

    public List<EstadoCivil> findAll(){
        return estadoRepo.findAll();
    }

    public Optional<EstadoCivil> findById(Integer id){
        return estadoRepo.findById(id);
    }

    public EstadoCivil guardar(EstadoCivil ec){
        return estadoRepo.save(ec);
    }

    public void delete(EstadoCivil eCivil){
        estadoRepo.delete(eCivil);
    }

}
