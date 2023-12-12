$(document).ready(function () {
    let objClima = JSON.parse(jsonClima);
    let estadosUnicos = [...new Set(objClima.map(obj => obj.nes))];

    // Crea el código HTML para los collapsibles
    var collapsibleHTML = '<ul class="collapsible">';

    // Itera sobre cada estado único
    estadosUnicos.forEach(function (estado) {
        collapsibleHTML += `
            <li class="estado-collapsible">
                <div class="collapsible-header"><i class="fa-solid fa-square-caret-down"></i><b>${estado}</b></div>
                <div class="collapsible-body container">
                    <div class="search-container">
                        <label for="searchInput">Buscar municipio:</label>
                        <input type="text" class="search-input">
                    </div>
                    <ul class="collapsible-items">
                        ${crearItemsPorEstado(objClima, estado)}
                    </ul>
                </div>
            </li>`;
    });

    collapsibleHTML += '</ul><br>';

    // Agrega el código HTML al div con el ID específico
    $('#collapsible-container').html(collapsibleHTML);

    // Inicializa el componente Collapsible
    $('.collapsible').collapsible();

    // Agrega un evento de escucha al campo de búsqueda
    $('.search-input').on('input', function () {
        const searchTerm = $(this).val().toLowerCase();

        // Oculta todos los elementos
        $('.collapsible-items .card').hide();

        // Muestra solo los elementos que coinciden con la búsqueda
        $('.collapsible-items .card').filter(function() {
            return $(this).text().toLowerCase().includes(searchTerm);
        }).show();
    });
});

// Función para formatear la fecha
function formatearFecha(fechaString) {
    const año = fechaString.slice(0, 4);
    const mes = fechaString.slice(4, 6);
    const dia = fechaString.slice(6, 8);
    return `${dia}/${mes}/${año}`;
}

// Función auxiliar para crear items por estado
// Función auxiliar para crear items por estado
function crearItemsPorEstado(objClima, estado) {
    // Filtra los objetos por estado
    let objetosPorEstado = objClima.filter(obj => obj.nes === estado);

    // Crea los items correspondientes
    let itemsHTML = '';
    let municipioAnterior = null; // Variable para almacenar el municipio anterior

    objetosPorEstado.forEach((obj, index) => {
        const fechaFormateada = formatearFecha(obj.dloc);

        // Verifica si el municipio ha cambiado y muestra el nombre del municipio
        if (obj.nmun !== municipioAnterior) {
            if (municipioAnterior !== null) {
                // Cierra el div del municipio anterior si no es la primera iteración
                itemsHTML += `</div>`;
            }

            // Abre un nuevo div para el municipio actual
            itemsHTML += `<div class="card">
                            <h6 class="center"><b>${obj.nmun}</b></h6>
                            <ul>`;
            municipioAnterior = obj.nmun; // Actualiza el municipio anterior
        }

        itemsHTML += `<li class="center"><b>Fecha: ${fechaFormateada}</b></li>
                      <li class="center"><i style="color: red;" class="fa-solid fa-temperature-full"></i>Máxima: ${obj.tmax}°C / <i style="color: blue;" class="fa-solid fa-temperature-quarter"></i>Mínima: ${obj.tmin}°C</li>
                      <li class="center"><i class="fa-solid fa-cloud" style="color: #C6E5D9;"></i>${obj.desciel} / <i class="fas fa-umbrella" style="color: #045071;"></i>Probabilidad de Lluvia: ${obj.probprec}%</li>`;

        // Cierra el div del municipio actual en la última iteración
        if (index === objetosPorEstado.length - 1) {
            itemsHTML += `</ul></div>`;
        }
    });

    return itemsHTML;
}
