package com.proyecto_analisis.alfa.model.entityf2;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    @MapsId("anio")
    @MapsId("mes")
    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumns({
        @JoinColumn(name = "Anio", referencedColumnName = "Anio", insertable = false, updatable = false),
        @JoinColumn(name = "Mes", referencedColumnName = "Mes", insertable = false, updatable = false)
    })

    private PeriodoCierreMes periodo;

    /*
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Anio")
    private PeriodoCierreMes anioPCM;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Mes")
    private PeriodoCierreMes mesPCM;
     

    @Column(name = "IdSaldoCuenta")
    private Integer saldoCuenta;
    */

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
