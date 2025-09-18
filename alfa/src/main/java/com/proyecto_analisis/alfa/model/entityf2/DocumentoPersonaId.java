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
public class DocumentoPersonaId implements Serializable{

    @Column(name = "IdTipoDocumento")
    private Integer tipoDocumento;

    @Column(name = "IdPersona")
    private Integer persona;

}
