package com.makako.entity;

import java.util.List;

import javax.persistence.*;


@Entity
@Table(name = "Cargo")
public class Cargo {
	@Id
	@Column(name = "id_cargo")
	private int idCargo;
	
	@Column(name = "Cargo")
	private String nomCargo;
	
	//Relacion de Cargo a Empleados
	@OneToMany(mappedBy = "cargEmpleado")
	private List<Empleado> listaEmpleados;

	//
	
	public int getIdCargo() {
		return idCargo;
	}

	public void setIdCargo(int idCargo) {
		this.idCargo = idCargo;
	}

	public String getNomCargo() {
		return nomCargo;
	}

	public void setNomCargo(String nomCargo) {
		this.nomCargo = nomCargo;
	}

	public List<Empleado> getListaEmpleados() {
		return listaEmpleados;
	}

	public void setListaEmpleados(List<Empleado> listaEmpleados) {
		this.listaEmpleados = listaEmpleados;
	}
	
}
