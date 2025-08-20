package com.proyecto_analisis.alfa.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto_analisis.alfa.model.entity.Usuario;
import com.proyecto_analisis.alfa.model.repository.UsuarioRepository;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "https://localhost:9090" })
public class LoginController {

    @Autowired
    private UsuarioRepository usuarioRepo;

    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario u) {
        List<Usuario> usuario = usuarioRepo.findByIdUsuarioAndPassword(u.getIdUsuario(), u.getPassword());
        return usuario.size() > 0 ? usuario.get(0) : null;
    }

}
