package com.proyecto_analisis.alfa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entity.Usuario;
import com.proyecto_analisis.alfa.model.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepo;

    public UsuarioService(UsuarioRepository ur){
        this.usuarioRepo = ur;
    }

    public List<Usuario> getAllUsuarios(){
        return (List<Usuario>) usuarioRepo.findAll();
    }

    public Optional<Usuario> findById(Integer id){
        return usuarioRepo.findById(id);
    }

    public Usuario save(Usuario u){
        return usuarioRepo.save(u);
    }

    public void delete(Usuario uD){
        usuarioRepo.delete(uD);
    }

}
