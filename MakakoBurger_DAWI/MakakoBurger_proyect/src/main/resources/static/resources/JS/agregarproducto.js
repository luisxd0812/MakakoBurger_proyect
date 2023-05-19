//Trabajando con fetch y con los modal js
import useFetch from "./fetch.js";
import { showModal, insertContentModal } from "./modal.js";
const $d = document;

//agregamos el evento

$d.addEventListener("DOMContentLoaded", ()=>{
        console.log("Una vez cargado el contenido del DOM se ejecuta la consola");
        heandOnClick();
});

const heandOnClick =()=>{
            //boton de agregar
//const items = document.getElementsByClassName("item");
           const  $listBtnAñadirProdCarrito = Array.from($d.querySelectorAll(".btnCarrito"));
				
            $d.addEventListener("click", (e) => {
                if($listBtnAñadirProdCarrito.includes(e.target)){ 
					let props = {
						url: "PedidosController?" + new URLSearchParams({type: "obtenerUsuario"}),
						success: async(json) => { 
							let usuario = await json;
							
							if (!usuario) {
								let contentModal = {
									header: `<button data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-circle-fill"></i></button>
						       		 		<h4 class="modal-title" id="recover-password-label">Usuario no autenticado</h4>`,
									body: `
											<p>
								    			Debes iniciar sessión para poder agregar productos al carrito.
								       		 </p>
									`,
									footer: ``
								}
								
								showModal(contentModal);
								return;
							} 
							
							if (usuario.idTipoUsuario == 1){
								let contentModal = {
									header: `<button data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-circle-fill"></i></button>
						       				 <h4 class="modal-title" id="recover-password-label">No tienes los permisos para realizar una compra.</h4>`,
									body: `
											<p>
								    			Debes iniciar sesión con una cuenta de tipo cliente.
								       		 </p>
									`,
									footer: ``
								}
								
								showModal(contentModal);
							} else {
								//buscamos todos los botones y le mandamos la misma funcion
			                    let $btnAñadir = e.target, 
								
			                    $inputIdProd = $btnAñadir.parentNode.querySelector("input[name='IdProducto']");	
								console.log("sdaas");
								if(!$inputIdProd  ){
									console.log("probando");
									$inputIdProd = $btnAñadir.parentNode.querySelector("input[name='IdPromo']");
								}
				
			                    let IdProducto = $inputIdProd.value;
					
								let params = {
				                    type: "agregarproducto",
			                    }
			                    
								if($inputIdProd.name=="IdProducto"){
									params["object"] = "Producto";
									params["IdProducto"] = IdProducto;	
								}
								
								else{
									params["object"] = "Promo";
									params["IdPromo"] = IdProducto;
								}
							
			                    let props01 = {
			                        url: "PedidosController?" + new URLSearchParams(params),
									success: async(json) => { 
										let {agregado} = await json;
										
										if (agregado) {
											let contentModal = {
												header: `<button data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-circle-fill"></i></button>
									        <h4 class="modal-title" id="recover-password-label">Producto Agregado</h4>`,
												body: `
												<p>
									    			El producto fue Agregado Correctamente
									       		 </p>
												`,
												footer: ``
											}
											
											showModal(contentModal);
										} else {
											if (!$inputIdProd.classList.contains("is-invalid")) $inputIdProd.classList.add("is-invalid");
											$inputIdProd.textContent = "Error al agregar producto";
										}
									},
			                        options: {
			                            method: "POST",
									}
			                    }
			                    
			                    useFetch(props01);
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