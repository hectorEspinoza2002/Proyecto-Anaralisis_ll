package com.proyecto_analisis.alfa.controller;

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

import com.proyecto_analisis.alfa.model.entity.Role;
import com.proyecto_analisis.alfa.service.RoleService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "https://localhost:9090" })
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping("/list_roles")
    public List<Role> getAllRol(){
        return roleService.getAllRol();
    }

    @GetMapping("/list_roles/{id}")
    public Optional<Role> obtenerPorId(@PathVariable Integer id) {
        return roleService.findById(id);
    }

    @PostMapping("/create_role")
    public Role createRole(@RequestBody Role rId) {
        if (rId.getIdRole() != null && roleService.findById(rId.getIdRole()).isPresent()) {
            return null;
        } else {
            return roleService.saveRole(rId);
        }

    }

    @PutMapping("/update_role/{rId}")
    public Role updateRole(@PathVariable Integer rId,@RequestBody Role updateR){

        Optional<Role> rolOptional = roleService.findById(rId);
        if (rolOptional.isPresent()) {
            Role rl = rolOptional.get();
            rl.setNombre(updateR.getNombre());
            return roleService.saveRole(rl);
        } else {
            return null;
        }
    }

    @DeleteMapping("/delete_role/{id}")
    public void deleteRole(@PathVariable("id") Integer rolId){
        Optional<Role> roOption = roleService.findById(rolId);
        roOption.ifPresent(roleService::deleteRole);
    }

}
