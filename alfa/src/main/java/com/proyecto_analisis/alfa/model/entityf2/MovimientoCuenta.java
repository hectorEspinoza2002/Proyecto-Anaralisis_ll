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
@Table(name = "movimiento_cuenta")
@Data
public class MovimientoCuenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "IdMovimientoCuenta")
    private Integer idMovimientoCuenta;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "IdSaldoCuenta")
    private SaldoCuenta idSaldoCuenta;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "IdTipoMovimientoCXC")
    private TipoMovimientoCxc idTipoMovimientoCXC;

    @Column(name = "FechaMovimiento")
    private LocalDateTime fechaMovimiento;

    @Column(name = "ValorMovimiento")
    private double valorMovimiento;

    @Column(name = "ValorMovimientoPagado")
    private double valorMovimientoPagado;

    @Column(name = "GeneradoAutomaticamente")
    private boolean generadoAutomaticamente;

    @Column(name = "Descripcion")
    private String descripcion;

    @Column(name = "FechaCreacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "UsuarioCreacion")
    private String usuarioCreacion;

    @Column(name = "FechaModificacion")
    private LocalDateTime fechaModificacion;

    @Column(name = "UsuarioModificacion")
    private String usuarioModificacion;

}
