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
import com.proyecto_analisis.alfa.model.entity.Menu;
import com.proyecto_analisis.alfa.service.MenuService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping("/list_menus")
    public List<Menu> listarTodos() {
        return menuService.findAll();
    }

    @GetMapping("/list_menus/{id}")
    public Optional<Menu> obtenerPorId(@PathVariable Integer id) {
        return menuService.findById(id);
    }

    @PostMapping("/create_menu")
    public Menu createMenu(@RequestBody Menu mId) {
        if (mId.getIdMenu() != null && menuService.findById(mId.getIdMenu()).isPresent()) {
            return null;
        } else {
            //Usuario
            mId.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            //Fecha
            mId.setFechaCreacion(LocalDateTime.now());
            return menuService.guardarMenu(mId);
        }

    }

    @PutMapping("/update_menu/{idg}")
    public Menu updateMenu(@PathVariable Integer menId, @RequestBody Menu updateMen){
        Optional<Menu> optionMenu = menuService.findById(menId);
        if (optionMenu.isPresent()) {
            Menu gnr = optionMenu.get();
            //Actualizamos usuario
            gnr.setUsuarioModificacion(LoginRequest.getUsuarioLogueado());
            //Acuatlizamos la hora
            gnr.setFechaModificacion(LocalDateTime.now());
            return menuService.guardarMenu(gnr);
        } else {
            return null;
        }
    }

    @DeleteMapping("delete_menus/{mId}")
    public void deleteMenu(@PathVariable("mId") Integer Id){
        Optional<Menu> menOption = menuService.findById(Id);
        menOption.ifPresent(menuService::deleteMenu);
    }

}
