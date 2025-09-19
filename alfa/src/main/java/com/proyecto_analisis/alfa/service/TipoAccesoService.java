package com.proyecto_analisis.alfa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entity.TipoAcceso;
import com.proyecto_analisis.alfa.model.repository.TipoAccesoRepository;

@Service
public class TipoAccesoService {

    private final TipoAccesoRepository tipoAcRepo;

    public TipoAccesoService(TipoAccesoRepository taRep){
        this.tipoAcRepo = taRep;
    }

    public List<TipoAcceso> findAll(){
        return tipoAcRepo.findAll();
    }

    public Optional<TipoAcceso> findById(Integer id){
        return tipoAcRepo.findById(id);
    }

    public TipoAcceso guardar(TipoAcceso ta){
        return tipoAcRepo.save(ta);
    }

    public void eliminar(TipoAcceso tAcc){
        tipoAcRepo.delete(tAcc);
    }

}
