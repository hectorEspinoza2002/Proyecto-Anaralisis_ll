package com.proyecto_analisis.alfa.model.repositoryf2;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto_analisis.alfa.model.entityf2.SaldoCuenta;

@Repository
public interface SaldoCuentaRepository extends JpaRepository<SaldoCuenta, Integer>{

    List<SaldoCuenta> findByPersona_IdPersona(Integer idPersona);

}
