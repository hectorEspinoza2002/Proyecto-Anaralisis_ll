package com.proyecto_analisis.alfa.model.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Table(name = "status_usuario")
@Entity
@Data
public class StatusUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "IdStatususuario")
    private Integer idStatusUsuario;

    @Column(name = "nombre")
    private String Nombre;

    @Column(name = "FechaCreacion")
    private Date FechaCreacion;

    @Column(name = "UsuarioCreacion")
    private String UsuarioCreacion;

    @Column(name = "FechaModificacion")
    private Date FechaModificacion;

    @Column(name = "UsuarioModificacion")
    private String UsuarioModificado;

}
