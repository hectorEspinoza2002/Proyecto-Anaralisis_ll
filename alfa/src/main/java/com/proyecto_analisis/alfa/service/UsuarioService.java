package com.proyecto_analisis.alfa.service;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.service.StatusUsuarioService;
import com.proyecto_analisis.alfa.model.entity.StatusUsuario;
import com.proyecto_analisis.alfa.model.entity.Usuario;
import com.proyecto_analisis.alfa.model.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private StatusUsuarioService statusUsuarioService;

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

    public Usuario guardarUsuario(Usuario user) {
        return usuarioRepo.save(user);
    }

    public boolean validarLogin(String idUsuario, String password) {
        System.out.println("Intentos de login para: " + idUsuario);
        Optional<Usuario> usuarioOpt = usuarioRepo.findById(idUsuario);

        if (usuarioOpt.isEmpty()) {
            return false;
        }

        Usuario usuario = usuarioOpt.get();
        System.out.println("Status usuario: " + usuario.getIdStatusUsuario().getIdStatusUsuario());
        System.out.println("Intentos: " + usuario.getIntentosDeAcceso());

        // 🔹 Validar si ya está bloqueado
        if (usuario.getIdStatusUsuario() != null
                && usuario.getIdStatusUsuario().getIdStatusUsuario() == 2) {
            System.out.println("Usuario " + idUsuario + " ya está bloqueado");
            return false;
        }

        String passwordEncriptado = encriptarPassword(password);

        // 🔹 Si la contraseña es correcta
        if (passwordEncriptado.equals(usuario.getPassword())) {
            usuario.setIntentosDeAcceso(0); // resetear intentos
            usuarioRepo.save(usuario);
            return true;
        }

        // 🔹 Si la contraseña es incorrecta
        int intentos = usuario.getIntentosDeAcceso() == null ? 0 : usuario.getIntentosDeAcceso();
        usuario.setIntentosDeAcceso(intentos + 1);

        // 🔹 Si llega a 5 intentos, cambiar estatus a BLOQUEADO
        if (usuario.getIntentosDeAcceso() >= 5) {
            StatusUsuario statusBloqueado = statusUsuarioService.obtenerStatusPorId(2);
            usuario.setIdStatusUsuario(statusBloqueado);
            System.out.println("Usuario " + idUsuario + " ha sido bloqueado por intentos fallidos");
        }

        usuarioRepo.save(usuario);
        return false;
    }

    public String encriptarPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hash = md.digest(password.getBytes(StandardCharsets.UTF_8));
            return String.format("%032x", new BigInteger(1, hash));
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error al encriptar contraseña", e);
        }
    }

    /*
     * private String encriptarPassword(String password) {
     * try {
     * MessageDigest md = MessageDigest.getInstance("MD5");
     * byte[] hash = md.digest(password.getBytes(StandardCharsets.UTF_8));
     * return String.format("%032x", new BigInteger(1, hash));
     * } catch (NoSuchAlgorithmException e) {
     * throw new RuntimeException("Error al encriptar contraseña", e);
     * }
     * }
     */

}
