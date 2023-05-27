package com.makako.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.makako.services.CargoService;
import com.makako.services.EmpleadoService;

@RequestMapping("/administrador")
@Controller
public class EmpleadoController {
	

	
	@Autowired
	private EmpleadoService servEmp;
	
	@Autowired
	private CargoService servCar;
	
	
	
	@RequestMapping("/mantenimientoEmpleado")
	public String listaEmpleado(Model model) {
		model.addAttribute("cargos", servCar.listarCArgos());
		model.addAttribute("empleados", servEmp.listarTodos());
		return "mantenimientoEmpleado";
	}

}
