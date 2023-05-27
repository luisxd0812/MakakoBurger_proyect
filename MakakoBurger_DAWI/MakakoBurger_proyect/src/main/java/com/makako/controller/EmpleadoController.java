package com.makako.controller;

import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/index")
public class EmpleadoController {
	
	@RequestMapping("/menu")
	public String indexAdministrador() {
		return "indexAdmin";
	}

}
