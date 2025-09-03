package com.proyecto_analisis.alfa.controller;

//import java.util.List;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//import com.proyecto_analisis.alfa.model.entity.RoleOpcion;
//import com.proyecto_analisis.alfa.service.RoleOpcionService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class RoleOpcionController {

    /* 
    @Autowired
    private RoleOpcionService roleOpcionService;

    @GetMapping("/list_roleOp")
    public List<RoleOpcion> listarTodos() {
        return roleOpcionService.findAll();
    }
        

    /*
    @GetMapping("/list_roleOp/{id}")
    public Optional<RoleOpcion> obtenerPorId(@PathVariable Integer id) {
        return roleOpcionService.findById(id);
    }

    
       

    @DeleteMapping("delete_roleOp/{roId}")
    public void deleteRolOp(@PathVariable("roId") Integer Id){
        Optional<RoleOpcion> rolOpOption = roleOpcionService.findById(Id);
        rolOpOption.ifPresent(roleOpcionService::deleteRoleOpcion);
    }
         */

}
