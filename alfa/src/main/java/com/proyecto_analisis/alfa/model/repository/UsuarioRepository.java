package com.proyecto_analisis.alfa.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto_analisis.alfa.model.entity.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,String>{

    List<Usuario> findByIdUsuarioAndPassword(String idUsuario, String password);

    

}
