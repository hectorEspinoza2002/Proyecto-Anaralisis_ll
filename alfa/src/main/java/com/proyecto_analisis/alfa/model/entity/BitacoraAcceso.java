package com.proyecto_analisis.alfa.model.entity;

import java.time.LocalDateTime;

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
@Table(name = "bitacora_acceso")
@Data
public class BitacoraAcceso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "IdBitacoraAcceso")
    private Integer idBitacoraAcceso;

    @Column(name = "IdUsuario")
    private String idUsuario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "IdTipoAcceso")
    private TipoAcceso tipoAcceso;

    @Column(name = "FechaAcceso")
    private LocalDateTime fechaAcceso;

    @Column(name = "HttpUserAgent")
    private String httpUserAgent;

    @Column(name = "DireccionIp")
    private String direccionIp;

    @Column(name = "Accion")
    private String accion;

    @Column(name = "SistemaOperativo")
    private String sistemaOperativo;

    @Column(name = "Dispositivo")
    private String dispositivo;

    @Column(name = "Browser")
    private String browser;

    @Column(name = "Sesion")
    private String sesion;

}
