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
				url: "ReclamosController?" + new URLSearchParams(params),
				success: async (json) => {
					let reclamoInfo = await json,
					{ reclamo, cliente } = reclamoInfo;
					
					console.log(reclamoInfo);
					
					if (reclamoInfo) {
						let contentModal = {
							header: `<i class="icon text-center text-link bi bi-info-circle-fill"></i>
									 <h4 class="modal-title text-center" id="modal-prototype-label">Reclamo - ${reclamo.numReclamo}</h4>`,
							body: `
									<div class="text-center">
										<div><strong>Cliente: </strong>${cliente.nomCliente} ${cliente.apeCliente}</div>
										<div><strong>DNI: </strong>${cliente.Dni}</div>
										<div><strong>Tipo de Reclamo: </strong>${reclamo.tipoReclamo}</div>
										<div><strong>Fecha del Reclamo: </strong>${reclamo.fechaReclamo}</div>
										<div><strong>Descripción del Reclamo: </strong><div class="mt-1">${reclamo.dscReclamo}</div></div>
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