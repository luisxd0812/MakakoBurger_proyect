package com.makako.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Empleados")
public class Empleado {

	@Id
	@Column(name = "ID_Empleado")
	private int codEmpleado;
	
	@Column(name = "nom_Empleado")
	private String nomEmple;
	
	@Column(name = "ape_Empleado")
	private String apeEmpleado;
	
	//RELACION DE MUCHOS A UNO EN CARGO
	@ManyToOne
	@JoinColumn(name = "id_cargoEmp")
	private Cargo cargEmpleado;
	
	@Column(name = "fechaRegistro_Empleado")
	private Date fechaReg_Emple;
	
	//RELACION DE UNO A UNO CON DNI
	@OneToOne
	@JoinColumn(name = "Dni")
	private DNI empleadoDni;

	/**/
	
	public int getCodEmpleado() {
		return codEmpleado;
	}

	public void setCodEmpleado(int codEmpleado) {
		this.codEmpleado = codEmpleado;
	}

	public String getNomEmple() {
		return nomEmple;
	}

	public void setNomEmple(String nomEmple) {
		this.nomEmple = nomEmple;
	}

	public String getApeEmpleado() {
		return apeEmpleado;
	}

	public void setApeEmpleado(String apeEmpleado) {
		this.apeEmpleado = apeEmpleado;
	}

	public Cargo getCargEmpleado() {
		return cargEmpleado;
	}

	public void setCargEmpleado(Cargo cargEmpleado) {
		this.cargEmpleado = cargEmpleado;
	}

	public Date getFechaReg_Emple() {
		return fechaReg_Emple;
	}

	public void setFechaReg_Emple(Date fechaReg_Emple) {
		this.fechaReg_Emple = fechaReg_Emple;
	}

	public DNI getEmpleadoDni() {
		return empleadoDni;
	}

	public void setEmpleadoDni(DNI empleadoDni) {
		this.empleadoDni = empleadoDni;
	}	
	
}

