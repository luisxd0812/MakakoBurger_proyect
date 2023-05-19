package com.makako.services;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.makako.controller.dto.UsuarioRegistroDTO;
import com.makako.entity.Usuario;


public interface UsuarioServicio extends UserDetailsService{

	public Usuario guardar(UsuarioRegistroDTO registroDTO);
	
	public List<Usuario> listarUsuarios();
	
}
