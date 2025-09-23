package com.proyecto_analisis.alfa.model.repositoryf2;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto_analisis.alfa.model.entityf2.SaldoCuentaHist;
import com.proyecto_analisis.alfa.model.entityf2.SaldoCuentaHistId;

public interface SaldoCuentaHistRepository extends JpaRepository<SaldoCuentaHist, SaldoCuentaHistId>{

}

