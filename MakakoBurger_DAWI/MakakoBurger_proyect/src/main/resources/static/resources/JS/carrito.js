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
	const $listBtnAddQuantity = Array.from($d.querySelectorAll(".btnAgregar")),
		$listBtnRestQuantity = Array.from($d.querySelectorAll(".btnDesminuir")),
		$btnGenerarCDP = $d.getElementById("CDP");
		
	let validarZona;

	//Añadir un evento de click al documento, si detecta que fue al botón de confirmar, añadir, etc. Agrega los modals
	$d.addEventListener("click", (e) => {
		let $btnConfirmarCDP = $d.getElementById("b-cdp");
		
		if ($listBtnAddQuantity.includes(e.target) || $listBtnRestQuantity.includes(e.target)) {
			let $inputId = e.target.parentNode.parentNode.querySelector("input[name='id']"),
				id = $inputId.value;


			let $inputObject = e.target.parentNode.parentNode.querySelector("input[name='object']"),
				object = $inputObject.value;

			let props = {
				url: "PedidosController?" + new URLSearchParams({ type: "carritoCompra", js: "js" }),
				success: undefined,
				options: {
					method: "POST",
				}
			};

			props.success = async (json) => {
				let detaPedido = await json;

				let elemento = undefined;

				if (object == "promo") {
					elemento = detaPedido.filter((el) => {
						return el.codPromo == id;
					})[0];
				}

				if (object == "producto") {
					elemento = detaPedido.filter((el) => {
						return el.codProd == id;
					})[0];
				}

				if ($listBtnAddQuantity.includes(e.target)) {
					// Sumar
					elemento.cant = elemento.cant + 1;
				}

				if ($listBtnRestQuantity.includes(e.target)) {
					if (elemento.cant == 1) {

						e.target.parentNode.parentNode.outerHTML = "";

						detaPedido = detaPedido.filter((el) => {
							if (el != elemento) return el
						});
					} else {
						elemento.cant = elemento.cant - 1;
					}
				}

				if (object == "producto") {
					elemento.precioPedidoTot = elemento.cant * elemento.product.precioPro;
				} else {
					elemento.precioPedidoTot = elemento.cant * elemento.promo.precioPromo
				}

				let props0 = {
					url: "PedidosController?" + new URLSearchParams({ type: "actualizarCarrito", carrito: JSON.stringify(detaPedido) }),
					success: () => {
						let $cant = e.target.parentNode.parentNode.querySelector("td:nth-child(7)"),
							$totalPrice = e.target.parentNode.parentNode.querySelector("td:nth-child(9)");

						$cant.textContent = elemento.cant;
						$totalPrice.textContent = Math.round(elemento.precioPedidoTot);
					},
					options: {
						method: "POST",
					}
				}

				useFetch(props0);
			}

			useFetch(props);
		}
		
		if ($btnGenerarCDP == e.target) {
			let contenModal = {
				header: `<i class="icon text-center text-primary bi bi-plus-circle-fill"></i>
					<h4 class="modal-title text-center" id="modal-prototype-label">Facturar Pedido</h4>`,

				body: `<form class="d-flex flex-column gap-4" id="form-add" action="CajaController" method="POST"
					    autocomplete="off">
					    <input type="hidden" name="type" value="agregarCDP" />
					
					    
					    <div class="row align-items-center justify-content-center col-auto mb-3">
					        <label class="col-sm-5 fw-bold">Seleccione Método de pago:</label>
					        <div class="col-7">
					            <select class="form-select" name="cboMetPago" id="cbo-met-payment">
					                <option value="1">-- Yape --</option>
					                <option value="2">-- Plin --</option>
					                <option value="3">-- VISA --</option>
					                <option value="4">-- MASTERCARD --</option>
					                <option value="5">-- CRÉDITO --</option>
					
					            </select>
					        </div>
					    </div>
					
					    <div class="row align-items-center justify-content-center col-auto mb-3">
					        <label class="col-sm-5 fw-bold">Seleccione Método de recojo:</label>
					        <div class="col-7">
					            <select class="form-select" name="cboMetRecojo" id="cbo-metRecojo">
					                <option value="2">-- En tienda --</option>
					                <option value="1">-- Delivery --</option>
					            </select>
					        </div>
					    </div>
	
					    <div class="row align-items-center justify-content-center col-auto mb-3" style="display: none" id="idTelf">
					        <label class="col-sm-5 fw-bold" for="telf">Telefono cliente</label>
					        <div class="col-7">
					            <input type="text" class="form-control" name="telfCliente" id="telf" />
					            <div id="telephone-invalid" class="text-start invalid-feedback">Introduce un número válido. Solo acepta 9 dígitos y comienza con 9.</div>
					        </div>
					    </div>
	
	
						<div class="row align-items-center justify-content-center col-auto mb-3" style="display: none" id="divZona">
					        <label class="col-sm-5 fw-bold" for="quantity-dish">Dirección</label>
					        <div class="col-7">
					            <input list="zonasRepartos" type="text" class="form-control" name="nameZona" id="zona" />
								<div id="zona-invalid" class="text-start invalid-feedback">La dirección ingresada no está permitida para el reparto o falta ingresar el nombre completo.</div>
					        </div>
					    </div>
	
	
						<datalist id="zonasRepartos">
						
						</datalist>
					
					</form>`,
				footer: `<input id="b-cdp" form="form-add" type="submit" class="w-50 btn btn-primary" value="AÑADIR" />
					<button data-bs-dismiss="modal" aria-label="Close" class="w-50 btn btn-primary">CANCELAR</button>`
			}

			showModal(contenModal);
			
			//VALIDAR CANTIDAD DE DETALLE
			let props = {
				url: "PedidosController?" + new URLSearchParams({ type: "carritoCompra", js: "js" }),
				success: async (json) => {
					let detaPedido = await json;
					if(detaPedido.length == 0){
						console.log("Tamaño 0");
						let contentModal = {
							header: `<i class="icon text-center text-danger bi bi-x-circle-fill"></i>
												<h4 class="modal-title text-center" id="modal-prototype-label">DEBE HABER UN PRODUCTO O PROMOCIÓN COMO MÍNIMO</h4>`,
							body: `<p>No se puede generar un comprobante de pago si es que no hay un producto en el carrito</p>`,
							footer: `<button data-bs-dismiss="modal" aria-label="Close" class="w-100 btn btn-danger">CERRAR</button>`
						}
						insertContentModal(contentModal);
					}
					
				},
				options: {
					method: "POST",
				}
			};
			useFetch(props);
			
			//MI CHAMBA
			let $cboMetodoRecojo = $d.getElementById("cbo-metRecojo"),
				$InputDirecciones = $d.getElementById("zona"),
				$divTelCli = $d.getElementById("idTelf"),
				$divInputDire = $d.getElementById("divZona"),
				$dataList = $d.getElementById("zonasRepartos");

			$cboMetodoRecojo.addEventListener("change", (e) => {
				if (e.target.value == "1") {
					$divTelCli.style.display = "";
					let props = {
						url: "ZonaDeRepartoController?" + new URLSearchParams({ type: "obtenerListaZonaRepartos" }),
						success: async (json) => {
							
							let listDirecciones = await json;
							console.log(listDirecciones);
							let listOptions = listDirecciones.map((zona) => `<option value="${zona.nombreZona}">`),
								$option = listOptions.join('');
							$dataList.innerHTML += $option;
							$divInputDire.style.display = "";
							
							$InputDirecciones.addEventListener("input", (e) => {
								console.log("prueba")
									//Validar dirección
								
								validarZona = listDirecciones.find(function(element){
									if(element.nombreZona == $InputDirecciones.value){
										console.log("existe")
										return element;
									}else{
										console.log("No existe, devuelve false")
										return null;
									}
								})
								
								console.log(validarZona);
								
								if(validarZona === undefined){
									console.log("Zona no existe")
									if(!$InputDirecciones.classList.contains("is-invalid")) $InputDirecciones.classList.add("is-invalid");
								}else {
									if($InputDirecciones.classList.contains("is-invalid")) $InputDirecciones.classList.remove("is-invalid");
								}											
							})				
						},
						options: {
							method: "POST",
						}
					};
					useFetch(props);

				}else {
					$divTelCli.style.display = "none";
					$divInputDire .style.display = "none";
					$dataList.innerHTML = "";
				}


			});
		}
		
		/* -------------------------------------------------- Validaciones -------------------------------------------------- */
	
		if ($btnConfirmarCDP == e.target && $d.getElementById("cbo-metRecojo").value == "1") {
			let $inputTelephone = $d.getElementById("telf"),
				$inputZona = $d.getElementById("zona");
			
			let isInvalid = false;
			
			if (!$inputTelephone.value.match('^9[0-9]{8}$')) {
				if (!$inputTelephone.classList.contains("is-invalid")) $inputTelephone.classList.add("is-invalid");
				isInvalid = true;
			} else {
				if ($inputTelephone.classList.contains("is-invalid")) $inputTelephone.classList.remove("is-invalid");
			}
			
			if ($inputZona.value.trim() == "" || validarZona === undefined) {
				if (!$inputZona.classList.contains("is-invalid")) $inputZona.classList.add("is-invalid");
				isInvalid = true;
			} else {
				if ($inputZona.classList.contains("is-invalid")) $inputZona.classList.remove("is-invalid");
			}
				
			if (isInvalid) {
				e.preventDefault();
			}
		}
	});
}