package com.proyecto_analisis.alfa.model.entity;

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
public class RoleOpcionId implements Serializable{

    @Column(name = "IdRole")
    private Integer idRole;

    @Column(name = "IdOpcion")
    private Integer idOpcion;

}
