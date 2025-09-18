package com.proyecto_analisis.alfa.model.entityf2;

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
@Table(name = "saldo_cuenta")
@Data
public class SaldoCuenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "IdSaldoCuenta")
    private Integer idSaldoCuenta;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "IdPersona")
    private Persona persona;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "IdStatusCuenta")
    private StatusCuenta statusCuenta;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "IdTipoSaldoCuenta")
    private TipoSaldoCuenta tipoSaldoCuenta;

    @Column(name = "SaldoAnterior")
    private double saldoAnterior;

    @Column(name = "Debitos")
    private double debitos;

    @Column(name = "Creditos")
    private double creditos;

    @Column(name = "FechaCreacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "UsuarioCreacion")
    private String usuarioCreacion;

    @Column(name = "FechaModificacion")
    private LocalDateTime fechaModificacion;

    @Column(name = "UsuarioModificacion")
    private String usuarioModificacion;

}
