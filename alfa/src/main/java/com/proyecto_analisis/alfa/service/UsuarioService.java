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
import com.proyecto_analisis.alfa.model.entity.Empresa;
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

        // obtenemos la empresa desde la sucursal
        Empresa empresa = usuario.getIdSucursal().getEmpresa();
        int maxIntentos = empresa.getPasswordIntentosAntesDeBloquear() != null ?
        empresa.getPasswordIntentosAntesDeBloquear() : 5;

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

        // validar contra el numero de intentos configurado en empresa
        if (usuario.getIntentosDeAcceso() >= maxIntentos) {
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

    public boolean validarPassword(String password, Empresa empresa) {
        if (password == null)
            return false;

        // Largo mínimo
        if (password.length() < empresa.getPasswordLargo()) {
            return false;
        }

        // Mayúsculas
        long mayusculas = password.chars().filter(Character::isUpperCase).count();
        if (mayusculas < empresa.getPasswordCantidadMayusculas()) {
            return false;
        }

        // Minúsculas
        long minusculas = password.chars().filter(Character::isLowerCase).count();
        if (minusculas < empresa.getPasswordCantidadMinusculas()) {
            return false;
        }

        // Números
        long numeros = password.chars().filter(Character::isDigit).count();
        if (numeros < empresa.getPasswordCantidadNumeros()) {
            return false;
        }

        // Caracteres especiales
        long especiales = password.chars()
                .filter(ch -> !Character.isLetterOrDigit(ch))
                .count();
        if (especiales < empresa.getPasswordCantidadCaracteresEspeciales()) {
            return false;
        }

        return true;
    }

}
