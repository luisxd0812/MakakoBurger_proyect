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
	//Variables DOM de los eventos del formulario
	//Botón añadir producto
	const $btnAddPromo = $d.getElementById("btn-add-promo"),
		//Botones de opciones de los list
		$listBtnInfo = Array.from($d.querySelectorAll(".icon-info")),
		$listBtnDelete = Array.from($d.querySelectorAll(".icon-delete"));
	//Añadir un evento de click al documento, si detecta que fue al botón de confirmar, añadir, etc. Agrega los modals
	$d.addEventListener("click", (e) => {

		let $btnConfirmAdd = $d.querySelector("input[form='form-add']");
		
		//Se le da click al botón de añadir producto
		if ($btnAddPromo == e.target) {
			let contenModal = {
				header: `<i class="icon text-center text-primary bi bi-plus-circle-fill"></i>
								<h4 class="modal-title text-center" id="modal-prototype-label">Nueva promoción</h4>`,
				//Trabajar aquí el formulario de agregar productos, es el primerm modal, cuidado con el action y los estilos
				body: `<form class="d-flex flex-column gap-4" id="form-add" action="PromocionesController" method="POST" enctype="multipart/form-data">
									<input type="hidden" name="type" value="addInfoObject"/>
								
									<div class="container-img-prod">
										<div class="img-prod">
											<img id="add-img-promo">		
										</div>
									</div>
																
									<div class="row align-items-sm-center">
										<label class="col-sm-5 fw-bold" for="name">Nombre de la promoción</label>
										<div class="col-sm-7">
											<input class="form-control" type="text" id="namePromo" name="namePromo" value=""/>
											<div id="name-invalid" class="text-start invalid-feedback">Introduce el nombre de la promoción correctamente. Mínimo 3 caracteres, máximo 50.</div>
										</div>
									</div>
										
									<div class="row align-items-sm-center">
										<label class="col-sm-5 fw-bold" for="price">Precio de la promoción:</label>
										<div class="col-sm-7">
											<input class="form-control" type="text" id="pricePromo" name="pricePromo" value=""/>
											<div id="name-invalid" class="text-start invalid-feedback">Introduce el precio correctamente. Se acepta como máximo 3 enteros y 2 decimales que son establecidos por un ".".</div>
										</div>
									</div>
									
									<div class="row align-items-sm-center">
										<label class="col-sm-5 fw-bold" for="fecha">Fecha de vigencia:</label>
										<div class="col-sm-7">
											<input class="form-control" type="date" id="date" name="datePromo" value=""/>
											<div id="name-invalid" class="text-start invalid-feedback">Introduce una fecha correctamente. No puede ser de fechas anteriores.</div>
										</div>
									</div>
									
									<div class="row align-items-sm-center">
										<label class="col-sm-5 fw-bold" for="image">Imagen de la promoción:</label>
										<div class="col-sm-7">
											<input class="form-control" type="file" id="image" name="image" accept="image/*"/>
											<div id="name-invalid" class="text-start invalid-feedback">Introduce una imagen.</div>
										</div>
									</div>
									
									
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

			let $inputFile = $d.getElementById("image"),
				files = null;
			$inputFile.addEventListener('change', () => {
				let $img = $d.getElementById("add-img-promo");

				if ($inputFile.files.length === 0) {
					if (files != null) {
						$inputFile.files = files;
					}
				} else {
					files = $inputFile.files;
					$img.setAttribute("src", URL.createObjectURL(files[0]));
				}
			});

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
						console.log("Prueba");
						if (e.target.value == "none") {
							$cboProd.innerHTML = "<option value = 'none'> -- Sin seleccionar -- </option>";
							return;
						}

						let idCategoryProd = e.target.value;

						let props0 = {
							url: "ProductosController?" + new URLSearchParams({ type: "getProdByCategory", id: idCategoryProd}),
							success: async (json) => {
								let listProdByCategory = await json;
								console.log(listProdByCategory);
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

		if ($listBtnInfo.includes(e.target)) {
			let $btnInfo = e.target,
				$inputId = $btnInfo.parentNode.parentNode.querySelector(".data > input[name='id']");

			let id = $inputId.value

			let params = {
				type: "getPromoObject",
				id: id,

			}

			let props = {

				url: "PromocionesController?" + new URLSearchParams(params),
				success: async (json) => {
					//Espera el objeto enviado mediante la impresión
					let promoInfo = await json;

					if (promoInfo) {
						let params2 = {
							type: "getListDetallePromo",
							id: id,
						}
						let props0 = {
							url: "PromocionesController?" + new URLSearchParams(params2),
							success: async (json) => {
								let detalleInfo = await json;
								console.log(detalleInfo)
								let productsPromo = detalleInfo.map((prodDet) => `<div class="img-prod"> <img alt="${prodDet.prod.nomPro}" src="./img/productos/${prodDet.prod.imagenProd}.png"/>  </div>
								<span> ${prodDet.prod.nomPro}</span> <span>${prodDet.prod.catProducto.nombre_CatProd}</span>`),
								$prodlist = productsPromo.join(' ');
								
								
								let contentModal = {
									header: `<i class="icon text-center text-link bi bi-info-circle-fill"></i>
										 <h4 class="modal-title text-center" id="modal-prototype-label">Promoción - ${promoInfo.codPromo}</h4>`,
									body: `<div class="text-center">
											<div class="img-prod mb-3">
												<img src="./img/promociones/${promoInfo.imagenCombo}.png"/>
											</div>
											<div><strong>Nombre de la promoción: </strong>${promoInfo.nomPromo}</div>
											<div><strong>Precio de la promoción: </strong>${promoInfo.precioPromo}</div>
											<div><strong>Fecha de vigencia: </strong>${promoInfo.fechaVigencia}</div>
											<br>
											<div><strong>Productos de la promoción </strong></div>
											<div class= "d-row">
												
												<div class="data">
													${$prodlist}
												</div>
											</div>
										</div>`,
									footer: `<button data-bs-dismiss="modal" aria-label="Close" class="w-100 btn btn-primary">CERRAR</button>`
								}

								showModal(contentModal);

							},
							options: {
								method: "POST",
							}

						}
						useFetch(props0);


					}

				},
				options: {
					method: "POST",
				}
			}

			useFetch(props);
		}

		if ($listBtnDelete.includes(e.target)) {
			let $btnDelete = e.target,
				$inputId = $btnDelete.parentNode.parentNode.querySelector(".data > input[name='id']");

			let id = $inputId.value;
			
			let contentModal;
			
			let props = {
				url: "PromocionesController?" + new URLSearchParams({type: "findPromotionDetailsInOrders", id}),
				success: async (json) => {
					let {foundPromotionInOrders} = await json;
					
					if (foundPromotionInOrders) {
						contentModal = {
							header: `<i class="icon text-center text-danger bi bi-trash-fill"></i>
											<h4 class="modal-title text-center" id="modal-prototype-label">NO SE PUEDE ELIMINAR LA PROMOCIÓN - ${id}</h4>`,
							body: `<p>No se puede eliminar el promociones porque ya hay pedidos registrados con ese promociones.</p>`,
							footer: `<button data-bs-dismiss="modal" aria-label="Close" class="w-100 btn btn-danger">CANCELAR</button>`
						}				
					} else {
						contentModal = {
							header: `<i class="icon text-center text-danger bi bi-trash-fill"></i>
									<h4 class="modal-title text-center" id="modal-prototype-label">¿ESTÁS SEGURO DE ELIMINAR LA PROMOCIÓN ${id} ?</h4>`,
							body: `<form id="form-delete" action="PromocionesController" method="POST">
										<input type="hidden" name="type" value="deletePromo"/>
										<input type="hidden" name="id" value="${id}"/>
									</form>`,
							footer: `<input form="form-delete" type="submit" class="w-50 text-white btn btn-danger" value="ELIMINAR"/>
									<button data-bs-dismiss="modal" aria-label="Close" class="w-50 btn btn-primary">CANCELAR</button>`
									};						
					}
					
					showModal(contentModal);
				},
				options: {
					method: "POST",
				}			
			}
			
			useFetch(props);
		}

		/* -------------------------------------------------- Validaciones -------------------------------------------------- */
		// Validaciones de Campos
		if ($btnConfirmAdd == e.target) {
			let $inputName = $d.getElementById("namePromo"),
				$inputPrice = $d.getElementById("pricePromo"),
				$inputDate = $d.getElementById("date"),
				$inputFile = $d.getElementById("image"),
				$inputCboCategoryProd = $d.getElementById("cbo-category-prod"),
				$inputCboProd = $d.getElementById("cbo-prod"),
				$inputQuantity = $d.getElementById("quantity-prod");
			
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

			if ($inputCboCategoryProd.value == "none") {
				if (!$inputCboCategoryProd.classList.contains("is-invalid")) $inputCboCategoryProd.classList.add("is-invalid");
				isInvalid = true;
			} else {
				if ($inputCboCategoryProd.classList.contains("is-invalid")) $inputCboCategoryProd.classList.remove("is-invalid");
			}
			
			if ($inputCboProd.value == "none") {
				if (!$inputCboProd.classList.contains("is-invalid")) $inputCboProd.classList.add("is-invalid");
				isInvalid = true;
			} else {
				if ($inputCboProd.classList.contains("is-invalid")) $inputCboProd.classList.remove("is-invalid");
			}

			if ($btnConfirmAdd && $inputFile.files.length === 0) {
				if (!$inputFile.classList.contains("is-invalid")) $inputFile.classList.add("is-invalid");
				isInvalid = true;
			} else {
				if ($inputFile.classList.contains("is-invalid")) $inputFile.classList.remove("is-invalid");
			}
			
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
	});
}