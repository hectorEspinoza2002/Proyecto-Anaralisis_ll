package com.proyecto_analisis.alfa.service;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entity.Empresa;
import com.proyecto_analisis.alfa.model.entity.Genero;
import com.proyecto_analisis.alfa.model.entity.Role;
import com.proyecto_analisis.alfa.model.entity.StatusUsuario;
import com.proyecto_analisis.alfa.model.entity.Sucursal;
import com.proyecto_analisis.alfa.model.entity.Usuario;
import com.proyecto_analisis.alfa.model.repository.EmpresaRepository;
import com.proyecto_analisis.alfa.model.repository.GeneroRepository;
import com.proyecto_analisis.alfa.model.repository.RoleRepository;
import com.proyecto_analisis.alfa.model.repository.StatusUsuarioRepository;
import com.proyecto_analisis.alfa.model.repository.SucursalRepository;
import com.proyecto_analisis.alfa.model.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private GeneroRepository generoRepo;

    @Autowired
    private StatusUsuarioRepository statusRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private SucursalRepository sucursalRepo; // Necesitamos este repository

    @Autowired
    private EmpresaRepository empresaRepo; // Y este también

    @Autowired
    private RoleRepository rolRepo; // Y este también

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
        // Validaciones básicas
        if (usu.getIdUsuario() == null || usu.getPassword() == null
                || usu.getFechaNacimiento() == null || usu.getSucursal() == null) {
            throw new IllegalArgumentException("Faltan campos obligatorios");
        }

        // Validar género
        if (usu.getIdGenero() == null || usu.getIdGenero().getIdGenero() == null) {
            throw new IllegalArgumentException("Género requerido");
        }
        Genero genero = generoRepo.findById(usu.getIdGenero().getIdGenero())
                .orElseThrow(() -> new IllegalArgumentException("Género no encontrado"));
        usu.setIdGenero(genero);

        // Validar status
        if (usu.getIdStatusUsuario() == null || usu.getIdStatusUsuario().getIdStatusUsuario() == null) {
            throw new IllegalArgumentException("StatusUsuario requerido");
        }
        StatusUsuario status = statusRepo.findById(usu.getIdStatusUsuario().getIdStatusUsuario())
                .orElseThrow(() -> new IllegalArgumentException("StatusUsuario no encontrado"));
        usu.setIdStatusUsuario(status);

        // Validar y cargar sucursal completa con empresa
        if (usu.getSucursal() == null || usu.getSucursal().getIdSucursal() == null) {
            throw new IllegalArgumentException("Sucursal requerida");
        }

        Sucursal sucursalCompleta = sucursalRepo.findById(usu.getSucursal().getIdSucursal())
                .orElseThrow(() -> new IllegalArgumentException("Sucursal no encontrada"));

        // Asegurarnos de que la empresa esté cargada
        if (sucursalCompleta.getEmpresa() == null) {
            throw new IllegalArgumentException("La sucursal no tiene empresa asociada");
        }

        // Cargar empresa completa para obtener todas las reglas
        Empresa empresa = empresaRepo.findById(sucursalCompleta.getEmpresa().getIdEmpresa())
                .orElseThrow(() -> new IllegalArgumentException("Empresa no encontrada"));

        // Validar contraseña con las reglas de la empresa
        validarPassword(usu.getPassword(), empresa);

        // Encriptar contraseña antes de guardar (recomendado)
        //usu.setPassword(encriptarPassword(usu.getPassword()));

        // Establecer fechas de creación
        if (usu.getFechaCreacion() == null) {
            usu.setFechaCreacion(LocalDateTime.now());
        }

        return usuarioRepo.save(usu);

    }

    private void validarPassword(String password, Empresa empresa) {
        if (password == null) {
            throw new IllegalArgumentException("La contraseña no puede ser nula");
        }

        if (empresa.getPasswordLargo() != null && password.length() < empresa.getPasswordLargo()) {
            throw new IllegalArgumentException(
                    "La contraseña debe tener al menos " + empresa.getPasswordLargo() + " caracteres");
        }

        if (empresa.getPasswordCantidadMayusculas() != null) {
            long mayusculas = password.chars().filter(Character::isUpperCase).count();
            if (mayusculas < empresa.getPasswordCantidadMayusculas()) {
                throw new IllegalArgumentException(
                        "La contraseña debe tener al menos " + empresa.getPasswordCantidadMayusculas()
                                + " mayúscula(s)");
            }
        }

        if (empresa.getPasswordCantidadMinusculas() != null) {
            long minusculas = password.chars().filter(Character::isLowerCase).count();
            if (minusculas < empresa.getPasswordCantidadMinusculas()) {
                throw new IllegalArgumentException(
                        "La contraseña debe tener al menos " + empresa.getPasswordCantidadMinusculas()
                                + " minúscula(s)");
            }
        }

        if (empresa.getPasswordCantidadNumeros() != null) {
            long numeros = password.chars().filter(Character::isDigit).count();
            if (numeros < empresa.getPasswordCantidadNumeros()) {
                throw new IllegalArgumentException(
                        "La contraseña debe tener al menos " + empresa.getPasswordCantidadNumeros() + " número(s)");
            }
        }

        if (empresa.getPasswordCantidadCaracteresEspeciales() != null) {
            String caracteresEspeciales = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";
            long especiales = password.chars().filter(c -> caracteresEspeciales.indexOf(c) >= 0).count();
            if (especiales < empresa.getPasswordCantidadCaracteresEspeciales()) {
                throw new IllegalArgumentException("La contraseña debe tener al menos "
                        + empresa.getPasswordCantidadCaracteresEspeciales() + " caracter(es) especial(es)");
            }
        }
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

    public void delete(Usuario uD) {
        usuarioRepo.delete(uD);
    }

    public Usuario guardarUsuario(Usuario user){
        return usuarioRepo.save(user);
    }

    public List<Genero> findAll(){
        return generoRepo.findAll();
    }

    public List<Role> findAllrol(){
        return rolRepo.findAll();
    }

    public List<StatusUsuario> findAllstatus(){
        return statusRepo.findAll();
    }

    public List<Sucursal> findAllsucursal(){
        return sucursalRepo.findAll();
    }

}
