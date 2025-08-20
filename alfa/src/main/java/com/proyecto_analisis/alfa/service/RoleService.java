package com.proyecto_analisis.alfa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entity.Role;
import com.proyecto_analisis.alfa.model.repository.RoleRepository;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roRepo){
        this.roleRepository = roRepo;
    }

    public List<Role> getAllRol(){
        return (List<Role>) roleRepository.findAll();
    }

    public Optional<Role> findById(Integer id){
        return roleRepository.findById(id);
    }

    public Role saveRole(Role rolId){
        return roleRepository.save(rolId);
    }

    public void deleteRole(Role roleId){
        roleRepository.delete(roleId);
    }

}
