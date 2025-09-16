package com.proyecto_analisis.alfa.controller;

import java.time.LocalDateTime;
import java.util.List;
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
import com.proyecto_analisis.alfa.model.entity.RoleOpcion;
import com.proyecto_analisis.alfa.model.entity.RoleOpcionId;
import com.proyecto_analisis.alfa.model.entity.Usuario;
import com.proyecto_analisis.alfa.service.RoleOpcionService;
import com.proyecto_analisis.alfa.service.UsuarioService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class RoleOpcionController {

    @Autowired
    private RoleOpcionService roleOpcionService;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/list_role_opciones")
    public List<RoleOpcion> listarTodos() {
        return roleOpcionService.findAll();
    }

    @GetMapping("/list_role_opciones/{idRole}/{idOpcion}")
    public Optional<RoleOpcion> obtenerPorId(@PathVariable Integer idRole, @PathVariable Integer idOpcion) {
        RoleOpcionId id = new RoleOpcionId(idRole, idOpcion);
        return roleOpcionService.findById(id);
    }

    @PostMapping("/create_role_opcion")
    public ResponseEntity<?> createRoleOpcion(@RequestBody RoleOpcion ro) {
        try {
            RoleOpcionId id = new RoleOpcionId(ro.getRole().getIdRole(), ro.getOpcion().getIdOpcion());

            if (roleOpcionService.findById(id).isPresent()) {
                return ResponseEntity.badRequest().body("Ya existe esta asignación");
            }

            ro.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            ro.setFechaCreacion(LocalDateTime.now());

            RoleOpcion saved = roleOpcionService.save(ro);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    /*
     * @PostMapping("/create_role_opcion")
     * public RoleOpcion createRoleOpcion(@RequestBody RoleOpcion ro){
     * RoleOpcionId id = new RoleOpcionId(ro.getRole().getIdRole(),
     * ro.getOpcion().getIdOpcion());
     * 
     * if (roleOpcionService.findById(id).isPresent()) {
     * return null;
     * } else {
     * ro.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
     * ro.setFechaCreacion(LocalDateTime.now());
     * return roleOpcionService.save(ro);
     * }
     * }
     */

    @PutMapping("/update_role_opcion/{idRole}/{idOpcion}")
    public ResponseEntity<?> updateRoleOpcion(@PathVariable Integer idRole, @PathVariable Integer idOpcion,
            @RequestBody RoleOpcion updateRo) {
        RoleOpcionId id = new RoleOpcionId(idRole, idOpcion);
        Optional<RoleOpcion> roOptional = roleOpcionService.findById(id);

        if (roOptional.isPresent()) {
            RoleOpcion ro = roOptional.get();

            ro.setAlta(updateRo.getAlta());
            ro.setBaja(updateRo.getBaja());
            ro.setCambio(updateRo.getCambio());
            ro.setImprimir(updateRo.getImprimir());
            ro.setExportar(updateRo.getExportar());
            ro.setUsuarioModificacion(LoginRequest.getUsuarioLogueado());
            ro.setFechaModificacion(LocalDateTime.now());

            roleOpcionService.save(ro);

            List<RoleOpcion> permisosActualizados = roleOpcionService.findByRole(idRole);
            return ResponseEntity.ok(permisosActualizados);

            // return ResponseEntity.ok(roleOpcionService.save(ro));
        }
        //return null;
         return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete_role_opcion/{idRole}/{idOpcion}")
    public void deleteRoleOpcion(@PathVariable Integer idRole, @PathVariable Integer idOpcion) {
        RoleOpcionId id = new RoleOpcionId(idRole, idOpcion);
        Optional<RoleOpcion> roOption = roleOpcionService.findById(id);
        roOption.ifPresent(r -> roleOpcionService.delete(id));
    }

    @GetMapping("/list_role_opciones/role/{idRole}")
    public List<RoleOpcion> listarPorRol(@PathVariable Integer idRole) {
        return roleOpcionService.findByRole(idRole);
    }

    @GetMapping("/list_role_opciones/role/{idRole}/opcion/{idOpcion}")
    public Optional<RoleOpcion> listarPoorRolYOpcion(@PathVariable Integer idRole, @PathVariable Integer idOpcion) {
        return roleOpcionService.findByRoleAndOpcion(idRole, idOpcion);
    }

    
    @GetMapping("/permisos/{idUsuario}")
    public ResponseEntity<?> getPermisosPorUsuario(@PathVariable String idUsuario) {
        try {
            // 🔹 Obtener usuario
            Optional<Usuario> usuarioOpt = usuarioService.findById(idUsuario);
            if (usuarioOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }

            Usuario usuario = usuarioOpt.get();
            Integer idRole = usuario.getIdRole().getIdRole();

            // 🔹 Obtener permisos por rol
            List<RoleOpcion> permisos = roleOpcionService.findByRole(idRole);

            return ResponseEntity.ok(permisos);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener permisos: " + e.getMessage());
        }
    }
         

}
