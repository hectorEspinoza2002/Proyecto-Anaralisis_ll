package com.proyecto_analisis.alfa.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {

    private boolean success;
    private String message;
    private String idUsuario;

}
