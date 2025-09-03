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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.proyecto_analisis.alfa.model.entity.Genero;
import com.proyecto_analisis.alfa.model.entity.LoginRequest;
import com.proyecto_analisis.alfa.model.entity.Role;
import com.proyecto_analisis.alfa.model.entity.StatusUsuario;
import com.proyecto_analisis.alfa.model.entity.Sucursal;
import com.proyecto_analisis.alfa.model.entity.Usuario;
import com.proyecto_analisis.alfa.service.GeneroService;
import com.proyecto_analisis.alfa.service.RoleService;
import com.proyecto_analisis.alfa.service.StatusUsuarioService;
import com.proyecto_analisis.alfa.service.SucursalService;
import com.proyecto_analisis.alfa.service.UsuarioService;

@RestController
@RequestMapping("/api") // Agregamos un prefijo base para todas las rutas
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private GeneroService generoService;

    @Autowired
    private StatusUsuarioService statusUsuarioService;

    @Autowired
    private SucursalService sucursalService;

    @Autowired
    private RoleService roleService;

    // Endpoint de login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            boolean loginExitoso = usuarioService.validarLogin(
                loginRequest.getIdUsuario(), 
                loginRequest.getPassword()
            );
            
            if (loginExitoso) {
                LoginRequest.setUsuarioLogueado(loginRequest.getIdUsuario());
                // Obtener información completa del usuario
                Optional<Usuario> usuarioOpt = usuarioService.findById(loginRequest.getIdUsuario());
                if (usuarioOpt.isPresent()) {
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", true);
                    response.put("message", "Login exitoso");
                    response.put("usuario", usuarioOpt.get());
                    System.out.println("Usuario Controller se ejecuta");
                    return ResponseEntity.ok(response);
                }
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Usuario no encontrado después de validación exitosa");
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Credenciales inválidas");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error en el login: " + e.getMessage());
        }
    }

    // Endpoint para obtener reglas de empresa por sucursal
    @GetMapping("/reglas-empresa/{idSucursal}")
    public ResponseEntity<?> getReglasEmpresa(@PathVariable Integer idSucursal) {
        try {
            // Buscar la sucursal
            Optional<Sucursal> sucursalOpt = sucursalService.findById(idSucursal);
            if (sucursalOpt.isPresent()) {
                Sucursal sucursal = sucursalOpt.get();
                if (sucursal.getEmpresa() != null) {
                    // Devolver solo las reglas de password de la empresa
                    Map<String, Object> reglas = new HashMap<>();
                    reglas.put("passwordLargo", sucursal.getEmpresa().getPasswordLargo());
                    reglas.put("passwordCantidadMayusculas", sucursal.getEmpresa().getPasswordCantidadMayusculas());
                    reglas.put("passwordCantidadMinusculas", sucursal.getEmpresa().getPasswordCantidadMinusculas());
                    reglas.put("passwordCantidadNumeros", sucursal.getEmpresa().getPasswordCantidadNumeros());
                    reglas.put("passwordCantidadCaracteresEspeciales", sucursal.getEmpresa().getPasswordCantidadCaracteresEspeciales());
                    return ResponseEntity.ok(reglas);
                }
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al obtener reglas: " + e.getMessage());
        }
    }

    // Endpoints para obtener datos maestros
    

    @GetMapping("/list_generos")
    public List<Genero> listGen() {
        return generoService.findAll();
    }

    @GetMapping("/list_status_usuarios")
    public ResponseEntity<List<StatusUsuario>> getAllStatusUsuarios() {
        try {
            List<StatusUsuario> statusUsuarios = statusUsuarioService.findAll();
            return ResponseEntity.ok(statusUsuarios);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/list_sucursal")
    public ResponseEntity<List<Sucursal>> getAllSucursales() {
        try {
            List<Sucursal> sucursales = sucursalService.findAll();
            return ResponseEntity.ok(sucursales);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/list_roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        try {
            List<Role> roles = roleService.findAll();
            return ResponseEntity.ok(roles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Tus endpoints existentes (ajustados para usar el prefijo /api)
    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> listarTodos() {
        try {
            List<Usuario> usuarios = usuarioService.getAllUsuarios();
            return ResponseEntity.ok(usuarios);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable String id) {
        try {
            Optional<Usuario> usuario = usuarioService.findById(id);
            return usuario.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /*
    @PostMapping("/create_usuario")
    public Usuario createUsuario(@RequestBody Usuario userId) {
        //String idEm = String.valueOf(empId.getIdEmpresa());


        if (userId.getIdUsuario() != null && usuarioService.findById(userId.getIdUsuario()).isPresent()) {
            return null;
        } else {
            //Usuario
            userId.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            //Fecha
            userId.setFechaCreacion(LocalDateTime.now());
            return usuarioService.guardarUsuario(userId);
        }    }
 */
    
    @PostMapping("/create_usuario")
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) {
        try {
            if (usuario.getIdUsuario() != null && 
                usuarioService.findById(usuario.getIdUsuario()).isPresent()) {
                return ResponseEntity.badRequest()
                    .body("El usuario con ID " + usuario.getIdUsuario() + " ya existe");
            }
            //Aguardamos el usuario
            usuario.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            //Aguardamos la fecha
            usuario.setFechaCreacion(LocalDateTime.now());
            Usuario usuarioCreado = usuarioService.save(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioCreado);
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al crear usuario: " + e.getMessage());
        }
    }
        

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable String id) {
        try {
            Optional<Usuario> usuarioOptional = usuarioService.findById(id);
            if (usuarioOptional.isPresent()) {
                usuarioService.delete(usuarioOptional.get());
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al eliminar usuario: " + e.getMessage());
        }
    }

}
