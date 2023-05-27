package com.makako.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.makako.entity.Empleado;

public interface EmpleadoRepositorio extends JpaRepository<Empleado, Integer>{

}
