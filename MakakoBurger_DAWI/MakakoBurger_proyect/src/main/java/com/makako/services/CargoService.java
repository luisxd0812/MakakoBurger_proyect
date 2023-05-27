package com.makako.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.makako.entity.Cargo;
import com.makako.repository.CargoRepositorio;

import java.util.*;

@Service
public class CargoService {

	@Autowired
	private CargoRepositorio repo;
	
	public List<Cargo> listarCArgos() {
		return repo.findAll();
	}
	
}
