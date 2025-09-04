package com.proyecto_analisis.alfa.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.proyecto_analisis.alfa.model.entity.LoginRequest;
import com.proyecto_analisis.alfa.model.entity.Usuario;
import com.proyecto_analisis.alfa.service.UsuarioService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/list_usuario")
    public List<Usuario> listarTodos() {
        return usuarioService.findAll();
    }

    @GetMapping("/list_usuario/{id}")
    public Optional<Usuario> obtenerPorId(@PathVariable String id) {
        return usuarioService.findById(id);
    }

    @PostMapping("/create_usuario")
    public Usuario createUsuario(@RequestBody Usuario userId) {
        if (userId.getIdUsuario() != null && usuarioService.findById(userId.getIdUsuario()).isPresent()) {
            return null;
        } else {
            userId.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            userId.setFechaCreacion(LocalDateTime.now());
            return usuarioService.guardarUsuario(userId);
        }
    }

    @PutMapping("/update_usuario/{id}")
    public Usuario updateUser(@PathVariable("id") String usId, @RequestBody Usuario updUs) {
        Optional<Usuario> optionUser = usuarioService.findById(usId);
        if (optionUser.isPresent()) {
            Usuario user = optionUser.get();
            user.setNombre(updUs.getNombre());
            user.setApellido(updUs.getApellido());
            user.setIdStatusUsuario(updUs.getIdStatusUsuario());
            user.setIdGenero(updUs.getIdGenero());
            user.setCorreoElectronico(updUs.getCorreoElectronico());
            user.setFotografia(updUs.getFotografia());
            user.setTelefonoMovil(updUs.getTelefonoMovil());
            user.setIdStatusUsuario(updUs.getIdStatusUsuario());
            user.setPregunta(updUs.getPregunta());
            user.setRespuesta(updUs.getRespuesta());

            user.setUsuarioModificacion(updUs.getUsuarioModificacion());
            user.setFechaModificacion(updUs.getFechaModificacion());
            return usuarioService.guardarUsuario(user);
        } else {
            return null;
        }
    }

    @DeleteMapping("/delete_usuario/{uId}")
    public void deleteUser(@PathVariable("uId") String Id) {
        Optional<Usuario> uOptional = usuarioService.findById(Id);
        uOptional.ifPresent(usuarioService::deleteUsuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            boolean loginExitoso = usuarioService.validarLogin(
                    loginRequest.getIdUsuario(),
                    loginRequest.getPassword());

            if (!loginExitoso) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Credenciales inválidas");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            //Aguardamos el usuario ingresado
            LoginRequest.setUsuarioLogueado(loginRequest.getIdUsuario());
            // Buscar el usuario
            Optional<Usuario> usuarioOpt = usuarioService.findById(loginRequest.getIdUsuario());
            if (usuarioOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Usuario no encontrado después de validación exitosa");
            }

            Usuario u = usuarioOpt.get();

            // 🔹 Actualizar última fecha de ingreso
            u.setUltimaFechaIngreso(LocalDateTime.now());
            usuarioService.guardarUsuario(u); // guardar cambios en la BD

            // Respuesta
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Login exitoso");
            response.put("usuario", u);

            System.out.println("Usuario Controller se ejecuta");
            System.out.println(loginRequest.getIdUsuario());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error en el login: " + e.getMessage());
        }
    }

}
