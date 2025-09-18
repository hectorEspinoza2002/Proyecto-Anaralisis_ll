package com.proyecto_analisis.alfa.servicef2;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entityf2.MovimientoCuenta;
import com.proyecto_analisis.alfa.model.repositoryf2.MovimientoCuentaRepository;

@Service
public class MovimientoCuentaService {

    private final MovimientoCuentaRepository movimientoRepo;

    public MovimientoCuentaService(MovimientoCuentaRepository mRepo){
        this.movimientoRepo = mRepo;
    }

    public List<MovimientoCuenta> findAll(){
        return movimientoRepo.findAll();
    }

    public Optional<MovimientoCuenta> findById(Integer id){
        return movimientoRepo.findById(id);
    }

    public MovimientoCuenta guardar(MovimientoCuenta mc){
        return movimientoRepo.save(mc);
    }

    public void delete(MovimientoCuenta mCuenta){
        movimientoRepo.delete(mCuenta);
    }

}
