package com.proyecto_analisis.alfa.controllerf2;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto_analisis.alfa.model.entityf2.PeriodoCierreMes;
import com.proyecto_analisis.alfa.model.entityf2.PeriodoCierreMesId;
import com.proyecto_analisis.alfa.servicef2.PeriodoCierreMesService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class PeriodoCierreMesController {

    @Autowired
    private PeriodoCierreMesService periodoCierreService;

    @GetMapping("/list_periodo_cierre_mes")
    public List<PeriodoCierreMes> listarTodos() {
        return periodoCierreService.findAll();
    }

    @GetMapping("/list_periodo_cierre_mes/{anio}/{mes}")
    public Optional<PeriodoCierreMes> buscarPorId(@PathVariable Integer anio, @PathVariable Integer mes) {
        return periodoCierreService.findById(new PeriodoCierreMesId(anio, mes));
    }

    @PostMapping("/create_periodo_cierre_mes")
    public PeriodoCierreMes createPeriodo(@RequestBody PeriodoCierreMes pcmId) {
        return periodoCierreService.guardar(pcmId);
    }

    @PutMapping("/update_periodo_cierre_mes")
    public PeriodoCierreMes updatePeriodo(@RequestBody PeriodoCierreMes pcm) {
        return periodoCierreService.guardar(pcm);
    }

    @DeleteMapping("/delete_periodo_cierre_mes/{anio}/{mes}")
    public void deletePeriodo(@PathVariable Integer anio, @PathVariable Integer mes) {
        periodoCierreService.delete(new PeriodoCierreMesId(anio, mes));
    }

    @PostMapping("/cerrar-mes/{anio}/{mes}")
    public ResponseEntity<String> cerrarMes(@PathVariable int anio, @PathVariable int mes) {
        try {
            periodoCierreService.cerrarMes(anio, mes);
            return ResponseEntity.ok(" Cierre del mes realizado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Error al realizar el cierre: " + e.getMessage());
        }
    }

}
