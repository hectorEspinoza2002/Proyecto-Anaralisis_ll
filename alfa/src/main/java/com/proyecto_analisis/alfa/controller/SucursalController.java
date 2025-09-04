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
import com.proyecto_analisis.alfa.model.entity.Sucursal;
import com.proyecto_analisis.alfa.service.SucursalService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class SucursalController {

    @Autowired
    private SucursalService sucursalService;

    @GetMapping("/list_sucursal")
    public List<Sucursal> listarTodos() {
        return sucursalService.findAll();
    }

    @GetMapping("/list_sucursal/{id}")
    public Optional<Sucursal> obtenerPorId(@PathVariable Integer id) {
        return sucursalService.findById(id);
    }

    @PostMapping("/create_sucursal")
    public Sucursal createSucursal(@RequestBody Sucursal sucId) {
        if (sucId.getIdSucursal() != null && sucursalService.findById(sucId.getIdSucursal()).isPresent()) {
            return null;
        } else {
            //Usuario
            sucId.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            //Fecha
            sucId.setFechaCreacion(LocalDateTime.now());
            return sucursalService.guardarSucursal(sucId);
        }

    }

    @PutMapping("/update_sucursal/{id}")
    public Sucursal updateSucursal(@PathVariable("id") Integer sId, @RequestBody Sucursal updateS){
        Optional<Sucursal> optionSuc = sucursalService.findById(sId);
        if (optionSuc.isPresent()) {
            Sucursal scl = optionSuc.get();
            scl.setNombre(updateS.getNombre());
            scl.setDireccion(updateS.getDireccion());
            scl.setEmpresa(updateS.getEmpresa());
            //Actualizamos usuario
            scl.setUsuarioModificacion(LoginRequest.getUsuarioLogueado());
            //Acuatlizamos la hora
            scl.setFechaModificacion(LocalDateTime.now());
            return sucursalService.guardarSucursal(scl);
        } else {
            return null;
        }
    }

    @DeleteMapping("/delete_sucursal/{sId}")
    public void deleteSucursal(@PathVariable("sId") Integer Id){
        Optional<Sucursal> sOption = sucursalService.findById(Id);
        sOption.ifPresent(sucursalService::deleteSucursal);
    }

}
