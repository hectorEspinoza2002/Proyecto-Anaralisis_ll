package com.proyecto_analisis.alfa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entity.Menu;
import com.proyecto_analisis.alfa.model.repository.MenuRepository;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;
    
    public List<Menu> findAll() {
        return menuRepository.findAll();
    }
    
    public Optional<Menu> findById(Integer id) {
        return menuRepository.findById(id);
    }

    public Menu guardarMenu(Menu m){
        return menuRepository.save(m);
    }

    public void deleteMenu(Menu m){
        menuRepository.delete(m);
    }

}
