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
    let $listBtnInfoHoja = Array.from($d.querySelectorAll(".icon-info"));
    let $listBtnModificarHoja = Array.from($d.querySelectorAll(".icon-update"));

    $d.addEventListener("click", (e) => {


        if ($listBtnModificarHoja.includes(e.target)) {
            let $btnUpdate = e.target,
                $inputIdPedido = $btnUpdate.parentNode.parentNode.querySelector(".data > input[name = 'id']"),
                $inputIdEstadoPedido = $btnUpdate.parentNode.parentNode.querySelector(".data > input[name = 'codEstado']");

            let contenModal = {
                header: `<i class="icon text-center text-primary bi bi-plus-circle-fill"></i>
								<h4 class="modal-title text-center" id="modal-prototype-label">Actualizar estado de hoja de envío</h4>`,
                //Trabajar aquí el formulario de agregar productos, es el primerm modal, cuidado con el action y los estilos
                body: `<form class="d-flex flex-column gap-4" id="form-update" action="HojaEnvioController" method="POST">
									<input type="hidden" name="type" value="updateInfoObject"/>
									<input type="hidden" name="id" value="${$inputIdPedido.value}"/>
									<p>Actualizar estado de hoja de envío y pedido a atendido</p>					
								</form>`,
                footer: `<input id="b-hoja" form="form-update" type="submit" class="w-50 text-white btn btn-warning" value="MODIFICAR"/>
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

            } 
        }
        if ($listBtnInfoHoja.includes(e.target)) {
            let $btnInfo = e.target,
                $inputIdPedido = $btnInfo.parentNode.parentNode.querySelector(".data > input[name = 'id']");
            let id = $inputIdPedido.value;


            let params = {
                type: "getPedido",
                id: id,
            }
            let props = {
                url: "PedidosController?" + new URLSearchParams(params),
                success: async (json) => {
                    let pedidoInfo = await json;
                    if (pedidoInfo) {
                        let params2 = {
                            type: "getInfoObject",
                            id: id,

                        }
                        let props0 = {
                            url: "HojaEnvioController?" + new URLSearchParams(params2),
                            success: async (json) => {
                                let hojaEnvioInfo = await json;

                                let contentModal = {
                                    header: `<i class="icon text-center text-link bi bi-info-circle-fill"></i>
								         <h4 class="modal-title text-center" id="modal-prototype-label">Hoja de Envio - ${hojaEnvioInfo.codHojaEnvio}</h4>`,
                                    body: `<div class="text-center">
				
								            <div><strong>Fecha pedido: </strong>${pedidoInfo.fechaPedido}</div>
								            <div><strong>Precio total del pedido: </strong>${pedidoInfo.precTotPedido}</div>
											<div><strong>Método de pago: </strong>${pedidoInfo.MetodoPago.nomTipoPago}</div>
											<div><strong>Nombre del cliente: </strong>${pedidoInfo.Cliente.nomCliente}</div>
											<div><strong>Teléfono: </strong>${hojaEnvioInfo.telefono}</div>
											<div><strong>Distrito: </strong>${hojaEnvioInfo.zona.distri.nomDistrito}</div>
											<div><strong>Dirección: </strong>${hojaEnvioInfo.zona.nombreZona}</div>
							
								            
								        </div>`,
                                    footer: `<button data-bs-dismiss="modal" aria-label="Close" class="w-100 btn btn-primary">CERRAR</button>`
                                };
                                showModal(contentModal);
                            },
                            options: {
                                method: "POST",
                            }
                        };
                        useFetch(props0);
                    }

                },
                options: {
                    method: "POST",
                }

            };
            useFetch(props);


        }

    });

}