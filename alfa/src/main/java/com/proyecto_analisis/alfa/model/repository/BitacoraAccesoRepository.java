package com.proyecto_analisis.alfa.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto_analisis.alfa.model.entity.BitacoraAcceso;

@Repository
public interface BitacoraAccesoRepository extends JpaRepository<BitacoraAcceso, Integer>{

}
