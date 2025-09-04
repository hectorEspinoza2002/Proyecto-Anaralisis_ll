package com.proyecto_analisis.alfa.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class LoginController {
    
    /*
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
        List<Usuario> usuarios = usuarioRepo.findByIdUsuarioAndPassword(request.getIdUsuario(), request.getPassword());

        if (!usuarios.isEmpty()) {
            Usuario usuario = usuarios.get(0);
            //Acuatlizamos la hora
            usuario.setUltimaFechaIngreso(LocalDateTime.now());
            usuarioRepo.save(usuario);
            System.out.println("Login Controller se ejecuta");
            return ResponseEntity.ok(new LoginResponseDTO(true, "Login exitoso", usuario.getIdUsuario()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponseDTO(false, "Usuario o contraseña incorrectos", null));
        }
    }
         */

}
