/**
 * 
 */

 $(document).ready(function(){
	$('#form').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			txtName: {
				validators: {
					notEmpty: {
						message: "El campo es obligatorio"
					},
					stringLength : {
                        min : 5,
                        max : 50,
                        message : "El campo requiere min 5 y max 60 caracteres"
                    }
				}
			},
			txtApellido: {
				validators: {
					notEmpty: {
						message: "El campo es obligatorio"
					},
                    stringLength : {
                        min : 5,
                        max : 50,
                        message : "El campo requiere min 5 y max 60 caracteres"
                    }
				}
			},
			TxtDni:{
                validators:{
                    notEmpty:{
                        message: "El campo es obligatorio"
                    },
                    regexp:{
                        regexp:/^[0-9]{8}$/,
                        message:"Formato de Dni incorrecto"

                    }
                }
			},
			txtCorreo:{
				validators:{
					notEmpty:{
						message:"El campo es obligatorio"
					},
					emailAddress: {
						message: "El formato de correo es incorrecto"
					}
					

				}
			},
			txtContraseña:{
				validators:{
					notEmpty:{
						message:"El campo es obligatorio"
					}

				}
			}

		}

	});
	
	$('#nameBtn').click(function(){
		$('#form').bootstrapValidator('validate');
	});
	
});