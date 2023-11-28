$(document).ready(() => {
    let objClima = JSON.parse(jsonClima);
    
    let imagenesClima = {
        "Cielo nublado": "./imgs/imgsWeb/IMG 17.png",
        "Despejado": "./imgs/imgsWeb/IMG 4.png",
        "Medio nublado": "./imgs/imgsWeb/IMG 18.png",
        "Poco nuboso": "./imgs/imgsWeb/IMG 19.png",
        "Cielo cubierto": "./imgs/imgsWeb/IMG 19.png",
    };

    const obtenerDireccionViento = (grados) => {
        if (grados >= 337.5 || grados < 22.5) {
            return "Norte";
        } else if (grados >= 22.5 && grados < 67.5) {
            return "Noreste";
        } else if (grados >= 67.5 && grados < 112.5) {
            return "Este";
        } else if (grados >= 112.5 && grados < 157.5) {
            return "Sureste";
        } else if (grados >= 157.5 && grados < 202.5) {
            return "Sur";
        } else if (grados >= 202.5 && grados < 247.5) {
            return "Suroeste";
        } else if (grados >= 247.5 && grados < 292.5) {
            return "Oeste";
        } else if (grados >= 292.5 && grados < 337.5) {
            return "Noroeste";
        } else {
            return "Desconocido";
        }
    };

    // Función para renderizar una fila de elementos
    const renderizarFila = (elementos) => {
        let filaClima = "";

        elementos.forEach((obj, index) => {
            const imagenURL = imagenesClima[obj.desciel];
            const estadoTiempo = obj.desciel.toLowerCase().replace(/\s/g, ''); // Elimina espacios y convierte a minúsculas


            const fechaOriginal = obj.dloc;
            const nuevaFecha = `${fechaOriginal.substr(0, 4)}/${fechaOriginal.substr(4, 2)}/${fechaOriginal.substr(6, 2)}`;

            // Función para obtener el nombre del día y el formato de fecha deseado
            const obtenerFormatoFecha = (fechaOriginal) => {
            const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            
            const fecha = new Date(fechaOriginal.substr(0, 4), fechaOriginal.substr(4, 2) - 1, fechaOriginal.substr(6, 2));
            const nombreDia = diasSemana[fecha.getDay()];
            
            // Obtén el día con dos dígitos
            const dia = fecha.getDate().toString().padStart(2, '0');
            
            // Obtén las tres letras del mes
            const mes = obtenerTresLetrasMes(fecha);
            
            return `${nombreDia} ${dia} ${mes}`;
            };
            
            // Función para obtener las tres letras del mes
            const obtenerTresLetrasMes = (fecha) => {
            const opcionesFormato = { month: 'short' };
            return fecha.toLocaleDateString(undefined, opcionesFormato);
            };

            filaClima += `
                <div class='col s12 m6 l3'>
                    <div class='card'>
                        <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" src='${imagenURL}'>
                            </div>
                            <div class="card-content">
                                <span class="card-title activator grey-text text-darken-4"><b class="post-subtitle subTitleFont">${obj.nes}</b> <br><b class="post-subtitle subTitleFont"> ${obj.nmun} </b><i class="fas fa-ellipsis-v right"></i></span>
                                <p class="post-subtitle subTitleFont"><b><span style="color: blue;">${obj.tmax} °C</span></b> / <span style="color: red;">${obj.tmin} °C</span></p>
                                <p>${obj.desciel}</p>
                                <p>${obtenerFormatoFecha(obj.dloc)}</p>
                            </div>
                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4">Información detallada <i class="fas fa-times right"></i></span>
                                <p><i class="fas fa-umbrella"></i> Probabilidad de precipitaciones: ${obj.probprec} %</p>
                                <p><i class="fas fa-wind"></i> Velocidad del viento: <br>${obj.velvien} km/h</p>
                                <p><i class="fas fa-location-arrow"></i> Dirección del viento: <br>${obtenerDireccionViento(obj.dirvieng)}</p>
                                <p><i class="fas fa-smog"></i> Cobertura de nubes: <br>${obj.cc} %</p>
                                <p><i class="fas fa-compass"></i> Latitud: <br>${obj.lat}</p>
                                <p><i class="fas fa-compass"></i> Longitud: <br>${obj.lon}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        $("#dias").html(`<div class='row'>${filaClima}</div>`);
    };

    const realizarBusqueda = () => {
        const municipio = $("#municipio").val().toLowerCase();
        const estado = $("#estado").val().toLowerCase();

        // Filtrar elementos que coincidan con la búsqueda por estado y municipio
        const elementosFiltrados = objClima.filter(obj =>
            obj.nmun.toLowerCase().includes(municipio) && obj.nes.toLowerCase().includes(estado)
        );

        // Mostrar solo los primeros 4 elementos filtrados
        renderizarFila(elementosFiltrados.slice(0, 4));
    };

    // Evento de cambio en los campos de entrada
    $("#municipio, #estado").on("input", realizarBusqueda);

    // Mostrar todos los elementos al cargar la página
    renderizarFila(objClima.slice(0, 4));
});



$(document ).ready(function(){
    $(".button-collapse").sideNav();
 })
function getBlogs(str,flag){
         if(str==""){
           if(flag == 0) //laptop size
           {
           document.getElementById("searchResults").innerHTML="";
         }
         else{ //for mobile and laptop
            document.getElementById("searchResults2").innerHTML="";
         }
             return;
         }
  var searchedResults,x,txt="";
         var xhttp=new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
       searchedResults=JSON.parse(this.responseText);
       for(x in searchedResults)
       {
//           get data from server and set it to txt
         txt="data"
       }
   if(flag == 0) //laptop size
           {
           document.getElementById("searchResults").innerHTML=txt;
         }
         else{ //for mobile and laptop
            document.getElementById("searchResults2").innerHTML=txt;
         }
   }
}
}

$(document).ready(function(){
    $('.carousel').carousel();
  });