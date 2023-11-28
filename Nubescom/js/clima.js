$(document).ready(() => {
    let objClima = JSON.parse(jsonClima);
    
    let imagenesClima = {
        "Cielo nublado": "./imgs/imgsWeb/IMG 19.png",
        "Despejado": "./imgs/imgsWeb/IMG 4.png",
        "Medio nublado": "./imgs/imgsWeb/IMG 18.png",
        "Poco nuboso": "./imgs/imgsWeb/IMG 17.png",
        "Cielo cubierto": "./imgs/imgsWeb/IMG 19.png",
    };

    // Función para renderizar una fila de elementos
    const renderizarFila = (elementos) => {
        let filaClima = "";

        elementos.forEach((obj, index) => {
            const imagenURL = imagenesClima[obj.desciel];

            const fechaOriginal = obj.dloc;
            const nuevaFecha = `${fechaOriginal.substr(0, 4)}/${fechaOriginal.substr(4, 2)}/${fechaOriginal.substr(6, 2)}`;

            filaClima += `
                <div class='col s12 m6 l3'>
                    <div class='card'>
                        <div class='card-image'>
                            <img class='clima-image responsive-img' src='${imagenURL}'>
                        </div>
                        <div class='card-action'>
                            <h4>${obj.nes}</h4>
                            <h5>${obj.nmun}</h5>
                        </div>
                        <div class='card-action'>
                            \Día: ${nuevaFecha}
                        </div>
                        <div class='card-action'>
                            <h5> ${obj.tmax} °C </h5><h6> ${obj.tmin} °C</h6> 
                        </div>
                        <div class='card-action'>
                            \Descripción del cielo: ${obj.desciel} <br> \Probabilidad de lluvia: ${obj.probprec} %
                        </div>
                    </div>
                </div>
            `;
        });

        $("#dias").html(`<div class='row'>${filaClima}</div>`);
    };

    // Evento de cambio en el campo de búsqueda
    $("#search").on("input", function () {
        const filtro = $(this).val().toLowerCase();

        // Filtrar elementos que coincidan con la búsqueda
        const elementosFiltrados = objClima.filter(obj => obj.nmun.toLowerCase().includes(filtro));

        // Mostrar solo la primera fila de elementos filtrados
        renderizarFila(elementosFiltrados.slice(0, 4));
    });

    // Mostrar la primera fila de elementos al cargar la página
    renderizarFila(objClima.slice(0, 4));
});
