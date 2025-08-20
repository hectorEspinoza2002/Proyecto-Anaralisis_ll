package com.proyecto_analisis.alfa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entity.Genero;
import com.proyecto_analisis.alfa.model.entity.StatusUsuario;
import com.proyecto_analisis.alfa.model.entity.Usuario;
import com.proyecto_analisis.alfa.model.repository.GeneroRepository;
import com.proyecto_analisis.alfa.model.repository.StatusUsuarioRepository;
import com.proyecto_analisis.alfa.model.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private GeneroRepository generoRepo;

    @Autowired
    private StatusUsuarioRepository statusRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;

    public UsuarioService(UsuarioRepository ur) {
        this.usuarioRepo = ur;
    }

    public List<Usuario> getAllUsuarios() {
        return (List<Usuario>) usuarioRepo.findAll();
    }

    public Optional<Usuario> findById(String id) {
        return usuarioRepo.findById(id);
    }

    public Usuario save(Usuario usu) {
        // validaciones básicas (campos NOT NULL en DB)
        if (usu.getIdUsuario() == null || usu.getPassword() == null
                || usu.getFechaNacimiento() == null || usu.getIdSucursal() == null) {
            throw new IllegalArgumentException(
                    "Faltan campos obligatorios (idUsuario, password, fechaNacimiento, idSucursal)");
        }

        // Obtener Genero administrado
        if (usu.getIdGenero() == null || usu.getIdGenero().getIdGenero() == null) {
            throw new IllegalArgumentException("Genero requerido");
        }
        Genero genero = generoRepo.findById(usu.getIdGenero().getIdGenero())
                .orElseThrow(() -> new IllegalArgumentException("Genero no encontrado"));
        usu.setIdGenero(genero);

        // Obtener Status administrado
        if (usu.getIdStatusUsuario() == null || usu.getIdStatusUsuario().getIdStatusUsuario() == null) {
            throw new IllegalArgumentException("StatusUsuario requerido");
        }
        StatusUsuario status = statusRepo.findById(usu.getIdStatusUsuario().getIdStatusUsuario())
                .orElseThrow(() -> new IllegalArgumentException("StatusUsuario no encontrado"));
        usu.setIdStatusUsuario(status);

        // Campos por defecto
        //if (usu.getFechaCreacion() == null)
          //  usu.setFechaCreacion(LocalDateTime(now));

        return usuarioRepo.save(usu);
    }

    public void delete(Usuario uD) {
        usuarioRepo.delete(uD);
    }

}
