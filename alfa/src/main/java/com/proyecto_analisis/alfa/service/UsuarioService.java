package com.proyecto_analisis.alfa.service;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entity.Usuario;
import com.proyecto_analisis.alfa.model.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepo;

    
    public UsuarioService(UsuarioRepository ur) {
        this.usuarioRepo = ur;
    } 

    public List<Usuario> findAll() {
        return (List<Usuario>) usuarioRepo.findAll();
    }

    public Optional<Usuario> findById(String id) {
        return usuarioRepo.findById(id);
    }

    public void deleteUsuario(Usuario uD) {
        usuarioRepo.delete(uD);
    }

    public Usuario guardarUsuario(Usuario user){
        return usuarioRepo.save(user);
    }

    

    public boolean validarLogin(String idUsuario, String password) {
        Optional<Usuario> usuarioOpt = usuarioRepo.findById(idUsuario);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            String passwordEncriptado = encriptarPassword(password);
            return passwordEncriptado.equals(usuario.getPassword());
        }
        return false;
    }

     private String encriptarPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hash = md.digest(password.getBytes(StandardCharsets.UTF_8));
            return String.format("%032x", new BigInteger(1, hash));
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error al encriptar contraseña", e);
        }
    }

}
