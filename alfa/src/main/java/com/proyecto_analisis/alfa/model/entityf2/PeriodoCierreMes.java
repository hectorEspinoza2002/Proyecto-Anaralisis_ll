package com.proyecto_analisis.alfa.model.entityf2;

import java.sql.Date;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "periodo_cierre_mes")
@Data
public class PeriodoCierreMes {

    @EmbeddedId
    private PeriodoCierreMesId id;

    /*
    @Column(name = "Anio")
    private Integer anio;

    @Column(name = "Mes")
    private Integer mes;
     */

    @Column(name = "FechaInicio")
    private Date fechaInicio;

    @Column(name = "FechaFinal")
    private Date FechaFinal;

    @Column(name = "FechaCierre")
    private LocalDateTime fechaCierre;

}
