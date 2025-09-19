package com.proyecto_analisis.alfa.servicef2;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entityf2.StatusCuenta;
import com.proyecto_analisis.alfa.model.repositoryf2.StatusCuentaRepository;

@Service
public class StatusCuentaService {

    private final StatusCuentaRepository statusCuentaRepo;

    private StatusCuentaService(StatusCuentaRepository scRepo){
        this.statusCuentaRepo = scRepo;
    }

    public List<StatusCuenta> findAll(){
        return statusCuentaRepo.findAll();
    }

    public Optional<StatusCuenta> findById(Integer id){
        return statusCuentaRepo.findById(id);
    }

    public StatusCuenta guardar(StatusCuenta sc){
        return statusCuentaRepo.save(sc);
    }

    public void eliminar(StatusCuenta statusC){
        statusCuentaRepo.delete(statusC);
    }

}
