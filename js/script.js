// Objeto con las tasas de interés de las billeteras virtuales, usando objetos y arrays para las billeteras y tasas..

const billeteras = [
    { nombre: 'Personal Pay', tasa: 73.9 },
    { nombre: 'Prex', tasa: 73.1 },
    { nombre: 'Mercado Pago', tasa: 70.7 },
    { nombre: 'Ualá', tasa: 70.5 },
    { nombre: 'NaranjaX', tasa: 82 }
];

// funcion calcular el interes compuesto

function calcularInteresCompuesto(inversion) {

    // calculo parala ganancia diaria para cada billetera virtual
    const gananciaDiaria = billeteras.map(billetera => {
        const tasaDiaria = billetera.tasa / 100 / 365;
        const ganancia = inversion * tasaDiaria;
        return { nombre: billetera.nombre, tasa: billetera.tasa, ganancia: ganancia.toFixed(2) };
    });


    // calculo para la ganancia mensual basada en la ganancia diaria
    const gananciaMensual = gananciaDiaria.map(billetera => ({
        nombre: billetera.nombre,
        ganancia: (parseFloat(billetera.ganancia) * 30).toFixed(2)
    }));


    // retornar  la ganancia diaria y la mensual
    return { gananciaDiaria, gananciaMensual };
}

// función para mostrar los resultados en la plataforma
function mostrarResultados(resultados) {
    const resultadosElemento = document.getElementById('resultados');
    
    // limpiar contenido previo
    resultadosElemento.innerHTML = '';

    // para mostrar la info de cada billetera:

    resultados.gananciaDiaria.forEach(billetera => {

        const billeteraElemento = document.createElement('div');
        billeteraElemento.classList.add('resultado');

        const nombreElemento = document.createElement('h2');
        nombreElemento.textContent = billetera.nombre;
        billeteraElemento.appendChild(nombreElemento);

        const tasaElemento = document.createElement('p');
        tasaElemento.textContent = `Tasa: ${billetera.tasa}%`;
        billeteraElemento.appendChild(tasaElemento);

        const gananciaDiariaElemento = document.createElement('p');
        gananciaDiariaElemento.textContent = `Ganancia Diaria: $${billetera.ganancia}`;
        billeteraElemento.appendChild(gananciaDiariaElemento);

        const gananciaMensualElemento = document.createElement('p');
        gananciaMensualElemento.textContent = `Ganancia Mensual: $${resultados.gananciaMensual.find(b => b.nombre === billetera.nombre).ganancia}`;
        billeteraElemento.appendChild(gananciaMensualElemento);

        resultadosElemento.appendChild(billeteraElemento);
    });
}

// funcion que va calcular y mostrar resultados

function calcular() {

    // toma el monto de inversion ingresado por el usuario

    const inversion = parseFloat(document.getElementById('inversion').value);
    if (isNaN(inversion)) {
        alert('Ingresá un monto válido.');
        return;
    }

    // calculo de la ganancia diaria y mensual

    const resultados = calcularInteresCompuesto(inversion);

    // verr los resultados en la pagina
    mostrarResultados(resultados);
}

// funcion para buscar la tasa de una billetera virtual seleccionada, aca se incluye metodo de busqueda sobre el array

function buscarTasa() {
    const billeteraSeleccionada = document.getElementById('billetera').value;
    if (!billeteraSeleccionada) {
        alert('Seleccioná una billetera!!');
        return;
    }

    const billetera = billeteras.find(billetera => billetera.nombre === billeteraSeleccionada);
    if (billetera) {
        alert(`La tasa de interés de ${billeteraSeleccionada} es: ${billetera.tasa}%`);
    } else {
        alert(`No se encontró la billetera ${billeteraSeleccionada}!`);
    }
}

// funcion para filtrar las billeteras virtuales por una tasa minima especificada, se incluye el metodo de filtrado sobre el array

function filtrarPorTasa() {
    const tasaMinima = parseFloat(document.getElementById('tasa-minima').value);
    if (isNaN(tasaMinima)) {
        alert('Ingresá una tasa mínima válida!!');
        return;
    }

    const billeterasFiltradas = billeteras.filter(billetera => billetera.tasa >= tasaMinima);
    if (billeterasFiltradas.length > 0) {
        const nombresBilleterasFiltradas = billeterasFiltradas.map(billetera => billetera.nombre).join(', ');
        alert(`Billeteras con tasa mayor o igual a ${tasaMinima}%:\n${nombresBilleterasFiltradas}`);
    } else {
        alert(`No hay billeteras con una tasa mayor o igual a ${tasaMinima}% !!`);
    }
}
