package com.proyecto_analisis.alfa.controller;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.proyecto_analisis.alfa.service.RoleOpcionService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class RoleOpcionController {

    @Autowired
    private RoleOpcionService roleOpcionService;

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
    public RoleOpcion createRoleOpcion(@RequestBody RoleOpcion ro){
        RoleOpcionId id = new RoleOpcionId(ro.getRole().getIdRole(), ro.getOpcion().getIdOpcion());

        if (roleOpcionService.findById(id).isPresent()) {
            return null;
        } else {
            ro.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            ro.setFechaCreacion(LocalDateTime.now());
            return roleOpcionService.save(ro);
        }
    }  

    @PutMapping("/update_role_opcion/{idRole}/{idOpcion}")
    public RoleOpcion updateRoleOpcion(@PathVariable Integer idRole, @PathVariable Integer idOpcion, @RequestBody RoleOpcion updateRo) {
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

            return roleOpcionService.save(ro);
            //return ResponseEntity.ok(roleOpcionService.save(ro));
        }
        return null;
        //return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete_role_opcion/{idRole}/{idOpcion}")
    public void deleteRoleOpcion(@PathVariable Integer idRole, @PathVariable Integer idOpcion){
        RoleOpcionId id = new RoleOpcionId(idRole, idOpcion);
        Optional<RoleOpcion> roOption = roleOpcionService.findById(id);
        roOption.ifPresent(r -> roleOpcionService.delete(id));
    }

    @GetMapping("/list_role_opciones/role/{idRole}")
    public List<RoleOpcion> listarPorRol(@PathVariable Integer idRole){
        return roleOpcionService.findByRole(idRole);
    }

    @GetMapping("/list_role_opciones/role/{idrole}/opcion/{idOpcion}")
    public Optional<RoleOpcion> listarPoorRolYOpcion(@PathVariable Integer idRole, @PathVariable Integer idOpcion) {
        return roleOpcionService.findByRoleAndOpcion(idRole, idOpcion);
    }
}
