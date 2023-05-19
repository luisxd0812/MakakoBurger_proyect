import useFetch from "./fetch.js";

import { showModal, insertContentModal } from "./modal.js";


const $d = document;

$d.addEventListener("DOMContentLoaded", () => {
	console.log("Una vez cargado el contenido del DOM se ejecuta este console");
	
	handleOnClick();
});

	const handleOnClick = () => { 
	const $btnAdd = $d.getElementById("btn-add"),
		 $listBtnInfo = Array.from($d.querySelectorAll(".icon-info")),
		 $listBtnDelete = Array.from($d.querySelectorAll(".icon-delete"));
		  
	
	$d.addEventListener("click", (e) => {
		let $btnConfirmAdd = $d.querySelector("input[form='form-add']");

		if ($btnAdd == e.target) {
			let contentModal = {
				header: `<i class="icon text-center text-primary bi bi-plus-circle-fill"></i>
						<h4 class="modal-title text-center" id="modal-prototype-label">Nueva Direccion</h4>`,
				body: `<form  class="d-flex flex-column gap-4" id="form-add" action="ZonaDeRepartoController" method="POST" style="margin-bottom:30px">
							<input type="hidden" name="type" value="addZonaDeReparto"/>
							
							<div class="row align-items-sm-center">
								<label class="col-sm-5 fw-bold" for="name">Nombre de la zona:</label>
								<div class="col-sm-7">
									<input class="form-control" type="text" id="nameZona" name="txtNombreZona" value=""/>
									<div id="name-invalid" class="text-start invalid-feedback">Introduce el nombre de la zona correctamente. Mínimo 5 caracteres, máximo 100.</div>
								</div>
							</div>
							<div class="row align-items-sm-center">
								<label class="col-sm-5 fw-bold" for="name">Nombre del Distrito:</label>
								<div class="col-sm-7">
									<input class="form-control" type="text" id="nameDistrito" name="txtDistrito" value=""/>
									<div id="name-invalid" class="text-start invalid-feedback">Introduce el nombre del distrito correctamente. Mínimo 5 caracteres, máximo 20.</div>
								</div>
							</div>
							
							<div>
						
							<div class="container">
									
									<div>
										<p>1.Ubicarse en el mapa</p>
										<p>2.Para poder seleccionar su direccion dar doble click</p>
										<p>3.Por ultimo dar al boton añadir</p>
									</div>
									
							</div>
								<input class="" type="hidden" name="txtLatitud" id="Latitud" value=""/>
								<div id="name-invalid" class="text-start invalid-feedback">Introduce las coordenadas (Longitud), haciendo doble click en el mapa.</div>
							</div>
								<input class="" type="hidden" name="txtLongitud" id="Longitud" value=""/>
								<div id="name-invalid" class="text-start invalid-feedback">Introduce las coordenadas, haciendo doble click en el mapa.</div>
							</div>
							
						
																		
						</form>
						
						<div id="map" style="height:400px;" class="img-fluid"></div>`,
				footer: `<input form="form-add" type="submit" class="w-50 btn btn-primary" value="AÑADIR"/>
						<button data-bs-dismiss="modal" aria-label="Close" class="w-50 btn btn-primary">CANCELAR</button>`
			}	
						
			showModal(contentModal);
			let zoom=13;
			let map = L.map("map").setView([-11.967309, -77.096901],zoom);
				
				console.log(map)
				/**
				 *
				 * Extremos la url del mapa para poder mostrar
				 *
				 *
				 */
				L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
				  maxZoom: 18,
				  attribution:
				    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
				}).addTo(map);
				
		
			map.doubleClickZoom.disable();
		

			map.on("dblclick",(ev)=>{
		  //mouseEventToLatLng me devuelve las coordenas al dar clic
 		 let latLng = map.mouseEventToLatLng(ev.originalEvent);
 
  
  		//Cree mi variable para guardar la coordenada
 		 let GuardarCoordenada = [];
  		L.marker([latLng.lat, latLng.lng]).addTo(map).bindPopup(`La coordenada marcada es:<br>${latLng}`);
  		//console.log("Esto:"+latLng)

  		// lat lng
  		GuardarCoordenada.push(latLng);
  		console.log("CoordenadaGuardada: " + GuardarCoordenada);
  		let coordenadaGuardada = GuardarCoordenada[0];
  		let { lat, lng } = coordenadaGuardada;

		let latitud=lat;
		let longitud=lng;
		
		let $txtLatitud=$d.getElementById('Latitud')
			$txtLatitud.value=latitud;
		let $txtLongitud=$d.getElementById('Longitud')
			$txtLongitud.value=longitud			
		
		
		
  		console.log("La coordena es la siguiente:" + latitud, longitud);

		});
		}
		
		
		
		
		if ($listBtnInfo.includes(e.target)) {
			let $btnInfo = e.target,
				$inputId = $btnInfo.parentNode.parentNode.querySelector(".data > input[name='id']");
				
			let id = $inputId.value;
			
			
			let params = { 
				type: "obtenerZonaDeReparto",
				id: id,
				
			}			
			let props = {
				url: "ZonaDeRepartoController?" + new URLSearchParams(params),
				success: async (json) => {
					let tableInfo = await json;
					
					let {latitud,longitud}=tableInfo;
					
				
					
					if (tableInfo) {
					
	
						let contentModal = {
							header: `<i class="icon text-center text-link bi bi-info-circle-fill"></i>
									 <h4 class="modal-title text-center" id="modal-prototype-label">Zona de Reparto - ${tableInfo.IdZonareparto}</h4>`,
							body: `<div class="text-center">
										<div><strong>Zona de Reparto: </strong>${tableInfo.nombreZona}</div>
										<div><strong>Estado de la Mesa: </strong>${tableInfo.distri.nomDistrito}</div>
										<div><strong>Zona de Reparto: </strong>${tableInfo.latitud}</div>
										<div><strong>Zona de Reparto: </strong>${tableInfo.longitud}</div>
									</div>
									
				
									<div id="map" style="height:400px;" class="img-fluid"></div>`
									,
							footer: `<button data-bs-dismiss="modal" aria-label="Close" class="w-100 btn btn-primary">CERRAR</button>`
						}
						
						showModal(contentModal);
						
						let map = L.map("map").setView([-11.967309, -77.096901],11);
			
									/**
									 *
									 * Extremos la url del mapa para poder mostrar
									 *
									 *
									 */
										L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
							
							  maxZoom: 18,
							  attribution:
							    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
							}).addTo(map);
						
						console.log(tableInfo)
						
					
						L.marker([latitud,longitud]).addTo(map);
					
						
	
					}
					
				
				},
				options: {
					method: "POST",
				}
			}
			
			useFetch(props);
		};
		
		
		
		if ($listBtnDelete.includes(e.target)) {
			let $btnDelete = e.target,
				$inputId = $btnDelete.parentNode.parentNode.querySelector(".data > input[name='id']");
				let id = $inputId.value;
				let  contentModal;
				
				if(id==1){
					contentModal = {
						header: `<i class="icon text-center text-danger bi bi-trash-fill"></i>
						 <h4 class="modal-title text-center" id="modal-prototype-label">NO SE PUEDE ELIMINAR LA ZONA - ${id}</h4>`,
						body: `<p>No se puede eliminar esta Zona de reparto porque es la principal</p`,
						footer: `<button data-bs-dismiss="modal" aria-label="Close" class="w-100 btn btn-danger">CANCELAR</button>`
					}		
					
					showModal(contentModal);	
				}		
				else{
					let props = {
						url: "ZonaDeRepartoController?" + new URLSearchParams({type: "buscarZonaRepartoEnHojaEnvio", id}),
						success: async (json) => {
							let encontroZonaReparto = await json;
							
							if (!encontroZonaReparto) {
								contentModal = {
									header: `<i class="icon text-center text-danger bi bi-trash-fill"></i>
									 <h4 class="modal-title text-center" id="modal-prototype-label">¿ESTÁS SEGURO DE ELIMINAR ESTA DIRECCION - ${id} ?</h4>`,
									body: `<form id="form-delete" action="ZonaDeRepartoController" method="POST">
												<input type="hidden" name="type" value="deleteDirecciones"/>
												<input type="hidden" name="id" value="${id}"/>
											</form>`,
									footer: `<input form="form-delete" type="submit" class="w-50 text-white btn btn-danger" value="ELIMINAR"/>
											<button data-bs-dismiss="modal" aria-label="Close" class="w-50 btn btn-primary">CANCELAR</button>`
								}	
							} else {								
								contentModal = {
									header: `<i class="icon text-center text-danger bi bi-trash-fill"></i>
									 <h4 class="modal-title text-center" id="modal-prototype-label">NO SE PUEDE ELIMINAR LA ZONA - ${id}</h4>`,
									body: `<p>No se puede eliminar esta Zona de reparto porque se encontraron hojas de envio que utilizan esta dirección.</p`,
									footer: `<button data-bs-dismiss="modal" aria-label="Close" class="w-100 btn btn-danger">CANCELAR</button>`
								}		
							}
							
							showModal(contentModal);
						},
						options: {
							method: "POST"
						}
					}	
					
					
					useFetch(props);				
				}
				
				
		}
				
			/* -------------------------------------------------- Validaciones -------------------------------------------------- */	
			if($btnConfirmAdd==e.target){
			
			
			let $inputNameZona=$d.getElementById('nameZona'),
			$inputDistrito=$d.getElementById('nameDistrito'),
			$inputLatitud=$d.getElementById('Latitud'),
			$inputLongitud=$d.getElementById('Longitud');
			
			let isInvalid=false;
			
			if(!$inputNameZona.value.match('^([A-Za-zñÑÁÉÍÓÚáéíóú]| ?){5,100}[A-Za-zñÑÁÉÍÓÚáéíóú]$')){
				if(!$inputNameZona.classList.contains("is-invalid")) $inputNameZona.classList.add("is-invalid");
				isInvalid=true;
			}else{
				if($inputNameZona.classList.contains("is-invalid")) $inputNameZona.classList.remove("is-invalid");
			}
			if(!$inputDistrito.value.match('^([A-Za-zñÑÁÉÍÓÚáéíóú]| ?){5,20}[A-Za-zñÑÁÉÍÓÚáéíóú]$')){
				if(!$inputDistrito.classList.contains("is-invalid")) $inputDistrito.classList.add("is-invalid");
				isInvalid=true;
			}else{
				if($inputDistrito.classList.contains("is-invalid")) $inputDistrito.classList.remove("is-invalid");
				
			}
			if($inputLatitud.value.trim()== ""){
				if(!$inputLatitud.classList.contains("is-invalid")) $inputLatitud.classList.add("is-invalid");
				isInvalid=true;
			}else{
				if($inputLatitud.classList.contains("is-invalid")) $inputLatitud.classList.remove("is-invalid");
				
			}
			if($inputLongitud.value.trim()== ""){
				if(!$inputLongitud.classList.contains("is-invalid")) $inputLongitud.classList.add("is-invalid");
				isInvalid=true;
			}else{
				if($inputLongitud.classList.contains("is-invalid")) $inputLongitud.classList.remove("is-invalid");
			}
			if (isInvalid) {
				e.preventDefault();
				return;	
			}
			
		}
				
});
}
