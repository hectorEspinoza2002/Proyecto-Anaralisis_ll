package com.proyecto_analisis.alfa.controllerf2;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto_analisis.alfa.model.entity.LoginRequest;
import com.proyecto_analisis.alfa.model.entityf2.Persona;
import com.proyecto_analisis.alfa.servicef2.PersonaService;

@RestController
@CrossOrigin(origins = { "http://localhost:5500", "http://localhost:9090" })
public class PersonaController {

    @Autowired
    private PersonaService personaService;

    @GetMapping("/list_personas")
    public List<Persona> listarTodos() {
        return personaService.findAll();
    }

    @GetMapping("/list_persona/{id}")
    public Optional<Persona> obtenerPorId(@PathVariable Integer id) {
        return personaService.findById(id);
    }

    @PostMapping("/create_persona")
    public ResponseEntity<?> createPersona(@RequestBody Persona personaId) {

        personaId.setUsuarioCreacion(LoginRequest.getUsuarioLogueado());
        personaId.setFechaCreacion(LocalDateTime.now());

        Persona p = personaService.guardar(personaId);
        return ResponseEntity.ok(p);

    }

    @PutMapping("/update_persona/{id}")
    public Persona updatePer(@PathVariable("id") Integer persId, @RequestBody Persona updPers) {
        Optional<Persona> optionPers = personaService.findById(persId);
        if (optionPers.isPresent()) {
            Persona pers = optionPers.get();
            pers.setNombre(updPers.getNombre());
            pers.setApellido(updPers.getApellido());
            pers.setFechaNacimiento(updPers.getFechaNacimiento());
            pers.setGenero(updPers.getGenero());
            pers.setDireccion(updPers.getDireccion());
            pers.setTelefono(updPers.getTelefono());
            pers.setCorreoElectronico(updPers.getCorreoElectronico());
            pers.setEstadoCivil(updPers.getEstadoCivil());

            pers.setUsuarioModificacion(LoginRequest.getUsuarioLogueado());
            pers.setFechaModificacion(LocalDateTime.now());

            return personaService.guardar(pers);
        } else {
            return null;
        }
    }

    @DeleteMapping("/delete_persona/{id}")
    public void deletePers(@PathVariable("id") Integer id) {
        Optional<Persona> pOptional = personaService.findById(id);
        pOptional.ifPresent(personaService::eliminar);
    }

}
