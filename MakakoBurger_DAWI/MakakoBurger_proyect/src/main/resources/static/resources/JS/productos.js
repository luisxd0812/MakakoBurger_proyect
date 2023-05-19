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
	const $btnAddProd = $d.getElementById("btn-add-prod"),
		//Botones de opciones de los list
		$listBtnInfo = Array.from($d.querySelectorAll(".icon-info")),
		$listBtnUpdate = Array.from($d.querySelectorAll(".icon-update")),
		$listBtnDelete = Array.from($d.querySelectorAll(".icon-delete"));
	//Añadir un evento de click al documento, si detecta que fue al botón de confirmar, añadir, etc. Agrega los modals
	$d.addEventListener("click", (e) => {
		
		let $btnConfirmAdd = $d.querySelector("input[form='form-add']"),
			$btnConfirmUpdate = $d.querySelector("input[form='form-update']");
		//Se le da click al botón de añadir producto
		if ($btnAddProd == e.target) {
			console.log();
			//El parametro de listar categoría de productos
			let params = {
				type: "getListCategoryProd",
			}
			//Se obtiene la URL de la página y se le da el parametros
			let props = {
				//Colocar el Servlet
				url: "ProductosController?" + new URLSearchParams(params),
				success: async (json) => {
					//En la función asincrona espera que cargue las categorías antes de listar
					let listCategoryProd = await json;
					//Agregar al modal de agregar su categoría 
					let listOptions = listCategoryProd.map((categoryProd) => `<option value="${categoryProd.Id_CatProd}">${categoryProd.nombre_CatProd}</option>`),
						$options = listOptions.join(' ');

					let contentModal = {
						header: `<i class="icon text-center text-primary bi bi-plus-circle-fill"></i>
								<h4 class="modal-title text-center" id="modal-prototype-label">Nuevo Producto</h4>`,
						//Trabajar aquí el formulario de agregar productos, es el primerm modal, cuidado con el action y los estilos
						body: `<form class="d-flex flex-column gap-4" id="form-add" action="ProductosController" method="POST" enctype="multipart/form-data">
									<input type="hidden" name="type" value="addInfoObject"/>
									<input type="hidden" name="object" value="producto"/>
			
									<div class="container-img-prod">
										<div class="img-prod">
											<img id="add-img-prod">		
										</div>
									</div>
																
									<div class="row align-items-sm-center">
										<label class="col-sm-5 fw-bold" for="name">Nombre del Producto</label>
										<div class="col-sm-7">
											<input class="form-control" type="text" id="nameProd" name="nameProd" value=""/>
											<div id="name-invalid" class="text-start invalid-feedback">Introduce el nombre del producto correctamente. Mínimo 3 caracteres, máximo 50.</div>
										</div>
									</div>
										
									<div class="row align-items-sm-center">
										<label class="col-sm-5 fw-bold" for="price">Precio del Producto:</label>
										<div class="col-sm-7">
											<input class="form-control" type="text" id="priceProd" name="priceProd" value=""/>
											<div id="name-invalid" class="text-start invalid-feedback">Introduce el precio correctamente. Se acepta como máximo 3 enteros y 2 decimales que son establecidos por un ".".</div>
										</div>
									</div>
										
									<div class="row align-items-sm-center">
										<label class="col-sm-5 fw-bold" for="image">Imagen del Producto:</label>
										<div class="col-sm-7">
											<input class="form-control" type="file" id="image" name="image" accept="image/*"/>
											<div id="name-invalid" class="text-start invalid-feedback">Introduce una imagen</div>
										</div>
									</div>
										
									<div class="row align-items-sm-center">
										<label class="col-sm-3 fw-bold">Categoría:</label>
											<div class="col-sm-9">
												<select class="form-select" name="cboCat">
													${$options}
												</select>
										</div>
									</div>
								</form>`,
						footer: `<input id="b-prod" form="form-add" type="submit" class="w-50 btn btn-primary" value="AÑADIR"/>
								<button data-bs-dismiss="modal" aria-label="Close" class="w-50 btn btn-primary">CANCELAR</button>`
					}

					showModal(contentModal);

					let $inputFile = $d.getElementById("image"),
						files = null;
					$inputFile.addEventListener('change', () => {
						let $img = $d.getElementById("add-img-prod");

						if ($inputFile.files.length === 0) {
							if (files != null) {
								$inputFile.files = files;
							}
							//$img.setAttribute("src", null);
							//if (!$img.classList.contains("d-none")) $img.classList.add("d-none");
						} else {
							files = $inputFile.files;
							$img.setAttribute("src", URL.createObjectURL(files[0]));
							//if ($img.classList.contains("d-none")) $img.classList.remove("d-none");
						}
					});
				},
				options: {
					method: "POST",
				}
			}

			useFetch(props);
		}

		if ($listBtnInfo.includes(e.target)) {
			let $btnInfo = e.target,
				$inputId = $btnInfo.parentNode.parentNode.querySelector(".data > input[name='id']"),
				$inputObject = $btnInfo.parentNode.parentNode.querySelector(".data > input[name='object']");

			let id = $inputId.value,
				object = $inputObject.value;

			let params = {
				type: "getInfoObject",
				id: id,
				object: object
			}

			let props = {
				//Aquí se comunica con el controlador mediante el método de obtener información del service
				url: "ProductosController?" + new URLSearchParams(params),
				success: async (json) => {
					//Espera el objeto enviado mediante la impresión
					let prodInfo = await json;
					if (prodInfo) {
						let contentModal = {
							header: `<i class="icon text-center text-link bi bi-info-circle-fill"></i>
										 <h4 class="modal-title text-center" id="modal-prototype-label">Producto - ${prodInfo.codProd}</h4>`,
							body: `<div class="text-center">
											<div class="img-prod mb-3">
												<img src="./img/productos/${prodInfo.imagenProd}.png"/>
											</div>
											<div><strong>Nombre del Producto: </strong>${prodInfo.nomPro}</div>
											<div><strong>Precio del Producto: </strong>${prodInfo.precioPro}</div>
											<div><strong>Categoría del Producto: </strong>${prodInfo.catProducto.nombre_CatProd}</div>
										</div>`,
							footer: `<button data-bs-dismiss="modal" aria-label="Close" class="w-100 btn btn-primary">CERRAR</button>`
						}

						showModal(contentModal);
					}

				},
				options: {
					method: "POST",
				}
			}

			useFetch(props);
		}

		if ($listBtnUpdate.includes(e.target)) {
			let $btnUpdate = e.target,
				$inputId = $btnUpdate.parentNode.parentNode.querySelector(".data > input[name='id']"),
				$inputObject = $btnUpdate.parentNode.parentNode.querySelector(".data > input[name='object']");

			let id = $inputId.value,
				object = $inputObject.value;

			let params = {
				type: "getInfoObject",
				id: id,
				object: object
			}

			let props = {
				url: "ProductosController?" + new URLSearchParams(params),
				success: async (json) => {

					let prodInfo = await json;

					let params = {
						type: "getListCategoryProd"
					}

					let props0 = {
						url: "ProductosController?" + new URLSearchParams(params),
						success: async (json) => {
							let listCategoryProd = await json;

							let listOptions = listCategoryProd.map((categoryProd) => `<option value="${categoryProd.Id_CatProd}">${categoryProd.nombre_CatProd}</option>`),
								$options = listOptions.join(' ');

							if (prodInfo) {
								let contentModal = {
									header: `<i class="icon text-center text-warning bi bi-pencil-square"></i>
											<h4 class="modal-title text-center" id="modal-prototype-label">Producto - ${prodInfo.codProd}</h4>`,
									body: `<form class="d-flex flex-column gap-4" id="form-update" action="ProductosController" method="POST" enctype="multipart/form-data">
												<input type="hidden" name="type" value="updateInfoObject"/>
												<input type="hidden" name="id" value="${prodInfo.codProd}"/>
												<input type="hidden" name="object" value="producto"/>
						
												<div class="container-img-prod">
													<div class="img-prod">
														<img src="./img/productos/${prodInfo.imagenProd}.png" id="update-img-prod">		
													</div>
												</div>
																			
												<div class="row align-items-sm-center">
													<label class="col-sm-5 fw-bold" for="name">Nombre del Producto:</label>
													<div class="col-sm-7">
														<input class="form-control" type="text" id="nameProd" name="nameProd" value="${prodInfo.nomPro}"/>
														<div id="name-invalid" class="text-start invalid-feedback">Introduce el nombre del producto correctamente. Mínimo 3 caracteres, máximo 50.</div>
													</div>
												</div>
													
												<div class="row align-items-sm-center">
													<label class="col-sm-5 fw-bold" for="price">Precio del Producto:</label>
													<div class="col-sm-7">
														<input class="form-control" type="text" id="priceProd" name="priceProd" value="${prodInfo.precioPro}"/>
														<div id="name-invalid" class="text-start invalid-feedback">Introduce el precio correctamente. Se acepta como máximo 3 enteros y 2 decimales que son establecidos por un ".".</div>
													</div>
												</div>
													
												<div class="row align-items-sm-center">
													<label class="col-sm-5 fw-bold" for="image">Imagen del Producto:</label>
													<div class="col-sm-7">
														<input class="form-control" type="file" id="image" name="image" accept="image/*"/>
														<div id="name-invalid" class="text-start invalid-feedback">Introduce una imagen</div>
													</div>
												</div>
													
												<div class="row align-items-sm-center">
													<label class="col-sm-3 fw-bold">Categoría:</label>
														<div class="col-sm-9">
															<select class="form-select" name="cboCatUpdate" id="cboCategoryProdUpdate">
																${$options}
															</select>
													</div>
												</div>
											</form>`,
									footer: `<input  id="b-prod" form="form-update" type="submit" class="w-50 text-white btn btn-warning" value="MODIFICAR"/>
											<button data-bs-dismiss="modal" aria-label="Close" class="w-50 btn btn-primary">CANCELAR</button>`
								}

								showModal(contentModal);
								$d.querySelector(`#cboCategoryProdUpdate > option[value="${prodInfo.catProducto.Id_CatProd}"]`).setAttribute("selected", true);

								let $inputFile = $d.getElementById("image"),
									files = null;
								$inputFile.addEventListener('change', () => {
									let $img = $d.getElementById("update-img-prod");

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
					 useFetch(props0);
				},
				options: {
					method: "POST",
				}
			}

			useFetch(props);
		}

		/* ************************************ PARTE RODOLFO - INICIO ************************************ */
		if ($listBtnDelete.includes(e.target)) {
			let $btnDelete = e.target,
				$inputId = $btnDelete.parentNode.parentNode.querySelector(".data > input[name='id']");
				
			let id = $inputId.value;

			let contentModal;
			
			let props = {
				url: "ProductosController?" + new URLSearchParams({type: "findProductInPromotionDetailsOrOrders", id}),
				success: async (json) => {
					let foundProduct = await json;
					
					console.log(foundProduct);
					
					if (foundProduct.hasOwnProperty("foundProductInPromotion") || foundProduct["foundProductInOrders"]) {
						contentModal = {
							header: `<i class="icon text-center text-danger bi bi-trash-fill"></i>
											<h4 class="modal-title text-center" id="modal-prototype-label">NO SE PUEDE ELIMINAR EL PRODUCTO - ${id}</h4>`,
							footer: `<button data-bs-dismiss="modal" aria-label="Close" class="w-100 btn btn-danger">CANCELAR</button>`
						}
						
						if (foundProduct.hasOwnProperty("foundProductInPromotion")) {
							let quantity = foundProduct["foundProductInPromotion"];
							contentModal.body = `<p>No se puede eliminar el producto porque se ha encontrado ${quantity} ${quantity > 1 ? "promociones": "promoción"} que ${quantity > 1 ? "utilizan": "utiliza"} ese producto.</p>`;
						} else {
							contentModal.body = `<p>No se puede eliminar el producto porque ya hay pedidos registrados con ese producto.</p>`;
						}					
					} else {
						contentModal = {
							header: `<i class="icon text-center text-danger bi bi-trash-fill"></i>
										<h4 class="modal-title text-center" id="modal-prototype-label">¿ESTÁS SEGURO DE ELIMINAR EL PRODUCTO ${id} ?</h4>`,
							body: `<form id="form-delete" action="ProductosController" method="POST">
										<input type="hidden" name="type" value="deleteInfoObject"/>
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
		
		/* ************************************ PARTE RODOLFO - FIN ************************************ */

		/* -------------------------------------------------- Validaciones -------------------------------------------------- */
		// Validaciones de Campos
		if ($btnConfirmAdd == e.target || $btnConfirmUpdate == e.target) {
			let btnProd = $d.getElementById('b-prod');
			let $inputName = $d.getElementById("nameProd");
			let isInvalid = false;

			if (e.target == btnProd) {

				let $inputPrice = $d.getElementById("priceProd"),
					$inputFile = $d.getElementById("image");

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

				if ($btnConfirmAdd && $inputFile.files.length === 0) {
					if (!$inputFile.classList.contains("is-invalid")) $inputFile.classList.add("is-invalid");
					isInvalid = true;
				} else {
					if ($inputFile.classList.contains("is-invalid")) $inputFile.classList.remove("is-invalid");
				}
			}

			if (isInvalid) {
				e.preventDefault();
				return;

			}
		}
	});
}