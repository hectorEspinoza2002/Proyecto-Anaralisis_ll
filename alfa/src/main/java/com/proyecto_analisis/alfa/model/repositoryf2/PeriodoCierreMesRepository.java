package com.proyecto_analisis.alfa.model.repositoryf2;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto_analisis.alfa.model.entityf2.PeriodoCierreMes;
import com.proyecto_analisis.alfa.model.entityf2.PeriodoCierreMesId;

@Repository
public interface PeriodoCierreMesRepository extends JpaRepository<PeriodoCierreMes, PeriodoCierreMesId>{

    // Buscar periodos abiertos
    List<PeriodoCierreMes> findByFechaCierreIsNull();

    // Buscar por año
    List<PeriodoCierreMes> findById_Anio(Integer anio);

}
