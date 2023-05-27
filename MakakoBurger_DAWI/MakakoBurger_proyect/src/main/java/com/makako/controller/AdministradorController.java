package com.makako.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/administrador")
public class AdministradorController {

	@RequestMapping("/inicio")
	public String indexAdministrador() {
		return "indexAdmin";
	}
	
}
