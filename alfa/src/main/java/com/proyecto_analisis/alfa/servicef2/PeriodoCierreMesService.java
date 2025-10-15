package com.proyecto_analisis.alfa.servicef2;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entityf2.PeriodoCierreMes;
import com.proyecto_analisis.alfa.model.entityf2.PeriodoCierreMesId;
import com.proyecto_analisis.alfa.model.repositoryf2.PeriodoCierreMesRepository;

@Service
public class PeriodoCierreMesService {

    private final PeriodoCierreMesRepository periodoRepo;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public PeriodoCierreMesService(PeriodoCierreMesRepository pcRepo) {
        this.periodoRepo = pcRepo;
    }

    public List<PeriodoCierreMes> findAll() {
        return periodoRepo.findAll();
    }

    public Optional<PeriodoCierreMes> findById(PeriodoCierreMesId id) {
        return periodoRepo.findById(id);
    }

    public PeriodoCierreMes guardar(PeriodoCierreMes pcm) {
        return periodoRepo.save(pcm);
    }

    public void delete(PeriodoCierreMesId id) {
        periodoRepo.deleteById(id);
    }

    public void cerrarMes(int anio, int mes) {
    // 1️⃣ Copiar datos a SALDO_CUENTA_HIST
    String insertarHist = """
        INSERT INTO SALDO_CUENTA_HIST (
            Anio, Mes, IdSaldoCuenta, IdPersona, IdStatusCuenta, IdTipoSaldoCuenta,
            SaldoAnterior, Debitos, Creditos, FechaCreacion, UsuarioCreacion,
            FechaModificacion, UsuarioModificacion
        )
        SELECT ?, ?, IdSaldoCuenta, IdPersona, IdStatusCuenta, IdTipoSaldoCuenta,
               (SaldoAnterior + Debitos - Creditos), Debitos, Creditos,
               FechaCreacion, UsuarioCreacion, FechaModificacion, UsuarioModificacion
        FROM SALDO_CUENTA
    """;
    jdbcTemplate.update(insertarHist, anio, mes);

    // 2️⃣ Actualizar SALDO_CUENTA (reiniciar débitos y créditos)
    String actualizarSaldos = """
        UPDATE SALDO_CUENTA
        SET SaldoAnterior = (SaldoAnterior + Debitos - Creditos),
            Debitos = 0.00,
            Creditos = 0.00,
            FechaCreacion = FechaCreacion, 
            UsuarioCreacion = UsuarioCreacion, 
            FechaModificacion = FechaModificacion, 
            UsuarioModificacion = UsuarioModificacion
    """;
    jdbcTemplate.update(actualizarSaldos);

    // 3️⃣ Actualizar PERIODO_CIERRE_MES con FechaCierre
    String cerrarPeriodo = """
        UPDATE PERIODO_CIERRE_MES
        SET FechaCierre = NOW()
        WHERE Anio = ? AND Mes = ?
    """;
    jdbcTemplate.update(cerrarPeriodo, anio, mes);
}


    /*
    public void cerrarMes(int anio, int mes) {
        // 1️⃣ Copiar datos a SALDO_CUENTA_HIST
        String insertarHist = """
                    INSERT INTO SALDO_CUENTA_HIST (
                        Anio, Mes, IdSaldoCuenta, IdPersona, IdStatusCuenta, IdTipoSaldoCuenta,
                        SaldoAnterior, Debitos, Creditos, FechaCreacion, UsuarioCreacion,
                        FechaModificacion, UsuarioModificacion
                    )
                    SELECT ?, ?, IdSaldoCuenta, IdPersona, IdStatusCuenta, IdTipoSaldoCuenta,
                           (SaldoAnterior + Creditos - Debitos), Debitos, Creditos,
                           NOW(), 'sistema', NOW(), 'sistema'
                    FROM SALDO_CUENTA
                """;
        jdbcTemplate.update(insertarHist, anio, mes);

        // 2️⃣ Actualizar SALDO_CUENTA (reiniciar débitos y créditos)
        String actualizarSaldos = """
                    UPDATE SALDO_CUENTA
                    SET SaldoAnterior = (SaldoAnterior + Creditos - Debitos),
                        Debitos = 0.00,
                        Creditos = 0.00
                """;
        jdbcTemplate.update(actualizarSaldos);

        // 3️⃣ Actualizar PERIODO_CIERRE_MES con FechaCierre
        String cerrarPeriodo = """
                    UPDATE PERIODO_CIERRE_MES
                    SET FechaCierre = NOW()
                    WHERE Anio = ? AND Mes = ?
                """;
        jdbcTemplate.update(cerrarPeriodo, anio, mes);
    }
         */

}
