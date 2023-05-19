import useFetch from "./fetch.js";

let map = L.map("map").setView([-11.967309, -77.096901],13);

/**
 *
 * Extremos la url del mapa para poder mostrar
 *
 *
 */
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

/**---------------------------------------------------------------------------------------------------------------------------------------- */
//Llamamos al url del minimap
let carto_light = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  { attribution: "©OpenStreetMap, ©CartoDB", subdomains: "abcd", maxZoom: 20 }
);

// Agregar plugin MiniMap
new L.Control.MiniMap(carto_light, {
  toggleDisplay: true,
  minimized: false,
  position: "bottomleft",
}).addTo(map);
//La escala del map
L.control.scale({ imperial: false }).addTo(map);

//Declaro mi funcion anonima, que se va a ejecutar inmediantamente se inicia el apartado de zona de repartos
(() => {

  
  //Parametros para el servlet de zonas de reparto
  let params = {
      type: "ListarZonaDeReparto",

  }
  //La petición a fetch
  let props = {
      url: "ZonaDeRepartoController?" + new URLSearchParams(params),
      success: async (json) => {

          let listDirecciones = await json;
			map.doubleClickZoom.disable();
			console.log(listDirecciones);
		
	
		
		//Recorremos nuestro array de direcciones, le asignamsos los parametros de mi array["longitud","latitud","nombreZona","Distrito"]
		listDirecciones.forEach(({longitud,latitud,nombreZona,distri})=>L.marker([latitud,longitud]).addTo(map).bindPopup(`<h3 id="h3-pupper">Distrito:`+" "+`${distri.nomDistrito}</h3><p>${nombreZona}</p>`));
         

		

      },
      options: {
          method: "POST",
      }
  }
 useFetch(props);
})();


