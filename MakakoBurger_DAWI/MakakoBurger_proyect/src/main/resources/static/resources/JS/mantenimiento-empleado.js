//Trabajando con fetch y con los modal js
import useFetch from "./fetch.js";
import { showModal, insertContentModal } from "./modal.js";

const $d = document;

$d.addEventListener("DOMContentLoaded", () => {
	console.log("Una vez cargado el contenido del DOM se ejecuta este console");

	handleOnClick();
});

const handleOnClick = () => {
	const $btnEmp = $d.getElementById("btn-add-emp"),
		$listBtnInfo = Array.from($d.querySelectorAll(".icon-info")),
		$listBtnUpdate = Array.from($d.querySelectorAll(".icon-update")),
		$listBtnDelete = Array.from($d.querySelectorAll(".icon-delete"));

	$d.addEventListener("click", (e) => {
		let $btnConfirmAdd = $d.querySelector("input[form='form-add']"),
			$btnConfirmUpdate = $d.querySelector("input[form='form-update']");

		if ($btnEmp == e.target) {
			let params = {
				type: "getListPosition",
			}
			let props = {
				url: "EmpleadosController?" + new URLSearchParams(params),
				success: async (json) => {
					let listPosition = await json;

					let listOptions = listPosition.map((position) => `<option value="${position.IdCargo}">${position.Cargo}</option>`),
						$options = listOptions.join(' ');

					let contentModal = {
						header: `<i class="icon text-center text-primary bi bi-plus-circle-fill"></i>
									<h4 class="modal-title text-center" id="modal-prototype-label">Nuevo Empleado</h4>`,
						body: ` <form class="d-flex flex-column gap-4" id="form-add" action="EmpleadosController" method="POST">
										<input type="hidden" name="type" value="addInfoObject"/>
													
										<div class="row align-items-sm-center">
											<label class="col-sm-3 fw-bold" for="name">Nombres:</label>
											<div class="col-sm-9">
												<input class="form-control" type="text" id="name" name="name" value=""/>
												<div id="name-invalid" class="text-start invalid-feedback">Introduce el nombre correctamente. Mínimo 3 caracteres, máximo 40.</div>
											</div>
										</div>
													
										<div class="row align-items-sm-center">
											<label class="col-sm-3 fw-bold" for="last-Name">Apellidos:</label>
											<div class="col-sm-9">
												<input class="form-control" type="text" id="last-name" name="lastName" value=""/>
												<div id="last-name-invalid" class="text-start invalid-feedback">Introduce el apellido correctamente. Mínimo 3 caracteres, máximo 40.</div>
											</div>
										</div>
													
										<div class="row align-items-sm-center">
											<label class="col-sm-3 fw-bold" for="dni">DNI:</label>
											<div class="col-sm-9">
												<input class="form-control" type="text" id="dni" name="dni" value=""/>
												<div id="dni-invalid" class="text-start invalid-feedback">Introduce un dni válido que contenga 8 dígitos.</div>
											</div>
										</div>
													
										<div class="row align-items-sm-center">
											<label class="col-sm-3 fw-bold" for="email">Correo:</label>
											<div class="col-sm-9">
												<input class="form-control" id="email" name="email" type="text" value=""/>
												<div id="email-invalid" class="text-start invalid-feedback">Introduce un correo válido.</div>
											</div>
										</div>
									
										<div class="row align-items-sm-center">
											<label class="col-sm-3 fw-bold" for="telephone">Teléfono:</label>
											<div class="col-sm-9">
												<input class="form-control" type="text" id="telephone" name="telephone" value=""/>
												<div id="telephone-invalid" class="text-start invalid-feedback">Introduce un número válido. Solo acepta 9 dígitos y comienza con 9.</div>
											</div>
										</div>
													
										<div class="row align-items-sm-center">
											<label class="col-sm-3 fw-bold">Cargo:</label>
											<div class="col-sm-9">
												<select class="form-select" name="cboPosition">
													${$options}
												</select>
											</div>
										</div>
										
										
									</form>
										`,
						footer: `<input id= 'b-emp' form="form-add"  type="submit" class="w-50 btn btn-primary" value="AÑADIR"/>
									<button data-bs-dismiss="modal" aria-label="Close" class="w-50 btn btn-primary">CANCELAR</button>`
					}

					showModal(contentModal);
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
				url: "EmpleadosController?" + new URLSearchParams(params),
				success: async (json) => {
					let empInfo = await json;

					if (empInfo) {
						let contentModal = {
							header: `<i class="icon text-center text-link bi bi-info-circle-fill"></i>
									 <h4 class="modal-title text-center" id="modal-prototype-label">Empleado - ${empInfo.IdEmpleado}</h4>`,
							body: `
									<div class="text-center">
										<div><strong>Nombres y Apellidos: </strong>${empInfo.nom_Empleado} ${empInfo.ape_Empleado}</div>
										<div><strong>DNI: </strong>${empInfo.DNI_Empleado}</div>
										<div><strong>Correo: </strong>${empInfo.usuario.correo}</div>
										<div><strong>Teléfono: </strong>${empInfo.telfEmpleado}</div>
										<div><strong>Cargo: </strong>${empInfo.cargo.Cargo}</div>
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
				url: "EmpleadosController?" + new URLSearchParams(params),
				success: async (json) => {
					let EmpInfo = await json;

					let params = {
						type: "getListPosition",
					}

					let propsO = {
						url: "EmpleadosController?" + new URLSearchParams(params),
						success: async (json) => {
							let listPosition = await json;

							let listOptions = listPosition.map((position) => `<option value="${position.IdCargo}">${position.Cargo}</option>`),
								$options = listOptions.join(' ');

							if (EmpInfo) {
								let contentModal = {
									header: `<i class="icon text-center text-warning bi bi-pencil-square"></i>
											 <h4 class="modal-title text-center" id="modal-prototype-label">Empleado - ${EmpInfo.IdEmpleado}</h4>`,
									body: ` <form class="d-flex flex-column gap-4" id="form-update" action="EmpleadosController" method="POST">
												<input type="hidden" name="type" value="updateInfoObject"/>
												<input type="hidden" name="id" value="${EmpInfo.IdEmpleado}"/>
												
												<div class="row align-items-sm-center">
													<label class="col-sm-3 fw-bold" for="name">Nombres:</label>
													<div class="col-sm-9">
														<input class="form-control" type="text" id="name" name="name" value="${EmpInfo.nom_Empleado}"/>
														<div id="name-invalid" class="text-start invalid-feedback">Introduce el nombre correctamente. Mínimo 3 caracteres, máximo 40.</div>
													</div>
												</div>
												
												<div class="row align-items-sm-center">
													<label class="col-sm-3 fw-bold" for="last-Name">Apellidos:</label>
													<div class="col-sm-9">
														<input class="form-control" type="text" id="last-name" name="lastName" value="${EmpInfo.ape_Empleado}"/>
														<div id="last-name-invalid" class="text-start invalid-feedback">Introduce el apellido correctamente. Mínimo 3 caracteres, máximo 40.</div>
													</div>
												</div>
												
												<div class="row align-items-sm-center">
													<label class="col-sm-3 fw-bold">DNI:</label>
													<input class="form-control" type="hidden" id="dni" name="dni" value="${EmpInfo.DNI_Empleado}"/>
													<div class="col-sm-9">${EmpInfo.DNI_Empleado}</div>
												</div>
												
												<div class="row align-items-sm-center">
													<label class="col-sm-3 fw-bold" for="email">Correo:</label>
													<div class="col-sm-9">
														<input class="form-control" id="email" name="email" type="text" value="${EmpInfo.usuario.correo}"/>
														<div id="email-invalid" class="text-start invalid-feedback">Introduce un correo válido.</div>
													</div>
												</div>
				
												<div class="row align-items-sm-center">
													<label class="col-sm-3 fw-bold" for="telephone">Teléfono:</label>
													<div class="col-sm-9">
														<input class="form-control" type="text" id="telephone" name="telephone" value="${EmpInfo.telfEmpleado}"/>
														<div id="telephone-invalid" class="text-start invalid-feedback">Introduce un número válido. Solo acepta 9 dígitos y comienza con 9.</div>
													</div>
												</div>
												
												<div class="row align-items-sm-center">
													<label class="col-sm-3 fw-bold">Cargo:</label>
													<div class="col-sm-9">
														<select class="form-select" name="cboPosition" id="cboPosition">
															${$options}
														</select>
													</div>
												</div>
											</form>
									`,
									footer: `<input form="form-update" type="submit" class="w-50 text-white btn btn-warning" value="MODIFICAR"/>
											<button data-bs-dismiss="modal" aria-label="Close" class="w-50 btn btn-primary">CANCELAR</button>	`
								}

								showModal(contentModal);
								$d.querySelector(`#cboPosition > option[value="${EmpInfo.cargo.IdCargo}"]`).setAttribute("selected", true);
							}
						},
						options: {
							method: "POST",
						}
					}

					useFetch(propsO);
				},
				options: {
					method: "POST",
				}
			}

			useFetch(props);
		}

		if ($listBtnDelete.includes(e.target)) {
			let $btnDelete = e.target,
				$inputId = $btnDelete.parentNode.parentNode.querySelector(".data > input[name='id']"),
				$inputObject = $btnDelete.parentNode.parentNode.querySelector(".data > input[name='object']");

			let id = $inputId.value,
				object = $inputObject.value;

			let contentModal = {
				header: `<i class="icon text-center text-danger bi bi-trash-fill"></i>
										 <h4 class="modal-title text-center" id="modal-prototype-label">¿ESTÁS SEGURO DE ELIMINAR EL EMPLEADO - ${id} ?</h4>`,
				body: `<form id="form-delete" action="EmpleadosController" method="POST">
											<input type="hidden" name="type" value="deleteInfoObject"/>
											<input type="hidden" name="id" value="${id}"/>
											<input type="hidden" name="object" value="${object}"/>
										</form>`,
				footer: `<input form="form-delete" type="submit" class="w-50 text-white btn btn-danger" value="ELIMINAR"/>
										 <button data-bs-dismiss="modal" aria-label="Close" class="w-50 btn btn-primary">CANCELAR</button>							
										`
			}

			showModal(contentModal);
		}

		/* -------------------------------------------------- Validaciones -------------------------------------------------- */

		if ($btnConfirmAdd == e.target || $btnConfirmUpdate == e.target) {
			//Detener la petición de agregar para primero validar
			e.preventDefault();

			let $inputName = $d.getElementById("name"),
				$inputLastName = $d.getElementById("last-name"),
				$inputEmail = $d.getElementById("email"),
				$inputTelephone = $d.getElementById("telephone"),
				$inputDni = $d.getElementById("dni"),
				$dniValidar = $d.getElementById("dni-invalid"),
				$correoValidar = $d.getElementById("email-invalid");

			let isInvalid = false;

			if (!$inputName.value.match('^([A-Za-zñÑÁÉÍÓÚáéíóú]| ?){3,40}[A-Za-zñÑÁÉÍÓÚáéíóú]$')) {
				if (!$inputName.classList.contains("is-invalid")) $inputName.classList.add("is-invalid");
				isInvalid = true;
			} else {
				if ($inputName.classList.contains("is-invalid")) $inputName.classList.remove("is-invalid");
			}

			if (!$inputLastName.value.match('^([A-Za-zñÑÁÉÍÓÚáéíóú]| ?){3,40}[A-Za-zñÑÁÉÍÓÚáéíóú]$')) {
				if (!$inputLastName.classList.contains("is-invalid")) $inputLastName.classList.add("is-invalid");
				isInvalid = true;
			} else {
				if ($inputLastName.classList.contains("is-invalid")) $inputLastName.classList.remove("is-invalid");
			}

			if ($btnConfirmAdd) {
				if (!$inputDni.value.match('^[0-9]{8}$')) {
					if ($dniValidar.textContent != "Introduce un dni válido que contenga 8 dígitos.") $dniValidar.textContent = "Introduce un dni válido que contenga 8 dígitos.";
					if (!$inputDni.classList.contains("is-invalid")) $inputDni.classList.add("is-invalid");
					isInvalid = true;
				} else {
					if ($inputDni.classList.contains("is-invalid")) $inputDni.classList.remove("is-invalid");
				}
			}

			if (!$inputEmail.value.match('^[A-Za-z0-9._]+@[a-z]{4,8}(\.[a-z]{2,4}){1,2}$')) {
				if (!$inputEmail.classList.contains("is-invalid")) $inputEmail.classList.add("is-invalid");
				isInvalid = true;
			} else {
				if ($inputEmail.classList.contains("is-invalid")) $inputEmail.classList.remove("is-invalid");
			}

			if (!$inputTelephone.value.match('^9[0-9]{8}$')) {
				if (!$inputTelephone.classList.contains("is-invalid")) $inputTelephone.classList.add("is-invalid");
				isInvalid = true;
			} else {
				if ($inputTelephone.classList.contains("is-invalid")) $inputTelephone.classList.remove("is-invalid");
			}

			if (isInvalid) {
				return;
			} else {
				// Obtenemos el formulario para hacer el envío manualmente
				

				// Validando DNI Y Correo
				if ($btnConfirmAdd == e.target) {
					let $formAdd = $d.getElementById("form-add");
					let params = {
						type: "validar",
						dni: $inputDni.value,
						email: $inputEmail.value
					};

					let props0 = {
						url: "EmpleadosController?" + new URLSearchParams(params),
						success: async (json) => {
							let error = await json;
							let errorDNI;
							let errorCorreo;

							if (error.hasOwnProperty("ErrorDni")) {
								errorDNI = error['ErrorDni'];
							}
							if (error.hasOwnProperty("errorCorreo")) {
								errorCorreo = error['errorCorreo'];
							}


							if (!errorDNI && !errorCorreo) {
								$formAdd.submit();
							}




							if (errorDNI != null) {
								if ($dniValidar.textContent != "El DNI ya está registrado") {
									$dniValidar.textContent = "El DNI ya está registrado";
								}

								if (!$inputDni.classList.contains("is-invalid")) $inputDni.classList.add("is-invalid");

							} else if (errorCorreo != null) {
								if ($correoValidar.textContent != "El correo ya está registrado") {
									$correoValidar.textContent = "El correo ya está registrado";
								}
								if (!$inputEmail.classList.contains("is-invalid")) $inputEmail.classList.add("is-invalid");
							}






						},
						options: {
							method: "POST"
						}
					};

					useFetch(props0);

				} else if ($btnConfirmUpdate == e.target) {
					let $formAdd = $d.getElementById("form-update");
					let params = {
						type: "validar",
						email: $inputEmail.value,
						dni: $inputDni.value
					};
					let props0 = {
						url: "EmpleadosController?" + new URLSearchParams(params),
						success: async (json) => {
							let error = await json;
							let errorCorreo;

							if (error.hasOwnProperty("errorCorreo")) {
								errorCorreo = error['errorCorreo'];
							}

							if (!errorCorreo) {
								$formAdd.submit();
							}
							
							if (errorCorreo != null) {
								if ($correoValidar.textContent != "El correo ya está registrado") {
									$correoValidar.textContent = "El correo ya está registrado";
								}
								if (!$inputEmail.classList.contains("is-invalid")) $inputEmail.classList.add("is-invalid");
							}


						},
						options: {
							method: "POST"
						}
					};
					useFetch(props0);

				}
			}
		}
	});
}
