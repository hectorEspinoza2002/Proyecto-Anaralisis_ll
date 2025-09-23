package com.proyecto_analisis.alfa.model.entityf2;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "saldo_cuenta_hist")
@Data
public class SaldoCuentaHist {

    @EmbeddedId
    private SaldoCuentaHistId id;
    
    /*
    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("anio")
    @MapsId("mes")
    @JoinColumns({
        @JoinColumn(name = "Anio", referencedColumnName = "Anio"),
        @JoinColumn(name = "Mes", referencedColumnName = "Mes")
    })
         */
    
    @MapsId
    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumns({
        @JoinColumn(name = "Anio", referencedColumnName = "Anio"),
        @JoinColumn(name = "Mes", referencedColumnName = "Mes")
    })

    private PeriodoCierreMes periodo;

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
