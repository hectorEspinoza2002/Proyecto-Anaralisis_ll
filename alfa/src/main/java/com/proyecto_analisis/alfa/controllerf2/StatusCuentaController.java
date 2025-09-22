package com.proyecto_analisis.alfa.controllerf2;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto_analisis.alfa.model.entity.LoginRequest;
import com.proyecto_analisis.alfa.model.entityf2.StatusCuenta;
import com.proyecto_analisis.alfa.servicef2.StatusCuentaService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class StatusCuentaController {

    @Autowired
    private StatusCuentaService statusCuentaService;

    @GetMapping("/list_status_cuenta")
    public List<StatusCuenta> listarTodos(){
        return statusCuentaService.findAll();
    }

    @GetMapping("/list_status_cuenta/{id}")
    public Optional<StatusCuenta> obtenerPorId(@PathVariable Integer id){
        return statusCuentaService.findById(id);
    }

    @PostMapping("/create_status_cuenta")
    public StatusCuenta createStatusCuenta(@RequestBody StatusCuenta statusId){
        if (statusId.getIdStatusCuenta() != null && statusCuentaService.findById(statusId.getIdStatusCuenta()).isPresent()) {
            return null;
        } else {
            statusId.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
            statusId.setFechaCreacion(LocalDateTime.now());
            return statusCuentaService.guardar(statusId);
        }
    }

    @PutMapping("/update_status_cuenta/{id}")
    public StatusCuenta updateCuenta(@PathVariable("id") Integer statusId, @RequestBody StatusCuenta updateSC){
       Optional<StatusCuenta> optionalCS = statusCuentaService.findById(statusId) ;
       if (optionalCS.isPresent()) {
        StatusCuenta sc = optionalCS.get();
        sc.setNombre(updateSC.getNombre());
        sc.setUsuarioModificacion(LoginRequest.getUsuarioLogueado());
        sc.setFechaModificacion(LocalDateTime.now());
        return statusCuentaService.guardar(sc);
       } else {
        return null;
       }
    }

    @DeleteMapping("/delete_status_cuenta/{id}")
    public void deleteStatus(@PathVariable("id") Integer scId){
        Optional<StatusCuenta> statusOption = statusCuentaService.findById(scId);
        statusOption.ifPresent(statusCuentaService::eliminar);
    }

}
