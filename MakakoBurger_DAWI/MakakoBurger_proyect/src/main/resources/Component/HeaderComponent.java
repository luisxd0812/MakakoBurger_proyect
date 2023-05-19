import org.springframework.stereotype.Component;

@Component
public class HeaderComponent {

	<header class="text-center shadow-lg mb-4 "
			style="background-color: #FABE1F;">

			<video src="/IMG/MakakoTitulo.mp4" style="width: 40%;" autoplay loop></video>

			<nav
				class="navbar navbar-expand-lg border-bottom border-top border-2 "
				style="background-color: #FFF6EA;">

				<div class=" container-fluid mt-0 d-flex align-content-around  ">
					 <a class="navbar-brand d-flex text-center align-items-center" style="color:#FFF6EA;"
	                            href="/HTML/index.htm"><img src="/IMG/Logo-IconoSinFondo.png" class="text-center align-items-center"
	                                width="90" alt=""></a>

					<button class="navbar-toggler" type="button"
						data-bs-toggle="collapse" style="color: #330E00;"
						data-bs-target="#navbarNav" aria-controls="navbarNav"
						aria-expanded="false" aria-label="Toggle navigation">
						<i class="fa-solid fa-bars"></i>
					</button>
					<div class="collapse navbar-collapse justify-content-end"
						id="navbarNav">
						<ul class="navbar-nav col-12 col-lg-auto my-2 justify-content-end"
							style="color: #FFF6EA;">
							
							<li class="nav-item"><a class="nav-link m-2 "
								style="color: #330E00; font-size: 20px;" aria-current="page"
								href="indexUser.html"> <i
									class="fa-solid fa-house-chimney d-flex justify-content-center"
									width="30"></i>Inicio
							</a>
							</li>						
							
							<li class="nav-item"><a class="nav-link m-2 "
								style="color: #330E00; font-size: 20px;" aria-current="page"
								href="#"> <i
									class="fa-solid fa-burger d-flex justify-content-center"
									width="30"></i>Menú
							</a>
							</li>

							<li class="nav-item"><a class="nav-link m-2  "
								style="color: #330E00; font-size: 20px;" aria-current="page"
								href="#"> <i
									class="fa-solid fa-sack-dollar d-flex justify-content-center"
									width="30"></i>Promociones
							</a></li>

							<li class="nav-item"><a class="nav-link m-2 "
								style="color: #330E00; font-size: 20px;" aria-current="page"
								href="#"> <i
									class="fa-solid fa-map-location-dot d-flex justify-content-center"
									width="30"></i>Zona de Reparto
							</a></li>

							<li class="nav-item"><a class="nav-link m-2 "
								style="color: #330E00; font-size: 20px;" aria-current="page"
								href="#"> <i
									class="fa-solid fa-people-roof d-flex justify-content-center"
									width="30"></i>Nosotros
							</a></li>


							<li
								class="nav-item d-flex align-self-center flex-wrap carro border">
								<a class="nav-link m-2 text-center"
								style="color: #330E00; font-size: 20px;" aria-current="page"
								href="#"> <i
									class="fa-solid fa-shopping-cart justify-content-center pe-2"
									width="30"></i> Tienda Online
							</a>
							</li>
							

								
									<li
			                            class="nav-item d-flex m-1 align-self-center flex-wrap carro border">
			                            <a class="nav-link m-2 text-center"
			                            style="color: #330E00; font-size: 20px;" aria-current="page"
			                            href="login.html"> <i
			                                class="fa-solid fa-user justify-content-center pe-2"
			                                width="30"></i>Iniciar Sesión
			                        	</a>
			                        </li>
								
							
						</ul>
					</div>

				</div>
			</nav>

		</header>	

	
}
