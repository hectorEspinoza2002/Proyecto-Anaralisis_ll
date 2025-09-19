package com.proyecto_analisis.alfa.servicef2;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entityf2.SaldoCuentaHist;
import com.proyecto_analisis.alfa.model.repositoryf2.SaldoCuentaHistRepository;

@Service
public class SaldoCuentaHistService {

    private final SaldoCuentaHistRepository saldoHistRepo;

    public SaldoCuentaHistService(SaldoCuentaHistRepository shRepo){
        this.saldoHistRepo = shRepo;
    }

    public List<SaldoCuentaHist> findAll(){
        return saldoHistRepo.findAll();
    }

    public Optional<SaldoCuentaHist> findById(Integer id){
        return saldoHistRepo.findById(id);
    }

    public SaldoCuentaHist guardar(SaldoCuentaHist sch){
        return saldoHistRepo.save(sch);
    }

    public void eliminar(SaldoCuentaHist scHist){
        saldoHistRepo.delete(scHist);
    }

}
