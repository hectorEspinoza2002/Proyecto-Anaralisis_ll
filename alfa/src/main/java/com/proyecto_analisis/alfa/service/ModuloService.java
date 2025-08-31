package com.proyecto_analisis.alfa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entity.Modulo;
import com.proyecto_analisis.alfa.model.repository.ModuloRepository;

@Service
public class ModuloService {

    @Autowired
    private ModuloRepository modRepository;
    
    public List<Modulo> findAll() {
        return modRepository.findAll();
    }
    
    public Optional<Modulo> findById(Integer id) {
        return modRepository.findById(id);
    }

    public Modulo guardarModulo(Modulo m){
        return modRepository.save(m);
    }

    public void deleteModulo(Modulo m){
        modRepository.delete(m);
    }

}
