package com.proyecto_analisis.alfa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entity.Sucursal;
import com.proyecto_analisis.alfa.model.repository.SucursalRepository;

@Service
public class SucursalService {

     @Autowired
    private SucursalRepository sucursalRepository;
    
    public List<Sucursal> findAll() {
        return sucursalRepository.findAll();
    }
    
    public Optional<Sucursal> findById(Integer id) {
        return sucursalRepository.findById(id);
    }

    public Sucursal guardarSucursal(Sucursal s){
        return sucursalRepository.save(s);
    }

    public void deleteSucursal(Sucursal s){
        sucursalRepository.delete(s);
    }

}
