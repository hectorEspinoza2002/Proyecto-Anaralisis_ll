package com.proyecto_analisis.alfa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entity.RoleOpcion;
import com.proyecto_analisis.alfa.model.entity.RoleOpcionId;
import com.proyecto_analisis.alfa.model.repository.RoleOpcionRepository;

@Service
public class RoleOpcionService {

   private final RoleOpcionRepository roleOpcionRepository;

   public RoleOpcionService(RoleOpcionRepository roleOpcionRepository){
    this.roleOpcionRepository = roleOpcionRepository;
   }

   public List<RoleOpcion> findAll(){
    return roleOpcionRepository.findAll();
   }

   public Optional<RoleOpcion> findById(RoleOpcionId id){
    return roleOpcionRepository.findById(id);
   }

   public RoleOpcion save(RoleOpcion roleOpcion){
    return roleOpcionRepository.save(roleOpcion);
   }

   public void delete(RoleOpcionId id){
    roleOpcionRepository.deleteById(id);
   }

   // Buscar todas las opciones que tiene un rol
   public List<RoleOpcion> findByRole(Integer idRole){
    return roleOpcionRepository.findByRole_IdRole(idRole);
   }

   // Buscar una opcion especifica de un rol
   public Optional<RoleOpcion> findByRoleAndOpcion(Integer idRole, Integer idOpcion){
    return roleOpcionRepository.findByRole_IdRoleAndOpcion_IdOpcion(idRole, idOpcion);
   }

}
