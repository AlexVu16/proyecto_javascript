/* ===============================
   DATOS BASE DEL VEHÍCULO
================================ */

// Objeto que representa el vehículo del usuario
const vehiculo = {
    patente: "SBT2623",
    multaBase: 1000
};

// Array donde se almacenan las multas generadas
// Se recuperan desde localStorage si existen
let multas = JSON.parse(localStorage.getItem("multas")) || [];


/* ===============================
   REFERENCIAS AL DOM
================================ */

// Elementos de validación de patente
const patenteInput = document.getElementById("patenteInput");
const validarBtn = document.getElementById("validarBtn");
const loginMsg = document.getElementById("loginMsg");

// Sección del menú principal
const menu = document.getElementById("menu");

// Elementos para cálculo de multa
const velocidadInput = document.getElementById("velocidadInput");
const calcularMultaBtn = document.getElementById("calcularMultaBtn");
const resultadoMulta = document.getElementById("resultadoMulta");

// Elementos para mostrar datos del vehículo
const mostrarPatenteBtn = document.getElementById("mostrarPatenteBtn");
const patenteMsg = document.getElementById("patenteMsg");


/* ===============================
   EVENTO: VALIDAR PATENTE
================================ */

// Evento que valida la patente ingresada por el usuario
validarBtn.addEventListener("click", () => {

    // Se compara la patente ingresada con la registrada
    if (patenteInput.value === vehiculo.patente) {

        // Mensaje de acceso correcto
        loginMsg.textContent = "Acceso correcto. Bienvenido al simulador.";

        // Se muestra el menú principal
        menu.classList.remove("oculto");

    } else {
        // Mensaje de error si la patente es incorrecta
        loginMsg.textContent = "Patente incorrecta. Intente nuevamente.";
    }
});


/* ===============================
   EVENTO: CALCULAR MULTA
================================ */

// Evento para calcular la multa según la velocidad ingresada
calcularMultaBtn.addEventListener("click", () => {

    // Se obtiene la velocidad ingresada y se convierte a número
    const velocidad = Number(velocidadInput.value);

    // Validación de velocidad dentro del límite
    if (velocidad <= 60) {
        resultadoMulta.textContent = "No se genera multa. Circulaba dentro del límite.";
        return;
    }

    // Cálculo del exceso de velocidad
    const exceso = velocidad - 60;

    // Inicialización del monto de la multa
    let monto = vehiculo.multaBase;

    // Se incrementa el valor según el exceso
    if (exceso <= 10) {
        monto += 2000;
    } else if (exceso <= 30) {
        monto += 4000;
    } else {
        monto += 6000;
    }

    // Objeto multa generado
    const multa = {
        velocidad: velocidad,
        exceso: exceso,
        monto: monto
    };

    // Se guarda la multa en el array
    multas.push(multa);

    // Se persisten los datos en localStorage
    localStorage.setItem("multas", JSON.stringify(multas));

    // Resultado mostrado en el DOM
    resultadoMulta.textContent = `Multa generada correctamente. Total a pagar: $${monto}`;
});


/* ===============================
   EVENTO: MOSTRAR PATENTE
================================ */

// Evento para mostrar la patente del vehículo
mostrarPatenteBtn.addEventListener("click", () => {
    patenteMsg.textContent = `Patente del vehículo: ${vehiculo.patente}`;
});
