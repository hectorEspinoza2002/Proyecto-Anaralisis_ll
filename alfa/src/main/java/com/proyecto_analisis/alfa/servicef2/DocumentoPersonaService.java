package com.proyecto_analisis.alfa.servicef2;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entityf2.DocumentoPersona;
import com.proyecto_analisis.alfa.model.entityf2.DocumentoPersonaId;
import com.proyecto_analisis.alfa.model.repositoryf2.DocumentoPersonaRepository;

@Service
public class DocumentoPersonaService {

    private final DocumentoPersonaRepository documentoRepo;

    public DocumentoPersonaService(DocumentoPersonaRepository dRepo){
        this.documentoRepo = dRepo;
    }

    public List<DocumentoPersona> findAll(){
        return documentoRepo.findAll();
    }

    public Optional<DocumentoPersona> findById(DocumentoPersonaId id){
        return documentoRepo.findById(id);
    }

    public DocumentoPersona guardar(DocumentoPersona dp){
        return documentoRepo.save(dp);
    }

    public void delete(DocumentoPersonaId dPer){
        documentoRepo.deleteById(dPer);
    }

    public List<DocumentoPersona> findByTipoDoc(Integer tipoDocumento){
        return documentoRepo.findByTipoDocumento_IdTipoDocumento(tipoDocumento);
        //return documentoRepo.findById_TipoDocumento(tipoDocumento);
    }

}
