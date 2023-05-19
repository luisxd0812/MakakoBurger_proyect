const $d = document;

$d.addEventListener("DOMContentLoaded", () => {
	console.log("Una vez cargado el contenido del DOM se ejecuta este console");
	
	handleOnClick();
});

const handleOnClick = () => { 
	const $btnUpdate = $d.getElementById("btn-update-establishment");
	
	$d.addEventListener("click", (e) => {
		if ($btnUpdate == e.target) {
			let $txtSobreNosostros = $d.querySelector("textarea[name='txtSobreNosotros']");
			
			if(!$txtSobreNosostros.value.match("^(?=.{1,500}$)[A-ZÑÁÉÍÓÚ\\S][a-zñáéíóú\\S]+(?: [A-Za-zñáéíóú\\S]+)*$")){
				if(!$txtSobreNosostros.classList.contains("is-invalid")) $txtSobreNosostros.classList.add("is-invalid");
				e.preventDefault();
			}else{
				if($txtSobreNosostros.classList.contains("is-invalid")) $txtSobreNosostros.classList.remove("is-invalid");
			}
		}	
	});	
}