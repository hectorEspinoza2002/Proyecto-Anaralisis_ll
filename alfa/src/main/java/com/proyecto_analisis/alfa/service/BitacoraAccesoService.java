package com.proyecto_analisis.alfa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entity.BitacoraAcceso;
import com.proyecto_analisis.alfa.model.repository.BitacoraAccesoRepository;

@Service
public class BitacoraAccesoService {

    private final BitacoraAccesoRepository bitacoraRepo;

    public BitacoraAccesoService(BitacoraAccesoRepository baRep){
        this.bitacoraRepo = baRep;
    }

    public List<BitacoraAcceso> findAll(){
        return bitacoraRepo.findAll();
    }

    public Optional<BitacoraAcceso> findById(Integer id){
        return bitacoraRepo.findById(id);
    }

    public BitacoraAcceso guardar(BitacoraAcceso bAcc){
        return bitacoraRepo.save(bAcc);
    }

    public void eliminar(BitacoraAcceso b){
        bitacoraRepo.delete(b);
    }

}
