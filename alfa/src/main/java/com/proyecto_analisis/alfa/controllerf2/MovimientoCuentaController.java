package com.proyecto_analisis.alfa.controllerf2;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto_analisis.alfa.model.entity.LoginRequest;
import com.proyecto_analisis.alfa.model.entityf2.MovimientoCuenta;
import com.proyecto_analisis.alfa.model.entityf2.MovimientoCuentaDTO;
import com.proyecto_analisis.alfa.servicef2.MovimientoCuentaService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class MovimientoCuentaController {

    @Autowired
    private MovimientoCuentaService movimientoService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/list_movimiento_cuenta")
    public List<MovimientoCuenta> listarTodos() {
        return movimientoService.findAll();
    }

    @GetMapping("/list_movimiento_cuenta/{id}")
    public Optional<MovimientoCuenta> obtenerPorId(@PathVariable Integer id) {
        return movimientoService.findById(id);
    }

    @PostMapping("/create_movimiento_cuenta")
    public ResponseEntity<MovimientoCuenta> create(@RequestBody MovimientoCuenta mc) {
        mc.setFechaMovimiento(LocalDateTime.now());
        mc.setFechaCreacion(LocalDateTime.now());
        mc.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
        //MovimientoCuenta saved = movimientoService.guardar(mc);
        MovimientoCuenta saved = movimientoService.registrarMovimiento(mc);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/update_movimiento_cuenta/{id}")
    public ResponseEntity<MovimientoCuenta> updateMovimientoC(
            @PathVariable Integer id,
            @RequestBody MovimientoCuenta updateMc) {
        Optional<MovimientoCuenta> mcOptional = movimientoService.findById(id);

        if (mcOptional.isPresent()) {
            MovimientoCuenta mc = mcOptional.get();

            mc.setValorMovimiento(updateMc.getValorMovimiento());
            mc.setValorMovimientoPagado(updateMc.getValorMovimientoPagado());
            mc.setDescripcion(updateMc.getDescripcion());
            mc.setFechaMovimiento(updateMc.getFechaMovimiento());
            mc.setGeneradoAutomaticamente(updateMc.isGeneradoAutomaticamente());
            mc.setFechaModificacion(LocalDateTime.now());
            mc.setUsuarioModificacion(LoginRequest.getUsuarioLogueado());

            MovimientoCuenta upted = movimientoService.guardar(mc);
            return ResponseEntity.ok(upted);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete_movimiento_cuenta/{id}")
    public ResponseEntity<Void> deleteMovimiento(@PathVariable Integer id) {
        Optional<MovimientoCuenta> mcOptional = movimientoService.findById(id);
        if (mcOptional.isPresent()) {
            movimientoService.delete(mcOptional.get());
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/movimientos/{idCuenta}")
public ResponseEntity<List<MovimientoCuentaDTO>> obtenerMovimientosPorCuenta(@PathVariable int idCuenta) {
    String sql = """
        SELECT 
            mc.IdMovimientoCuenta,
            mc.FechaMovimiento,
            tmc.Nombre AS TipoMovimiento,
            mc.Descripcion,
            CASE WHEN tmc.OperacionCuentaCorriente = 1 THEN mc.ValorMovimiento ELSE 0 END AS Cargos,
            CASE WHEN tmc.OperacionCuentaCorriente = 2 THEN mc.ValorMovimiento ELSE 0 END AS Abonos
        FROM MOVIMIENTO_CUENTA mc
        INNER JOIN TIPO_MOVIMIENTO_CXC tmc ON mc.IdTipoMovimientoCXC = tmc.IdTipoMovimientoCXC
        WHERE mc.IdSaldoCuenta = ?
        ORDER BY mc.FechaMovimiento ASC
    """;

    List<MovimientoCuentaDTO> movimientos = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(MovimientoCuentaDTO.class), idCuenta);
    return ResponseEntity.ok(movimientos);
}


    

}
