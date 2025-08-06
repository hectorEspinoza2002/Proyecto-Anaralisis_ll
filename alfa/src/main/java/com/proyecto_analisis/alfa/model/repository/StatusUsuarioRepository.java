package com.proyecto_analisis.alfa.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto_analisis.alfa.model.entity.StatusUsuario;

@Repository
public interface StatusUsuarioRepository extends JpaRepository<StatusUsuario,Integer>{

}
