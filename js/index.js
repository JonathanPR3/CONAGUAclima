let objClima = JSON.parse(JSONClima);
let arrClima = Array.from(objClima);

document.getElementById('buscarBtn').addEventListener('click', function () {
    buscarClima();
});


var datosOrganizados = {}; // Declarar datosOrganizados en el ámbito global

function buscarClima() {
    var estadoABuscar = document.getElementById('estado').value;
    var municipioABuscar = document.getElementById('municipio').value;

    var resultadoContainer = document.getElementById('resultado');
    resultadoContainer.innerHTML = ''; // Limpiar resultados anteriores

    if (estadoABuscar && !municipioABuscar) {
        // Si se proporciona solo el estado, mostrar todos los resultados para ese estado
        if (datosOrganizados[estadoABuscar]) {
            Object.keys(datosOrganizados[estadoABuscar]).forEach(function (municipio) {
                var resultados = datosOrganizados[estadoABuscar][municipio];
                var mostrarMunicipio = true; // Reiniciar para cada municipio
                resultados.forEach(function (clima, index) {
                    mostrarClima(clima, resultadoContainer, municipio, mostrarMunicipio && index === 0);
                    mostrarMunicipio = false; // Desactivar después de la primera tarjeta
                });
            });
        } else {
            resultadoContainer.innerHTML = `<p>No se encontraron resultados para el estado ${estadoABuscar}.</p>`;
        }
    } else if (datosOrganizados[estadoABuscar] && datosOrganizados[estadoABuscar][municipioABuscar]) {
        // Mostrar resultados como tarjetas para un estado y municipio específicos
        var resultados = datosOrganizados[estadoABuscar][municipioABuscar];
        var mostrarMunicipio = true; // Reiniciar para cada municipio
        resultados.forEach(function (clima, index) {
            mostrarClima(clima, resultadoContainer, municipioABuscar, mostrarMunicipio && index === 0);
            mostrarMunicipio = false; // Desactivar después de la primera tarjeta
        });
    } else {
        resultadoContainer.innerHTML = '<p>No se encontraron resultados para la búsqueda.</p>';
    }
}

function mostrarClima(clima, container, municipio, mostrarMunicipio) {
    var cardHTML = `
        <div class="card">`;

    if (mostrarMunicipio) {
        cardHTML += `<p>Municipio: ${municipio}</p>`;
    }

    cardHTML += `
        <p>Fecha: ${clima.fechaString}</p>
        <p> <img src="./imgs/icons/tmin.png" alt="Temperatura Mínima" style="width: 40px; height: 40px;"/> Temperatura Mínima: ${clima.tmin}°C</p>
        <p> <img src="./imgs/icons/tmax.png" alt="Temperatura Máxima" style="width: 40px; height: 40px;"/> Temperatura Máxima: ${clima.tmax}°C
        <p> <img src="./imgs/icons/lluvia.png" alt="Rain" style="width: 30px; height: 30px;"/> Probabilidad de precipitación: ${clima.probprec}%</p>`;

    // Agregar icono según la descripción del cielo
    switch (clima.desciel) {
        case "Cielo cubierto":
            cardHTML += `<p>${clima.desciel} <img src="./imgs/icons/icon-6.svg" alt="Cielo Cubierto" style="width: 50px; height: 50px;"/>
            </p>`; // Ajusta el tamaño según tus necesidades
            break;
        case "Cielo nublado":
            cardHTML += `<p>${clima.desciel} <img src="./imgs/icons/icon-5.svg" alt="Cielo Nublado" style="width: 50px; height: 50px;"/>
            </p>`; // Ajusta el tamaño según tus necesidades
            break;
        case "Poco nuboso":
            cardHTML += `<p>${clima.desciel} <img src="./imgs/icons/icon-3.svg" alt="Poco Nuboso" style="width: 50px; height: 50px;"/>
            </p>`; // Ajusta el tamaño según tus necesidades
            break;
        case "Despejado":
            cardHTML += `<p>${clima.desciel} <img src="./imgs/icons/icon-2.svg" alt="Despejado" style="width: 50px; height: 50px;"/>
           </p>`; // Ajusta el tamaño según tus necesidades
            break;
        case "Medio nublado":
            cardHTML += `<p>${clima.desciel} <img src="./imgs/icons/icon-7.svg" alt="Medio Nublado" style="width: 50px; height: 50px;"/>
            </p>`; // Ajusta el tamaño según tus necesidades
            break;
        default:
            cardHTML += `<p>Descripción del cielo: ${clima.desciel}</p>`;
    }

    cardHTML += `</div>`;

    container.innerHTML += cardHTML;
}


function inicializarPagina() {
    alasql("CREATE TABLE Clima (cc int, desciel STRING, dh int, dirvienc int, dirvieng int, dloc STRING, ides STRING, idmun STRING, lat STRING, lon STRING, ndia STRING, nes STRING, nmun STRING, prec STRING, probprec STRING, raf STRING, tmax STRING, tmin STRING, velvien STRING)");

    for (let i = 0; i < 9851; i++) {
        alasql("INSERT INTO Clima VALUES ?", [arrClima[i]]);
    }

    alasql("SELECT * FROM Clima", [], function (data) {
        data.forEach(function (registro) {
            var estado = registro.nes;
            var municipio = registro.nmun;

            if (!datosOrganizados[estado]) {
                datosOrganizados[estado] = {};
            }

            if (!datosOrganizados[estado][municipio]) {
                datosOrganizados[estado][municipio] = [];
            }

            // Desglosar la fecha
            const fecha = registro.dloc;
            const año = fecha.substring(0, 4);
            const mes = fecha.substring(4, 6);
            const dia = fecha.substring(6, 8);

            // Crear un objeto Date para manipulación adicional
            const fechaObjeto = new Date(`${año}-${mes}-${dia}T`);

            // Convertir la fecha a un formato legible
            const fechaString = `${dia}/${mes}/${año}`;

            datosOrganizados[estado][municipio].push({
                desciel: registro.desciel,
                probprec: registro.probprec,
                tmax: registro.tmax,
                tmin: registro.tmin,
                fechaString: fechaString
            });
        });

        // Llamar a buscarClima después de que se hayan organizado los datos
        buscarClima();
    });
}

window.onload = function () {
    inicializarPagina();
};
