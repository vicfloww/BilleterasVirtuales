
// tasas de interés anuales para cada billetera virtual

const tasasAnuales = {
    "Personal Pay": 73.9,
    "Prex": 73.1,
    "Mercado Pago": 70.7,
    "Ualá": 70.5,
    "NaranjaX": 82,
};

//calculos y ciclos

// calcular el interés compuesto
function calcularInteres() {
    // toma el monto inicial ingresado por el usuario
    const montoInput = document.getElementById("monto").value;

    // verificacion si el valor ingresado es un numero
    if (isNaN(montoInput) || montoInput === '') {
        // Mostrar una alerta si el valor no es un número válido
        alert("Por favor, ingrese un monto válido.");
        return; // Salir de la función si el valor no es válido
    }


    // pasar el valor ingresado a decimal
    const montoInicial = parseFloat(montoInput);

    // toma referencia al elemento donde se mostrarán los resultados
    const resultadosDiv = document.getElementById("resultados");
    // borra los resultados previos
    resultadosDiv.innerHTML = "";




    // itera sobre cada billetera en el objeto tasasAnuales
    for (let billetera in tasasAnuales) {
        // inicializa el monto actual con el monto inicial ingresado
        let monto = montoInicial;
        // calcular la tasa diaria para la billetera actual
        const tasaDiaria = tasasAnuales[billetera] / 100 / 365;
        // inicializar las ganancias diaria y mensual en 0
        let gananciaDiaria = 0;
        let gananciaMensual = 0;

        // calcula las ganancias diaria y mensual para 30 dias
        for (let i = 0; i < 30; i++) {
            // calcula la ganancia diaria
            gananciaDiaria = monto * tasaDiaria;
            // suma la ganancia diaria al monto actual
            monto += gananciaDiaria;
            // suma la ganancia diaria a la ganancia mensual
            gananciaMensual += gananciaDiaria;
        }


// pasar resultados al html

        // genera el HTML para mostrar los resultados de las billeteras
        const resultadoHTML = `<div class="resultado" style="border-color: ${getRandomColor()}">
                                    <h2 style="color: ${getRandomColor()}">${billetera}</h2>
                                    <p>Ganancia diaria: $${gananciaDiaria.toFixed(2)}</p>
                                    <p>Ganancia mensual: $${gananciaMensual.toFixed(2)}</p>
                                </div>`;
        // pasar el HTML al contenedor de resultados
        resultadosDiv.innerHTML += resultadoHTML;
    }
}


// funcionalidad para generar un color diferente para cada borde en los resultados d elas billeteras


// genera un color aleatorio en formato hexadecimal
function getRandomColor() {
    // color hexadecimal aleatorio
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}