package com.proyecto_analisis.alfa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entity.StatusUsuario;
import com.proyecto_analisis.alfa.model.repository.StatusUsuarioRepository;

@Service
public class StatusUsuarioService {

    private final StatusUsuarioRepository statusUsRepo;

    public StatusUsuarioService(StatusUsuarioRepository sur){
        this.statusUsRepo = sur;
    }

    public List<StatusUsuario> getAllstatusUsuarios(){
        return (List<StatusUsuario>) statusUsRepo.findAll();
    }

    public Optional<StatusUsuario> findById(Integer id){
        return statusUsRepo.findById(id);
    }

    public StatusUsuario save(StatusUsuario su){
        return statusUsRepo.save(su);
    }

    public void delete(StatusUsuario suD){
        statusUsRepo.delete(suD);
    }

}
