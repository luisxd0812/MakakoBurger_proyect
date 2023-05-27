package com.makako.entity;

import javax.persistence.*;

@Entity
@Table(name="DNI")
public class DNI {
	@Id
	@Column(name = "Dni")
	private int dni;
	
	//RELACION DE UNO A UNO EN EMPLEADO
	@OneToOne
	@JoinColumn(name = "Dni")
	private Empleado empleadoDNIAsignado;

	public int getDni() {
		return dni;
	}

	public void setDni(int dni) {
		this.dni = dni;
	}

	public Empleado getEmpleadoDNIAsignado() {
		return empleadoDNIAsignado;
	}

	public void setEmpleadoDNIAsignado(Empleado empleadoDNIAsignado) {
		this.empleadoDNIAsignado = empleadoDNIAsignado;
	}
	

	
}
