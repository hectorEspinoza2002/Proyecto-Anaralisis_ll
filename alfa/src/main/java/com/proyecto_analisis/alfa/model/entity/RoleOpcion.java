package com.proyecto_analisis.alfa.model.entity;

import java.time.LocalDateTime;

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
@Table(name = "role_opcion")
@Data
public class RoleOpcion {
    
    @EmbeddedId
    private RoleOpcionId id;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("idRole") // enlaza con role
    @JoinColumn(name = "IdRole", insertable = false, updatable = false)
    private Role role;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("idOpcion") //enlaza con Opcion
    @JoinColumn(name = "IdOpcion", insertable = false, updatable = false)
    private Opcion opcion;

    @Column(name = "Alta")
    private Boolean alta;

    @Column(name = "Baja")
    private Boolean baja;

    @Column(name = "Cambio")
    private Boolean cambio;

    @Column(name = "Imprimir")
    private Boolean imprimir;

    @Column(name = "Exportar")
    private Boolean exportar;

    @Column(name = "FechaCreacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "UsuarioCreacion")
    private String usuarioCreacion;

    @Column(name = "FechaModificacion")
    private LocalDateTime fechaModificacion;

    @Column(name = "UsuarioModificacion")
    private String usuarioModificacion;

}
