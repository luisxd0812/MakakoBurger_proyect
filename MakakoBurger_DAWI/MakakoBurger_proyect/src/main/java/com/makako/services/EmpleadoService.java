package com.makako.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.makako.entity.DNI;
import com.makako.entity.Empleado;
import com.makako.repository.DniRepositorio;
import com.makako.repository.EmpleadoRepositorio;

@Service
public class EmpleadoService {
	
	@Autowired
	private EmpleadoRepositorio repo;
	
	@Autowired
	private DniRepositorio repoDNI;
	
	public void actualizarEmpleado(Empleado empleado) {
		repo.save(empleado);
	}
	
	public void guardarEmpleadoConDni(Empleado empleado, DNI dni) {
		
        empleado.setEmpleadoDni(dni);
        dni.setEmpleadoDNIAsignado(empleado);
        repoDNI.save(dni);
        repo.save(empleado);
	}

}
