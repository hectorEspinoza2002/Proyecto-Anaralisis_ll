package com.proyecto_analisis.alfa.servicef2;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entityf2.TipoSaldoCuenta;
import com.proyecto_analisis.alfa.model.repositoryf2.TipoSaldoCuentaRepository;

@Service
public class TipoSaldoCuentaService {

    private final TipoSaldoCuentaRepository tipoSaldoRepo;

    public TipoSaldoCuentaService(TipoSaldoCuentaRepository tscRep){
        this.tipoSaldoRepo = tscRep;
    }

    public List<TipoSaldoCuenta> findAll(){
        return tipoSaldoRepo.findAll();
    }

    public Optional<TipoSaldoCuenta> findById(Integer id){
        return tipoSaldoRepo.findById(id);
    }

    public TipoSaldoCuenta guardar(TipoSaldoCuenta tsc){
        return tipoSaldoRepo.save(tsc);
    }

    public void eliminar(TipoSaldoCuenta tipoSaldoC){
        tipoSaldoRepo.delete(tipoSaldoC);
    }

}
