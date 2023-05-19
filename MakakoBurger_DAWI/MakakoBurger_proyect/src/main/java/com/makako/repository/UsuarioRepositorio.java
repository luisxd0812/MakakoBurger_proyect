package com.makako.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.makako.entity.Usuario;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Long>{

	public Usuario findByEmail(String email);
	
}
