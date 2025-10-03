package com.proyecto_analisis.alfa.servicef2;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entityf2.SaldoCuenta;
import com.proyecto_analisis.alfa.model.repositoryf2.SaldoCuentaRepository;

@Service
public class SaldoCuentaService {

    private final SaldoCuentaRepository saldoRepo;

    public SaldoCuentaService(SaldoCuentaRepository scRepo){
        this.saldoRepo = scRepo;
    }

    public List<SaldoCuenta> findAll(){
        return saldoRepo.findAll();
    }

    public Optional<SaldoCuenta> findById(Integer id){
        return saldoRepo.findById(id);
    }

    public SaldoCuenta guardar(SaldoCuenta sc){
        return saldoRepo.save(sc);
    }

    public void eliminar(SaldoCuenta saldoCu){
        saldoRepo.delete(saldoCu);
    }

     
    public List<SaldoCuenta> findByPersona(Integer idPersona) {
        return saldoRepo.findByPersona_IdPersona(idPersona);
    }

}
