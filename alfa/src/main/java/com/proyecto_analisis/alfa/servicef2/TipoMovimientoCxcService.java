package com.proyecto_analisis.alfa.servicef2;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entityf2.TipoMovimientoCxc;
import com.proyecto_analisis.alfa.model.repositoryf2.TipoMovimientoCxcRepository;

@Service
public class TipoMovimientoCxcService {

    private final TipoMovimientoCxcRepository tipoMovRepo;

    public TipoMovimientoCxcService(TipoMovimientoCxcRepository tmRep){
        this.tipoMovRepo = tmRep;
    }

    public List<TipoMovimientoCxc> findAll(){
        return tipoMovRepo.findAll();
    }

    public Optional<TipoMovimientoCxc> findById(Integer id){
        return tipoMovRepo.findById(id);
    }

    public TipoMovimientoCxc guardar(TipoMovimientoCxc tmcxc){
        return tipoMovRepo.save(tmcxc);
    }

    public void eliminar(TipoMovimientoCxc tMovCxc){
        tipoMovRepo.delete(tMovCxc);
    }

}
