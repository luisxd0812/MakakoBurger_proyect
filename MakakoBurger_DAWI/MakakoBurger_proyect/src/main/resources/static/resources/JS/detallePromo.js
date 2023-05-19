//Trabajando con fetch y con los modal js
import useFetch from "./fetch.js";
import { showModal, insertContentModal } from "./modal.js";

const $d = document;
//Se le agrega un evento al documento
$d.addEventListener("DOMContentLoaded", () => {
	console.log("Una vez cargado el contenido del DOM se ejecuta este console");

	handleOnClick();
});

const handleOnClick = () => {
	const $inputIdPromo = $d.getElementById("idPromoAct");
	const $btnActualizarPromo = $d.getElementById("btn-update"),
		$btnAgregarProducto = $d.getElementById("btn-add-prod"),
		$listBtnEliminarProd = Array.from($d.querySelectorAll(".icon-delete")),
		$listBtnModificarProd = Array.from($d.querySelectorAll(".icon-update"));

	let productFound = false;

	$d.addEventListener("click", (e) => {
		let $btnConfirmUpdate = $d.getElementById("b-promo"),
			$btnConfirmDelete = $d.querySelector("input[form='form-delete']"),
			$btnConfirmAddProd = $d.getElementById("b-prod"),
			$btnConfirmUpdateProd = $d.getElementById("u-prod");

		if ($btnActualizarPromo == e.target) {


			let id = $inputIdPromo.value;

			let params = {
				type: "getPromoObject",
				id: id
			}
			let props = {
				url: "PromocionesController?" + new URLSearchParams(params),
				success: async (json) => {
					let promoInfo = await json;

					if (promoInfo) {
						let fecha = new Date(promoInfo.fechaVigencia),
							mes = '' + (fecha.getMonth() + 1),
							dia = '' + fecha.getDate(),
							año = '' + fecha.getFullYear();

						if (mes.length < 2) {
							mes = '0' + mes;
						}
						if (dia.length < 2) {
							dia = '0' + dia;
						}
						let fechaMostrar = año + "-" + mes + "-" + dia;
						console.log(fechaMostrar);

						let contenModal = {
							header: `<i class="icon text-center text-warning bi bi-pencil-square"></i>
								<h4 class="modal-title text-center" id="modal-prototype-label">Actualizar promoción</h4>`,
							//Trabajar aquí el formulario de agregar productos, es el primerm modal, cuidado con el action y los estilos
							body: `<form class="d-flex flex-column gap-4" id="form-add" action="PromocionesController" method="POST" enctype="multipart/form-data">
										<input type="hidden" name="type" value="updatePromo"/>
										<input type="hidden" name="id" value="${promoInfo.codPromo}"/>
								
									<div class="container-img-prod">
										<div class="img-prod">
											<img src="./img/promociones/${promoInfo.imagenCombo}.png" id="update-img-promo">		
										</div>
									</div>
																
									<div class="row align-items-sm-center">
										<label class="col-sm-5 fw-bold" for="name">Nombre de la promoción</label>
										<div class="col-sm-7">
											<input class="form-control" type="text" id="namePromo" name="namePromo" value="${promoInfo.nomPromo}"/>
											<div id="name-invalid" class="text-start invalid-feedback">Introduce el nombre de la promoción correctamente. Mínimo 3 caracteres, máximo 50.</div>
										</div>
									</div>
										
									<div class="row align-items-sm-center">
										<label class="col-sm-5 fw-bold" for="price">Precio de la promoción:</label>
										<div class="col-sm-7">
											<input class="form-control" type="text" id="pricePromo" name="pricePromo" value="${promoInfo.precioPromo}"/>
											<div id="name-invalid" class="text-start invalid-feedback">Introduce el precio correctamente. Se acepta como máximo 3 enteros y 2 decimales que son establecidos por un ".".</div>
										</div>
									</div>
									
									<div class="row align-items-sm-center">
										<label class="col-sm-5 fw-bold" for="fecha">Fecha de vigencia:</label>
										<div class="col-sm-7">
											<input class="form-control" type="date" id="date" name="datePromo" value="${fechaMostrar}"/>
											<div id="name-invalid" class="text-start invalid-feedback">Introduce una fecha correctamente. No puede ser de fechas anteriores</div>
										</div>
									</div>
									
									<div class="row align-items-sm-center">
										<label class="col-sm-5 fw-bold" for="image">Imagen de la promoción:</label>
										<div class="col-sm-7">
											<input class="form-control" type="file" id="image" name="image" accept="image/*"/>
											<div id="name-invalid" class="text-start invalid-feedback">Introduce una imagen</div>
										</div>
									</div>				
								</form>`,
							footer: `<input id="b-promo" form="form-add" type="submit" class="w-50 btn btn-warning text-white" value="ACTUALIZAR"/>
									<button data-bs-dismiss="modal" aria-label="Close" class="w-50 btn btn-primary">CANCELAR</button>`

						}
						showModal(contenModal);
						let $inputFile = $d.getElementById("image"),
							files = null;
						$inputFile.addEventListener('change', () => {
							let $img = $d.getElementById("update-img-promo");

							if ($inputFile.files.length === 0) {
								if (files != null) {
									$inputFile.files = files;
								}
							} else {
								files = $inputFile.files;
								$img.setAttribute("src", URL.createObjectURL(files[0]));
							}
						});
					}

				},
				options: {
					method: "POST",
				}

			}
			useFetch(props);


		}
		if ($btnAgregarProducto == e.target) {
			let contenModal = {
				header: `<i class="icon text-center text-primary bi bi-plus-circle-fill"></i>
								<h4 class="modal-title text-center" id="modal-prototype-label">Agregar producto promociónn</h4>`,
				//Trabajar aquí el formulario de agregar productos, es el primerm modal, cuidado con el action y los estilos
				body: `<form class="d-flex flex-column gap-4" id="form-add" action="PromocionesController" method="POST">
									<input type="hidden" name="type" value="updateDetallePromo"/>
									<input type="hidden" name="tipoOP" value="1"/>
									<input type="hidden" name="id" value="${$inputIdPromo.value}"/>

									<div class="row align-items-center justify-content-center col-auto mb-3">
				  						<label class="col-sm-5 fw-bold">Seleccione Categoria:</label>
				  						<div class="col-7">			  				
						  					<select class="form-select" name="cboCategoryProd" id="cbo-category-prod">
							  					<option value="none">-- Sin seleccionar --</option>
											</select>	  	
											<div id="name-invalid" class="text-start invalid-feedback">Selecciona una categoría.</div>  	
				  						</div>
				  					</div> 		
				  			
				  					<div class="row align-items-center justify-content-center col-auto mb-3">
				  						<label class="col-sm-5 fw-bold">Seleccione Producto:</label>
				  						<div class="col-7">			  				
						  					<select class="form-select" name="cboProd" id="cbo-prod">
							  					<option value="none">-- Sin seleccionar --</option>
											</select>	  			
											<div id="name-invalid" class="text-start invalid-feedback">Selecciona un producto.</div>  	
				  						</div>
				  					</div> 		

									<div class="row align-items-center justify-content-center col-auto mb-3">
				  						<label class="col-sm-5 fw-bold" for="quantity-dish">Cantidad de Productos</label>
				  						<div class="col-7">			  				
						  					<input type="text" class="form-control" name="cantProd" id="quantity-prod"/> 	
						  					<div id="name-invalid" class="text-start invalid-feedback">Introduce una cantidad válida.</div>				
				  						</div>
				  					</div> 		
									
								</form>`,
				footer: `<input id="b-prod" form="form-add" type="submit" class="w-50 btn btn-primary" value="AÑADIR"/>
								<button data-bs-dismiss="modal" aria-label="Close" class="w-50 btn btn-primary">CANCELAR</button>`
			}
			showModal(contenModal);

			//Validar categorías de productos y los mismos productos
			let $cboCategoryProd = $d.getElementById("cbo-category-prod");
			let $cboProd = $d.getElementById("cbo-prod");

			let props = {
				url: "ProductosController?" + new URLSearchParams({ type: "getListCategoryProd" }),
				success: async (json) => {
					let listCategoryProd = await json;
					let listOptions = listCategoryProd.map((categoryProd) => `<option value="${categoryProd.Id_CatProd}">${categoryProd.nombre_CatProd}</option>`),
						$option = listOptions.join('');
					$cboCategoryProd.innerHTML += $option;

					$cboCategoryProd.addEventListener("change", (e) => {
						if (e.target.value == "none") {
							$cboProd.innerHTML = "<option value = 'none'> -- Sin seleccionar -- </option>";
							return;
						}

						let idCategoryProd = e.target.value;

						let props0 = {
							url: "ProductosController?" + new URLSearchParams({ type: "getProdByCategory", id: idCategoryProd }),
							success: async (json) => {
								let listProdByCategory = await json;
								$cboProd.innerHTML = "<option value='none'> -- Sin seleccionar -- </option>";

								if (listProdByCategory.length == 0) return;
								let listOptions = listProdByCategory.map((prod) => `<option value="${prod.codProd}">${prod.nomPro}</option>`),
									$options = listOptions.join(' ');
								$cboProd.innerHTML += $options;

							},
							options: {
								method: "POST",
							}

						}
						useFetch(props0);

					})

				},
				options: {
					method: "POST",
				}

			}
			useFetch(props);


		}
		if ($listBtnModificarProd.includes(e.target)) {
			let $btnUpdate = e.target,
				$inputIdProd = $btnUpdate.parentNode.parentNode.querySelector(".data > input[name='idProd']");


			let contenModal = {
				header: `<i class="icon text-center text-warning bi bi-pencil-square"></i>
								<h4 class="modal-title text-center" id="modal-prototype-label">Actualizar producto promoción</h4>`,
				//Trabajar aquí el formulario de agregar productos, es el primerm modal, cuidado con el action y los estilos
				body: `<form class="d-flex flex-column gap-4" id="form-update" action="PromocionesController" method="POST">
									<input type="hidden" name="type" value="updateDetallePromo"/>
									<input type="hidden" name="tipoOP" value="2"/>
									<input type="hidden" name="id" value="${$inputIdPromo.value}"/>
									<input type="hidden" name="codProd" value="${$inputIdProd.value}"/>

									<div class="row align-items-center justify-content-center col-auto mb-3">
				  						<label class="col-sm-5 fw-bold" for="quantity-dish">Cantidad de Productos</label>
				  						<div class="col-7">			  				
						  					<input type="text" class="form-control" name="cantProd" id="quantity-prod"/> 			
						  					<div id="name-invalid" class="text-start invalid-feedback">Introduce una cantidad válida.</div>		
				  						</div>
				  					</div> 		
									
								</form>`,
				footer: `<input id="u-prod" form="form-update" type="submit" class="w-50 text-white btn btn-warning" value="MODIFICAR"/>
								<button data-bs-dismiss="modal" aria-label="Close" class="w-50 btn btn-primary">CANCELAR</button>`
			}
			showModal(contenModal);

		}
		if ($listBtnEliminarProd.includes(e.target)) {	
			let $btnDelete = e.target,
				$inputIdProd = $btnDelete.parentNode.parentNode.querySelector(".data > input[name='idProd']");

			let id = $inputIdPromo.value;
				
			let contentModal; 

			let params = {
				type: "validarActDetPromo",
				tipoOP: "3",
				id: id
			};
				
			let props0 = {
				url: "PromocionesController?" + new URLSearchParams(params),
				success: async (json) => {
					let { minimo } = await json;
		
					if (minimo) {
						console.log("Error de tamaño");
	
						contentModal = {
							header: `<i class="icon text-center text-danger bi bi-x-circle-fill"></i>
									<h4 class="modal-title text-center" id="modal-prototype-label">DEBE HABER UN PRODUCTO COMO MÍNIMO</h4>`,
							body: `<p>No se puede eliminar el producto de la promoción porque debe haber 1 como mínimo</p>`,
							footer: `<button data-bs-dismiss="modal" aria-label="Close" class="w-100 btn btn-danger">CERRAR</button>`
						}
					} else {
						contentModal = {
							header: `<i class="icon text-center text-danger bi bi-trash-fill"></i>
									<h4 class="modal-title text-center" id="modal-prototype-label">¿ESTÁS SEGURO DE ELIMINAR EL PRODUCTO ${$inputIdProd.value} ?</h4>`,
							body: `<form id="form-delete" action="PromocionesController" method="POST">
										<input type="hidden" name="type" value="updateDetallePromo"/>
										<input type="hidden" name="tipoOP" value="3"/>
										<input type="hidden" name="id" value="${$inputIdPromo.value}"/>
										<input type="hidden" name="codProd" value="${$inputIdProd.value}"/>
									</form>`,
							footer: `<input form="form-delete" type="submit" class="w-50 text-white btn btn-danger" value="ELIMINAR"/>
									<button data-bs-dismiss="modal" aria-label="Close" class="w-50 btn btn-primary">CANCELAR</button>`
						}
					}
					
					showModal(contentModal);
				},
				options: {
					method: "POST"
				}
			};
	
			useFetch(props0);
		}

		/*------------------------------------------------ VALIDAR PROMOCIONES ------------------------------------*/
		if ($btnConfirmUpdate == e.target) {			
			let $inputName = $d.getElementById("namePromo"),
				$inputPrice = $d.getElementById("pricePromo"),
				$inputDate = $d.getElementById("date");
			
			let isInvalid = false;

			
			if (!$inputName.value.match('^(?=.{3,50}$)[A-ZÑÁÉÍÓÚ][a-zñáéíóú]+(?: [A-Za-zñáéíóú]+)*$')) {
				if (!$inputName.classList.contains("is-invalid")) $inputName.classList.add("is-invalid");
				isInvalid = true;
			} else {
				if ($inputName.classList.contains("is-invalid")) $inputName.classList.remove("is-invalid");
			}

			if (!$inputPrice.value.match('^\\d{1,3}(.\\d{1,2})?$')) {
				if (!$inputPrice.classList.contains("is-invalid")) $inputPrice.classList.add("is-invalid");
				isInvalid = true;
			} else {
				if ($inputPrice.classList.contains("is-invalid")) $inputPrice.classList.remove("is-invalid");
			}

			if (!(Date.parse($inputDate.value) > Date.now())) {
				if (!$inputDate.classList.contains("is-invalid")) $inputDate.classList.add("is-invalid");
				isInvalid = true;
			} else {
				if ($inputDate.classList.contains("is-invalid")) $inputDate.classList.remove("is-invalid");
			}
					
			if (isInvalid) {
				e.preventDefault();	
				return;
			}
		}
		
		if ($btnConfirmUpdateProd == e.target) {
			let $inputQuantity = $d.getElementById("quantity-prod"),
				isInvalid = false;
			
			if (!$inputQuantity.value.match('^[1-9][0-9]*$')) {
				if (!$inputQuantity.classList.contains("is-invalid")) $inputQuantity.classList.add("is-invalid");
				isInvalid = true;
			} else {
				if ($inputQuantity.classList.contains("is-invalid")) $inputQuantity.classList.remove("is-invalid");
			}
			
			if (isInvalid) {
				e.preventDefault();
				return;
			}
		}
		
		if ($btnConfirmAddProd == e.target) {
			//Detener evento para que primero valide.
			e.preventDefault();
			
			let $inputCboCategoryProd = $d.getElementById("cbo-category-prod"),
				$inputCboProd = $d.getElementById("cbo-prod"),
				$inputQuantity = $d.getElementById("quantity-prod"),
				$divCboProd = $inputCboProd.nextElementSibling; 
			
			let isInvalid = false;

			if ($inputCboCategoryProd.value == "none") {
				if (!$inputCboCategoryProd.classList.contains("is-invalid")) $inputCboCategoryProd.classList.add("is-invalid");
				isInvalid = true;
			} else {
				if ($inputCboCategoryProd.classList.contains("is-invalid")) $inputCboCategoryProd.classList.remove("is-invalid");
			}
			
			if ($inputCboProd.value == "none") {
				productFound = false;
				$divCboProd.textContent = "Selecciona un producto";
				if (!$inputCboProd.classList.contains("is-invalid")) $inputCboProd.classList.add("is-invalid");
				isInvalid = true;
			} else {
				if (!productFound && $inputCboProd.classList.contains("is-invalid")) $inputCboProd.classList.remove("is-invalid");
			}
			
			if (!$inputQuantity.value.match('^[1-9][0-9]*$')) {
				if (!$inputQuantity.classList.contains("is-invalid")) $inputQuantity.classList.add("is-invalid");
				isInvalid = true;
			} else {
				if ($inputQuantity.classList.contains("is-invalid")) $inputQuantity.classList.remove("is-invalid");
			}
			
			if (isInvalid) {
				return;
			} 
			
			/* ---------------------------------------------- Todo Bien ---------------------------------------------- */
			
			let id = $inputIdPromo.value;
			let $formAdd = $d.getElementById("form-add");
			let $cboProd = $d.getElementById("cbo-prod");

			let params = {
				type: "validarActDetPromo",
				tipoOP: "1",
				cboProd: $cboProd.value,
				id: id
			};
			
			let props0 = {
				url: "PromocionesController?" + new URLSearchParams(params),
				success: async (json) => {
					let error = await json;
					console.log(error);
			
					let errorProdRept;

					if (error.hasOwnProperty("prodRepet")) {
						errorProdRept = error['prodRepet'];
					}

					if (!errorProdRept) {
						$formAdd.submit();
					}

					if (errorProdRept != null) {
						productFound = true;
						$divCboProd.textContent = errorProdRept;
						if (!$inputCboProd.classList.contains("is-invalid")) $inputCboProd.classList.add("is-invalid");
					}
				},
				options: {
					method: "POST"
				}
			};
		
			useFetch(props0);
		}
		
		if ($btnConfirmDelete == e.target) {
			e.preventDefault();
			
			let id = $inputIdPromo.value;
			let $formDelete = $d.getElementById("form-delete");

			let params = {
				type: "validarActDetPromo",
				tipoOP: "3",
				id: id
			};
				
			let props0 = {
				url: "PromocionesController?" + new URLSearchParams(params),
				success: async (json) => {
					let error = await json;
					console.log(error);
			
					let errorLista;
					
					if (error.hasOwnProperty("minimo")) {
						errorLista = error['minimo'];
					}
					
					if (!errorLista) {
						$formDelete.submit();
					}

					if (errorLista != null) {
						console.log("Error de tamaño");
	
						let contentModal = {
							header: `<i class="icon text-center text-danger bi bi-x-circle-fill"></i>
									<h4 class="modal-title text-center" id="modal-prototype-label">DEBE HABER UN PRODUCTO COMO MÍNIMO</h4>`,
							body: `<p>No se puede eliminar el producto de la promoción porque debe haber 1 como mínimo</p>`,
							footer: `<button data-bs-dismiss="modal" aria-label="Close" class="w-100 btn btn-danger">CERRAR</button>`
						}
						
						insertContentModal(contentModal);
					}	
				},
				options: {
					method: "POST"
				}
			};
	
			useFetch(props0);
		}
	});
}

