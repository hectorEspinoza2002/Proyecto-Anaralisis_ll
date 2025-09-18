package com.proyecto_analisis.alfa.model.entityf2;

import java.sql.Date;
import java.time.LocalDateTime;

import com.proyecto_analisis.alfa.model.entity.Genero;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "persona")
@Data
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "IdPersona")
    private Integer idPersona;

    @Column(name = "Nombre")
    private String nombre;

    @Column(name = "FechaNacimiento")
    private Date fechaNacimiento;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "IdGenero")
    private Genero genero;

    @Column(name = "Direccion")
    private String direccion;

    @Column(name = "Telefono")
    private String telefono;
    
    @Column(name = "CorreoElectronico")
    private String correoElectronico;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "IdEstadoCivil")
    private EstadoCivil estadoCivil;

    @Column(name = "FechaCreacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "UsuarioCreacion")
    private String usuarioCreacion;

    @Column(name = "FechaModificacion")
    private LocalDateTime fechaModificacion;

    @Column(name = "UsuarioModificacion")
    private String usuarioModificacion;

}
