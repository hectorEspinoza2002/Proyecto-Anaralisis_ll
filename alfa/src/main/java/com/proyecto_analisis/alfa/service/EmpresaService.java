package com.proyecto_analisis.alfa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entity.Empresa;
import com.proyecto_analisis.alfa.model.repository.EmpresaRepository;

@Service
public class EmpresaService {

    private final EmpresaRepository empresaRepo;

    public EmpresaService(EmpresaRepository eRepo){
        this.empresaRepo = eRepo;
    }

    public List<Empresa> findAll(){
        return empresaRepo.findAll();
    }

    public Optional<Empresa> findById(Integer id){
        return empresaRepo.findById(id);
    }

    public Empresa guardar(Empresa g){
        return empresaRepo.save(g);
    }

    public void delete(Empresa ge){
        empresaRepo.delete(ge);
    }

}
