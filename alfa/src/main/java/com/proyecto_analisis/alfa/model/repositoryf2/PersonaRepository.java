package com.proyecto_analisis.alfa.model.repositoryf2;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto_analisis.alfa.model.entityf2.Persona;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Integer>{

}
