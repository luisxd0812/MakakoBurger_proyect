import useFetch from "./fetch.js";

const $d = document;

$d.addEventListener("DOMContentLoaded", () => {
	console.log("Una vez cargado el contenido del DOM se ejecuta este console");

	handleOnClick();
});

const handleOnClick = () => {
	const $btnAddReclamo = $d.getElementById("btn-add-reclamo");
	
	$d.addEventListener("click", (e) => {
		if ($btnAddReclamo == e.target) {
			e.preventDefault();
			
			let $inputCodigoPedido = $d.querySelector("input[name='codPedido']"),
				$codPedidoInvalid = $d.getElementById("cod-pedido-invalid"),
				$listInputsRadio = Array.from($d.querySelectorAll("input[name='rbTipoReclamo']")),
				$textareaDetalleReclamo = $d.querySelector("textarea[name='detReclamaco']"),
				$rdInvalid = $d.getElementById("rd-invalid"),
				$inputDni = $d.querySelector("input[name='dniCliente']"),
				$formReclamo = $d.getElementById("form-reclamo"),
				isInvalid = false;
			
			if (!$listInputsRadio.find(rd => rd.checked == true)) {
				if(!$listInputsRadio.find(rd => rd.classList.contains("is-invalid"))) {
					$listInputsRadio.forEach(rd => rd.classList.add("is-invalid"));
					$rdInvalid.style.display = "block";
					isInvalid = true;
				}
			}else{
				if($listInputsRadio.find(rd => rd.classList.contains("is-invalid"))) {
					$listInputsRadio.forEach(rd => rd.classList.remove("is-invalid"));
					$rdInvalid.style.display = "none";
				}
			}
				
			if(!$textareaDetalleReclamo.value.match("^(?=.{1,200}$)[A-ZÑÁÉÍÓÚ\\S][a-zñáéíóú\\S]+(?: [A-Za-zñáéíóú\\S]+)*$")){
				if(!$textareaDetalleReclamo.classList.contains("is-invalid")) $textareaDetalleReclamo.classList.add("is-invalid");
				isInvalid = true;
			}else{
				if($textareaDetalleReclamo.classList.contains("is-invalid")) $textareaDetalleReclamo.classList.remove("is-invalid");
			}
			
			let props = {
				url: "ReclamosController?" + new URLSearchParams({type: "validarNroPedido", id: $inputCodigoPedido.value, dni: $inputDni.value}),
				success: async (json) => {
					let encontroNroPedido = await json;
					
					if (encontroNroPedido && !isInvalid) {
						$formReclamo.submit();
						return;
					} 
					
					if(!encontroNroPedido){
						if(!$codPedidoInvalid.classList.contains("is-invalid")) $codPedidoInvalid.style.display = "block";
					}else{
						if(!$codPedidoInvalid.classList.contains("is-invalid")) $codPedidoInvalid.style.display = "none";
					}
				},
				options: {
					method: "POST"
				}
			}
			
			useFetch(props);
		}
	});
}