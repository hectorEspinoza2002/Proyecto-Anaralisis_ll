package com.proyecto_analisis.alfa.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto_analisis.alfa.model.entity.Usuario;
import com.proyecto_analisis.alfa.model.repository.UsuarioRepository;
import com.proyecto_analisis.alfa.service.UsuarioService;

@RestController
@RequestMapping(path = "/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @GetMapping("/list_usuarios")
    public List<Usuario> listarTodos(){
        return usuarioService.getAllUsuarios();
    }

    @GetMapping("/list_usuarios/{id}")
    public Optional<Usuario> obtenerPorId(@PathVariable Integer id){
        return usuarioService.findById(id);
    }

    @PostMapping(path = "/login")
    public Usuario login(@RequestBody Usuario u){
        List<Usuario> usuario = usuarioRepo.findByIdUsuarioAndPassword(u.getIdUsuario(), u.getPassword());
        return usuario.size()>0 ? usuario.get(0) : null;
    }

}
