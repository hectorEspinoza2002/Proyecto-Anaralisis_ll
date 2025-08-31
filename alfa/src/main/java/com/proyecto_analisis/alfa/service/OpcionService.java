package com.proyecto_analisis.alfa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entity.Opcion;
import com.proyecto_analisis.alfa.model.repository.OpcionRepository;

@Service
public class OpcionService {

    @Autowired
    private OpcionRepository opRepository;
    
    public List<Opcion> findAll() {
        return opRepository.findAll();
    }
    
    public Optional<Opcion> findById(Integer id) {
        return opRepository.findById(id);
    }

    public Opcion guardarOpcion(Opcion op){
        return opRepository.save(op);
    }

    public void deleteOpcion(Opcion op){
        opRepository.delete(op);
    }

}
