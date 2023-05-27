package com.makako.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/administrador")
@Controller
public class EmpleadoController {
	
	@RequestMapping("/inicio")
	public String indexAdministrador() {
		return "indexAdmin";
	}

}
