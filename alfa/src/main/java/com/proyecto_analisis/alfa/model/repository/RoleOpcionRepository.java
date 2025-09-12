package com.proyecto_analisis.alfa.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto_analisis.alfa.model.entity.RoleOpcion;
import com.proyecto_analisis.alfa.model.entity.RoleOpcionId;

@Repository
public interface RoleOpcionRepository extends JpaRepository<RoleOpcion, RoleOpcionId>{

    //Buscar todas las opciones asignadas a un rol
    List<RoleOpcion> findByRole_IdRole(Integer idRole);

    //Buscar si una opcion especifica pertenece a un rol
    Optional<RoleOpcion> findByRole_IdRoleAndOpcion_IdOpcion(Integer idRole, Integer idOpcion);

    

}
