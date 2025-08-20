package com.proyecto_analisis.alfa.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto_analisis.alfa.model.entity.Usuario;
import com.proyecto_analisis.alfa.service.UsuarioService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "https://localhost:9090" })
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/list_usuarios")
    public List<Usuario> listarTodos() {
        return usuarioService.getAllUsuarios();
    }

    @GetMapping("/list_usuarios/{id}")
    public Optional<Usuario> obtenerPorId(@PathVariable String id) {
        return usuarioService.findById(id);
    }

    @PostMapping("/create_usuarios")
    public Usuario createUsuario(@RequestBody Usuario usId){
        if (usId.getIdUsuario() != null && usuarioService.findById(usId.getIdUsuario()).isPresent()) {
            return null;
        } else {
            return usuarioService.save(usId);
        }
    }

    @DeleteMapping("/delete_usuarios/{id}")
    public void deleteUsuario(@PathVariable("id") String idUs) {
        Optional<Usuario> usuarioOptional = usuarioService.findById(idUs);
        usuarioOptional.ifPresent(usuarioService::delete);
    }

}
