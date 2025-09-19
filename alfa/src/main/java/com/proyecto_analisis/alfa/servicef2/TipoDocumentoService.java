package com.proyecto_analisis.alfa.servicef2;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entityf2.TipoDocumento;
import com.proyecto_analisis.alfa.model.repositoryf2.TipoDocumentoRepository;

@Service
public class TipoDocumentoService {

    private final TipoDocumentoRepository tipoDocRepo;

    public TipoDocumentoService(TipoDocumentoRepository tdRep){
        this.tipoDocRepo = tdRep;
    }

    public List<TipoDocumento> findAll(){
        return tipoDocRepo.findAll();
    }

    public Optional<TipoDocumento> findById(Integer id){
        return tipoDocRepo.findById(id);
    }

    public TipoDocumento guardar(TipoDocumento td){
        return tipoDocRepo.save(td);
    }

    public void eliminar(TipoDocumento tDoc){
        tipoDocRepo.delete(tDoc);
    }

}
