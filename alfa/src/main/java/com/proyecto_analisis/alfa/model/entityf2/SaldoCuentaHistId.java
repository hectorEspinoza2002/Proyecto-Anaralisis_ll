package com.proyecto_analisis.alfa.model.entityf2;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaldoCuentaHistId implements Serializable{

    @Column(name = "Anio")
    private Integer anio;

    @Column(name =  "Mes")
    private Integer mes;

    @Column(name = "IdSaldoCuenta")
    private Integer idsaldoCuenta;

}
