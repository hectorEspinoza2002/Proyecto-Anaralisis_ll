package com.proyecto_analisis.alfa.model.entity;

import java.sql.Date;
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

//@Entity
@Table(name = "role_opcion")
@Data
public class RoleOpcion {
    /*

    @EmbeddedId
    private RoleOpcionId id;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("idRole") // mapea la parte de la PK
    @JoinColumn(name = "IdRole")
    private Role role;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("idOpcion") // mapea la parte de la PK
    @JoinColumn(name = "IdOpcion")
    private Opcion opcion;

    /*
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "IdRole")
    private Role role;

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "IdOpcion")
    private Opcion opcion;
    */

    /* 
    @Column(name = "Alta")
    private Integer alta;

    @Column(name = "Baja")
    private Integer baja;

    @Column(name = "Cambio")
    private Integer cambio;

    @Column(name = "Imprimir")
    private Integer imprimir;

    @Column(name = "Exportar")
    private Integer exportar;

    @Column(name = "FechaCreacion")
    private Date fechaCreacion;

    @Column(name = "UsuarioCreacion")
    private String usuarioCreacion;

    @Column(name = "FechaModificacion")
    private LocalDateTime fechaModificacion;

    @Column(name = "UsuarioModificacion")
    private String usuarioModificacion;

    */

}
