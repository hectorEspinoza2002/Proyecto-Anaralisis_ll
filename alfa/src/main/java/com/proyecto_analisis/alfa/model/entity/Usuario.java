package com.proyecto_analisis.alfa.model.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Table(name = "usuario")
@Entity
@Data
public class Usuario {

    @Id

    @Column(name = "IdUsuario")
    private String idUsuario;

    @Column(name = "Nombre")
    private String nombre;

    @Column(name = "Apellido")
    private String apellido;

    @Column(name = "FechaNacimiento")
    private Date fechaNacimiento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdStatusUsuario")
    private StatusUsuario idStatusUsuario;

    @Column(name = "Password")
    private String password;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdGenero")
    private Genero idGenero;

    @Column(name = "UltimaFechaIngreso")
    private Date ultimaFechaIngreso;

    @Column(name = "IntentosDeAcceso")
    private Integer intentosDeAcceso;

    @Column(name = "SesionActual")
    private String sesionActual;

    @Column(name = "UltimaFechaCambioPassword")
    private Date ultimaFechaCambioPassword;

    @Column(name = "CorreoElectronico")
    private String correoElectronico;

    @Column(name = "RequiereCambiarPassword")
    private Integer requiereCambiarPassword;

    @Column(name = "fotografia")
    private String fotografia;

    @Column(name = "TelefonoMovil")
    private String telefonoMovil;

    @Column(name = "IdSucursal")
    private Integer idSucursal;

    @Column(name = "pregunta")
    private String pregunta;

    @Column(name = "respuesta")
    private String respuesta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdRole")
    private Role idRole;

    @Column(name = "FechaCreacion")
    private Date fechaCreacion;

    @Column(name = "UsuarioCreacion")
    private String usuarioCreacion;

    @Column(name = "FechaModificacion")
    private Date fechaModificacion;

    @Column(name = "UsuarioModificacion")
    private String usuarioModificacion;

}
