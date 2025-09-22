package com.proyecto_analisis.alfa.servicef2;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entityf2.PeriodoCierreMes;
import com.proyecto_analisis.alfa.model.entityf2.PeriodoCierreMesId;
import com.proyecto_analisis.alfa.model.repositoryf2.PeriodoCierreMesRepository;

@Service
public class PeriodoCierreMesService {

    private final PeriodoCierreMesRepository periodoRepo;

    public PeriodoCierreMesService(PeriodoCierreMesRepository pcRepo){
        this.periodoRepo = pcRepo;
    }

    public List<PeriodoCierreMes> findAll(){
        return periodoRepo.findAll();
    }

    public Optional<PeriodoCierreMes> findById(PeriodoCierreMesId id){
        return periodoRepo.findById(id);
    }

    public PeriodoCierreMes guardar(PeriodoCierreMes pcm){
        return periodoRepo.save(pcm);
    }

    public void delete(PeriodoCierreMesId id){
        periodoRepo.deleteById(id);
    }

}
