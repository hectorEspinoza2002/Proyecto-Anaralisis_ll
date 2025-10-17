package com.proyecto_analisis.alfa.servicef2;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.proyecto_analisis.alfa.model.entityf2.MovimientoCuenta;
import com.proyecto_analisis.alfa.model.repositoryf2.MovimientoCuentaRepository;

import jakarta.transaction.Transactional;

@Service
public class MovimientoCuentaService {

    private final MovimientoCuentaRepository movimientoRepo;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public MovimientoCuentaService(MovimientoCuentaRepository mRepo) {
        this.movimientoRepo = mRepo;
    }

    public List<MovimientoCuenta> findAll() {
        return movimientoRepo.findAll();
    }

    public Optional<MovimientoCuenta> findById(Integer id) {
        return movimientoRepo.findById(id);
    }

    public MovimientoCuenta guardar(MovimientoCuenta mc) {
        return movimientoRepo.save(mc);
    }

    public void delete(MovimientoCuenta mCuenta) {
        movimientoRepo.delete(mCuenta);
    }

    @Transactional
    public MovimientoCuenta registrarMovimiento(MovimientoCuenta movimiento) {

        try {

            System.out.println("🟢 Registrando movimiento...");
            System.out.println("➡️ IdSaldoCuenta: " + movimiento.getSaldoCuenta().getIdSaldoCuenta());
            System.out.println("➡️ IdTipoMovimientoCXC: " + movimiento.getTipoMovimientoCXC().getIdTipoMovimientoCXC());
            System.out.println("➡️ ValorMovimiento: " + movimiento.getValorMovimiento());

            // 1️⃣ Validar cuenta activa
            String estado = jdbcTemplate.queryForObject(
                    "SELECT sc.IdStatusCuenta FROM SALDO_CUENTA sc WHERE sc.IdSaldoCuenta = ?",
                    String.class,
                    movimiento.getSaldoCuenta().getIdSaldoCuenta());
            System.out.println("🔹 Estado cuenta: " + estado);

            /*
            if (!estado.equalsIgnoreCase("Cuenta Activa")) {
                throw new RuntimeException("La cuenta no está activa y no puede recibir movimientos.");
            }
                 */

            // 2️⃣ Obtener tipo de movimiento (para saber si suma o resta)
            int operacion = jdbcTemplate.queryForObject(
                    "SELECT OperacionCuentaCorriente FROM TIPO_MOVIMIENTO_CXC WHERE IdTipoMovimientoCXC = ?",
                    Integer.class,
                    movimiento.getTipoMovimientoCXC().getIdTipoMovimientoCXC());
            System.out.println("🔹 Tipo de operación: " + operacion);

            // 3️⃣ Insertar el movimiento
            String insertMovimiento = """
                        INSERT INTO MOVIMIENTO_CUENTA (
                            IdSaldoCuenta, IdTipoMovimientoCXC, FechaMovimiento,
                            ValorMovimiento, ValorMovimientoPagado, GeneradoAutomaticamente,
                            Descripcion, FechaCreacion, UsuarioCreacion
                        )
                        VALUES (?, ?, NOW(), ?, 0.00, ?, ?, NOW(), UsuarioCreacion)
                    """;
            jdbcTemplate.update(insertMovimiento,
                    movimiento.getSaldoCuenta().getIdSaldoCuenta(),
                    movimiento.getTipoMovimientoCXC().getIdTipoMovimientoCXC(),
                    movimiento.getValorMovimiento(),
                    movimiento.isGeneradoAutomaticamente(),
                    movimiento.getDescripcion());

            // 4️⃣ Actualizar saldo de la cuenta
            String actualizarSaldo;
            if (operacion == 1) { // CARGO → aumenta Débito
                actualizarSaldo = """
                            UPDATE SALDO_CUENTA
                            SET Debitos = Debitos + ?,
                                FechaModificacion = NOW(),
                                UsuarioModificacion = UsuarioCreacion
                            WHERE IdSaldoCuenta = ?
                        """;
            } else { // ABONO → aumenta Crédito
                actualizarSaldo = """
                            UPDATE SALDO_CUENTA
                            SET Creditos = Creditos + ?,
                                FechaModificacion = NOW(),
                                UsuarioModificacion = UsuarioCreacion
                            WHERE IdSaldoCuenta = ?
                        """;
            }

            jdbcTemplate.update(actualizarSaldo,
                    movimiento.getValorMovimiento(),
                    movimiento.getSaldoCuenta().getIdSaldoCuenta());

            // 5️⃣ Retornar movimiento (puedes consultarlo si deseas)
            return movimiento;
        } catch (Exception e) {
            System.err.println("❌ Error en registrarMovimiento: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error al registrar el movimiento: " + e.getMessage());
        }
    }

}
