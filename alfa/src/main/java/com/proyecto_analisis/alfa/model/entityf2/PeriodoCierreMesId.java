package com.proyecto_analisis.alfa.model.entityf2;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class PeriodoCierreMesId implements Serializable{

    @Column(name = "Anio")
    private Integer anio;
    
    @Column(name = "Mes")
    private Integer mes;

}
