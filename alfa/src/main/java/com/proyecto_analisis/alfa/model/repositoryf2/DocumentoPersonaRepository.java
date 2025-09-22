package com.proyecto_analisis.alfa.model.repositoryf2;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto_analisis.alfa.model.entityf2.DocumentoPersona;
import com.proyecto_analisis.alfa.model.entityf2.DocumentoPersonaId;

@Repository
public interface DocumentoPersonaRepository extends JpaRepository<DocumentoPersona, DocumentoPersonaId> {

  // Buscar todas las opciones asignadas a un rol
  List<DocumentoPersona> findByTipoDocumento_IdTipoDocumento(Integer idTipoDocumento);
                        //findById_TipoDocumento(tipoDocumento);  

  // Buscar si una opcion especifica pertenece a un rol
  Optional<DocumentoPersona> findByTipoDocumento_IdTipoDocumentoAndPersona_IdPersona(Integer idTipoDocumento,
      Integer idPersona);

}
