package com.proyecto_analisis.alfa.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto_analisis.alfa.model.entity.Sucursal;

@Repository
public interface SucursalRepository extends JpaRepository<Sucursal, Integer>{

}
