package com.proyecto_analisis.alfa.model.entityf2;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "tipo_movimiento_cxc")
@Data
public class TipoMovimientoCxc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "IdTipoMovimientoCXC")
    private Integer idTipoMovimientoCXC;

    @Column(name = "Nombre")
    private String nombre;

    @Column(name = "OperacionCuentaCorriente")
    private Integer operacionCuentaCorriente;

    @Column(name = "FechaCreacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "UsuarioCreacion")
    private String usuarioCreacion;

    @Column(name = "FechaModificacion")
    private LocalDateTime fechaModificacion;

    @Column(name = "UsuarioModificacion")
    private String usuarioModificacion;

}
