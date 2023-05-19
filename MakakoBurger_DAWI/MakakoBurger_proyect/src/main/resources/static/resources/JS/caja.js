//Trabajando con fetch y con los modal js
import useFetch from "./fetch.js";
import { showModal } from "./modal.js";

const $d = document;

$d.addEventListener("DOMContentLoaded", () => {
	console.log("Una vez cargado el contenido del DOM se ejecuta este console");

	handleOnClick();
});

const handleOnClick = () => {
	const $listBtnInfo = Array.from($d.querySelectorAll(".icon-info"));

	$d.addEventListener("click", (e) => {
		if ($listBtnInfo.includes(e.target)) {
			let $btnInfo = e.target,
				$inputId = $btnInfo.parentNode.parentNode.querySelector(".data > input[name='id']");

			let id = $inputId.value;

			let params = {
				type: "getInfoObject",
				id: id,
			}

			let props = {
				url: "CajaController?" + new URLSearchParams(params),
				success: async (json) => {
					let cdpInfo = await json,
					{ cdp, establecimiento, cliente } = cdpInfo;
					
					if (cdpInfo) {
						let contentModal = {
							header: `<i class="icon text-center text-link bi bi-info-circle-fill"></i>
									 <h4 class="modal-title text-center" id="modal-prototype-label">Comprobante de Pago - ${cdp.codComprobante}</h4>`,
							body: `
									<div class="text-center">
										<div><strong>Establecimiento: </strong>${establecimiento.nomEstablecimiento}</div>
										<div><strong>Dirección: </strong>${establecimiento.DireccionEstablecimiento}</div>
										<div><strong>Cliente: </strong>${cliente.nomCliente} ${cliente.apeCliente}</div>
										<div><strong>DNI: </strong>${cliente.Dni}</div>
										<div><strong>Fecha Emitido: </strong>${cdp.fchEmitido}</div>
										<div><strong>Precio Total: </strong>${cdp.precTotPedido}</div>
									</div>
							`,
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
	});
}
