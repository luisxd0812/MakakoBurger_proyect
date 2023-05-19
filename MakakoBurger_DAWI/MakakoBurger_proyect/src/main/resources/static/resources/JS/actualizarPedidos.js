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
	let $listBtnInfoPedido = Array.from($d.querySelectorAll(".icon-info"));
	let $listBtnModificarPedido = Array.from($d.querySelectorAll(".icon-update"));

	$d.addEventListener("click", (e) => {


		if ($listBtnModificarPedido.includes(e.target)) {
			let $btnUpdate = e.target,
				$inputIdPedido = $btnUpdate.parentNode.parentNode.querySelector(".data > input[name = 'id']"),
				$inputMetodoRecojo = $btnUpdate.parentNode.parentNode.querySelector(".data > input[name = 'codMetodoRecojo']"),
				$inputIdEstadoPedido = $btnUpdate.parentNode.parentNode.querySelector(".data > input[name = 'codEstado']");
			console.log($inputIdPedido.value);


			let contenModal = {
				header: `<i class="icon text-center text-primary bi bi-plus-circle-fill"></i>
								<h4 class="modal-title text-center" id="modal-prototype-label">Actualizar estado pedido</h4>`,
				//Trabajar aquí el formulario de agregar productos, es el primerm modal, cuidado con el action y los estilos
				body: `<form class="d-flex flex-column gap-4" id="form-update" action="PedidosController" method="POST">
									<input type="hidden" name="type" value="actualizarEstadoPedido"/>
									<input type="hidden" name="id" value="${$inputIdPedido.value}"/>
									<p>Actualizar estado de pedido a atendido</p>					
								</form>`,
				footer: `<input id="b-pedido" form="form-update" type="submit" class="w-50 text-white btn btn-warning" value="MODIFICAR"/>
								<button data-bs-dismiss="modal" aria-label="Close" class="w-50 btn btn-primary">CANCELAR</button>`
			}
			showModal(contenModal);
			if ($inputIdEstadoPedido.value == 2) {

				let contentModal = {
					header: `<i class="icon text-center text-danger bi bi-x-circle-fill"></i>
									<h4 class="modal-title text-center" id="modal-prototype-label">El estado del pedido ya está atendido</h4>`,
					body: `<p>Solo se pueden actualizar aquellos pedidos que estén Generados</p>`,
					footer: `<button data-bs-dismiss="modal" aria-label="Close" class="w-100 btn btn-danger">CERRAR</button>`
				}
				insertContentModal(contentModal);

			} else if ($inputMetodoRecojo.value == 1) {
				console.log("Pedido Delivery");
				let contentModal = {
					header: `<i class="icon text-center text-danger bi bi-x-circle-fill"></i>
									<h4 class="modal-title text-center" id="modal-prototype-label">No se puede actualizar</h4>`,
					body: `<p>Solo se pueden actualizar los pedidos de delivery en el apartado de hoja de envío</p>`,
					footer: `<button data-bs-dismiss="modal" aria-label="Close" class="w-100 btn btn-danger">CERRAR</button>`
				}
				insertContentModal(contentModal);

			}
		}
		if ($listBtnInfoPedido.includes(e.target)) {
			let $btnInfo = e.target,
				$inputIdPedido = $btnInfo.parentNode.parentNode.querySelector(".data > input[name = 'id']");
			let id = $inputIdPedido.value;
			
			
			let params = {
				type: "getPedido",
				id: id,
			}
			let props = {
				url: "PedidosController?" + new URLSearchParams(params),
				success: async (json) =>{
					let pedidoInfo = await json;
					if(pedidoInfo){
						let params2 = {
							type: "getDetallePedido",
							id: id,
							
						}
						let props0 = {
							url: "PedidosController?" + new URLSearchParams(params2),
							success: async (json) =>{
								let detallePedido = await json;

								let productsPedido = detallePedido.map((prodPedido) => {
									if(prodPedido.codProd != 0){
										return `<div> <span class="fw-bold">Producto: </span> <span>${prodPedido.product.nomPro}</span> 
										 <span>${prodPedido.product.precioPro}</span> <span>${prodPedido.product.catProducto.nombre_CatProd}</span> </div>`
									}
								});
								let promoPedido = detallePedido.map((prodPedido) => {
									if(prodPedido.codPromo != 0){
										return `<div> <span class="fw-bold">Promoción: </span> <span>${prodPedido.promo.nomPromo}</span> 
										<span>${prodPedido.promo.precioPromo}</span> <span>${prodPedido.promo.fechaVigencia}</span> </div>`
									}
								});
	
								let $prodList = productsPedido.join(' ');
								
								let $promoList = promoPedido.join('');
	
								let contentModal = {
								    header: `<i class="icon text-center text-link bi bi-info-circle-fill"></i>
								         <h4 class="modal-title text-center" id="modal-prototype-label">Pedido - ${pedidoInfo.codPedido}</h4>`,
								    body: `<div class="text-center">
				
								            <div><strong>Fecha pedido: </strong>${pedidoInfo.fechaPedido}</div>
								            <div><strong>Precio total del pedido: </strong>${pedidoInfo.precTotPedido}</div>
							
								            <br>
								            <div><strong>Productos del pedido </strong></div>
								            <div class= "d-row">
								    
								                <div class="data">
								                    ${$prodList}
													${$promoList}
								                </div>
								            </div>
								        </div>`,
								    footer: `<button data-bs-dismiss="modal" aria-label="Close" class="w-100 btn btn-primary">CERRAR</button>`
								};
								showModal(contentModal);
							}, 
							options: {
								method:"POST",
							}
						};
						useFetch(props0);
					}
					
				},
				options: {
					method:"POST",
				}
				
			};
			useFetch(props);


		}

	});

}