package com.proyecto_analisis.alfa.model.entityf2;

import java.time.LocalDateTime;

import com.proyecto_analisis.alfa.model.entity.RoleOpcionId;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "documento_persona")
@Data
public class DocumentoPersona {

    @EmbeddedId
    private RoleOpcionId id;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("idTipoDocumento") // enlaza con Tipo_Documento
    @JoinColumn(name = "IdTipoDocumento", insertable = false, updatable = false)
    private TipoDocumento tipoDocumento;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("idPersona") //enlaza con Persona
    @JoinColumn(name = "IdPersona", insertable = false, updatable = false)
    private Persona persona;

    @Column(name = "NoDocumento")
    private String noDocumento;

    @Column(name = "FechaCreacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "UsuarioCreacion")
    private String usuarioCreacion;

    @Column(name = "FechaModificacion")
    private LocalDateTime fechaModificacion;

    @Column(name = "UsuarioModificacion")
    private String usuarioModificacion;

}
