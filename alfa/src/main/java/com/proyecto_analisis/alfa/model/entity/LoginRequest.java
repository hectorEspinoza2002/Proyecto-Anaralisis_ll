package com.proyecto_analisis.alfa.model.entity;

import lombok.Data;

@Data
public class LoginRequest {

    private String idUsuario;
    private String password;
    private static String usuarioLogueado;

    public static String getUsuarioLogueado() {
        return usuarioLogueado;
    }

    public static void setUsuarioLogueado(String idusuario){
        usuarioLogueado = idusuario;
    }

}
