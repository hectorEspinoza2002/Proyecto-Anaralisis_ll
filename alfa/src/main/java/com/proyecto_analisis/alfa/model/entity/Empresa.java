package com.proyecto_analisis.alfa.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Table(name = "empresa")
@Entity
@Data
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdEmpresa")
    private Integer idEmpresa;

    @Column(name = "Nombre")
    private String nombre;

    @Column(name = "Direccion")
    private String direccion;

    @Column(name = "Nit")
    private String nit;

    @Column(name = "PasswordCantidadMayusculas")
    private Integer passwordCantidadMayusculas;

    @Column(name = "PasswordCantidadMinusculas")
    private Integer passwordCantidadMinusculas;

    @Column(name = "PasswordCantidadCaracteresEspeciales")
    private Integer passwordCantidadCaracteresEspeciales;

    @Column(name = "PasswordCantidadCaducidadDias")
    private Integer passwordCantidadCaducidadDias;

    @Column(name = "PasswordLargo")
    private Integer passwordLargo;

    @Column(name = "PasswordIntentosAntesDeBloquear")
    private Integer passwordIntentosAntesDeBloquear;

    @Column(name = "PasswordCantidadNumeros")
    private Integer passwordCantidadNumeros;

    @Column(name = "PasswordCantidadPreguntasValidar")
    private Integer passwordCantidadPreguntasValidar;

    @Column(name = "FechaCreacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "UsuarioCreacion")
    private String usuarioCreacion;

    @Column(name = "FechaModificacion")
    private LocalDateTime fechaModificacion;

    @Column(name = "UsuarioModificacion")
    private String usuarioModificacion;

}
