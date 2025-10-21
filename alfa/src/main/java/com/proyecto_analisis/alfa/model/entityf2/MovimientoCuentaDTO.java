package com.proyecto_analisis.alfa.model.entityf2;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class MovimientoCuentaDTO {

     private int idMovimientoCuenta;
    private LocalDateTime fechaMovimiento;
    private String tipoMovimiento;
    private String descripcion;
    private double cargos;
    private double abonos;

}
