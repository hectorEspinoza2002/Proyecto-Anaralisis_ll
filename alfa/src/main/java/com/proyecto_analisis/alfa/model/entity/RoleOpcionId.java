package com.proyecto_analisis.alfa.model.entity;

import java.io.Serializable;

import jakarta.persistence.Column;

public class RoleOpcionId implements Serializable{

    @Column(name = "IdRole")
    private Integer idRole;

    @Column(name = "IdOpcion")
    private Integer idOpcion;

}
