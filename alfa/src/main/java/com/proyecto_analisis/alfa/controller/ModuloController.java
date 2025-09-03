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
import com.proyecto_analisis.alfa.model.entity.Modulo;
import com.proyecto_analisis.alfa.service.ModuloService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class ModuloController {

    @Autowired
    private ModuloService modService;

    @GetMapping("/list_modulos")
    public List<Modulo> listarTodos() {
        return modService.findAll();
    }

    @GetMapping("/list_modulos/{id}")
    public Optional<Modulo> obtenerPorId(@PathVariable Integer id) {
        return modService.findById(id);
    }

    @PostMapping("/create_modulo")
    public Modulo createModulo(@RequestBody Modulo mId) {
        if (mId.getIdModulo() != null && modService.findById(mId.getIdModulo()).isPresent()) {
            return null;
        } else {
            //Usuario
            mId.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            //Fecha
            mId.setFechaCreacion(LocalDateTime.now());
            return modService.guardarModulo(mId);
        }

    }

    @PutMapping("/update_modulo/{idg}")
    public Modulo updateModulo(@PathVariable("idg") Integer modId, @RequestBody Modulo updateModul){
        Optional<Modulo> optionM = modService.findById(modId);
        if (optionM.isPresent()) {
            Modulo gnr = optionM.get();
            gnr.setNombre(updateModul.getNombre());
            gnr.setOrdenMenu(updateModul.getOrdenMenu());

            //Actualizamos usuario
            gnr.setUsuarioModificacion(LoginRequest.getUsuarioLogueado());
            //Acuatlizamos la hora
            gnr.setFechaModificacion(LocalDateTime.now());
            return modService.guardarModulo(gnr);
        } else {
            return null;
        }
    }

    @DeleteMapping("delete_modulos/{mId}")
    public void deleteModulo(@PathVariable("mId") Integer Id){
        Optional<Modulo> genOption = modService.findById(Id);
        genOption.ifPresent(modService::deleteModulo);
    }


}
