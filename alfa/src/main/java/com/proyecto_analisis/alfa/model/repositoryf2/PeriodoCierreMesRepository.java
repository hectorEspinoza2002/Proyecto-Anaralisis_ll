package com.proyecto_analisis.alfa.model.repositoryf2;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto_analisis.alfa.model.entityf2.PeriodoCierreMes;
import com.proyecto_analisis.alfa.model.entityf2.PeriodoCierreMesId;

@Repository
public interface PeriodoCierreMesRepository extends JpaRepository<PeriodoCierreMes, PeriodoCierreMesId>{

}
