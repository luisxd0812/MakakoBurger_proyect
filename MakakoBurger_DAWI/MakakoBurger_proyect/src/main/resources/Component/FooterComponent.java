
import org.springframework.stereotype.Component;

@Component
public class FooterComponent {
	
	
	<footer class=" text-white w-100 sticky-bottom mt-auto"
			style="background-color: #492311; border-top: 2px solid #FABE1F;">

			<div class="d-flex flex-wrap justify-content-center mt-3 text-white m-auto">

				<div class="d-flex flex-column align-items-center w-25">
					<h1 class="h5">Libro de Reclamaciones</h1>
					<a href="#" class="text-center"><img
						src="/IMG/LibroRecla.png" alt="" style="width: 9%;"></a>

					<ul clas	s="list-unstyled">
						<a href="" class="text-white text-decoration-none">
							<li>Terminos y Condiciones</li>
						</a>
						<a href="" class="text-white text-decoration-none">
							<li>Políticas de la Empresa</li>
						</a>

						<a href="" class="text-white text-decoration-none">
							<li>Mapa de Sitio</li>
						</a>
						<a href="" class="text-white text-decoration-none">
							<li>Política de Datos Personales</li>
						</a>

					</ul>


				</div>
				<div class="d-flex flex-column align-items-center w-25 text-center">


					<h1 class="h5">Horarios de Atencion</h1>

					<ul class="text-start list-unstyled">
						<li>Lunes a Viernes:</li>
						<li>10:00 a.m. - 12:00 p.m.</li>
						<li>Fines de Semana:</li>
						<li>11:00 a.m. - 7:00 p.m.</li>
						<li>Feriados: Tienda Cerrada</li>
					</ul>
				</div>

			</div>

			<div class="container p-0 d-flex text-end border-top border-2 justify-content-between">

				<div
					class="d-flex flex-wrap flex-shrink-0 align-items-center justify-content-center ">
					<h1 class="h6 pe-2 mb-0">Métodos de Pago</h1>
					<div class="flex-wrap text-center fs-3" style="letter-spacing: 5px;">

						<i class="fa-brands fa-cc-mastercard text-danger"></i> <i
							class="fa-brands fa-cc-visa text-warning"></i> <i
							class="fa-brands fa-cc-amex text-primary"></i>

					</div>
					<div class="border-start ms-3 mb-0 ps-3 d-flex flex-wrap flex-shrink-0 align-items-center justify-content-center">

						<h5 class="h6 mb-0 me-2">Contacto</h5>
						<a href="https://api.whatsapp.com/send?phone=51966313252"
							target="_blank" class="text-decoration-none text-white fw-bolder"><p class="mb-0 fw-light fst-normal">
								+51 966 313 252 <i class="fa-brands fa-whatsapp"></i>
							</p>
						</a>

					</div>
				</div>
				<div class="d-flex align-items-center ">
					<p class="m-0 fw-light text-end">© 2022 Todos los derechos reservados</p>
				</div>
			</div>
		</footer>

}
