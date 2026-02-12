let datosSistema;

// Traigo la multa base desde el JSON
fetch("datos.json")
    .then(res => res.json())
    .then(data => {
        datosSistema = data[0];
    })
    .catch(error => console.log(error));


// Multas guardadas
let multasGuardadas = JSON.parse(localStorage.getItem("multas")) || [];

// Patente que se ingresa
let patenteActual = "";


// Elementos
const patenteInput = document.getElementById("patenteInput");
const validarBtn = document.getElementById("validarBtn");
const loginMsg = document.getElementById("loginMsg");

const menu = document.getElementById("menu");

const velocidadInput = document.getElementById("velocidadInput");
const calcularMultaBtn = document.getElementById("calcularMultaBtn");
const resultadoMulta = document.getElementById("resultadoMulta");

const mostrarPatenteBtn = document.getElementById("mostrarPatenteBtn");
const patenteMsg = document.getElementById("patenteMsg");


// Validar patente
validarBtn.addEventListener("click", function () {

    let patenteIngresada = patenteInput.value.trim().toUpperCase();

    let formato = /^[A-Z0-9]{6,8}$/;

    if (!formato.test(patenteIngresada)) {
        loginMsg.textContent = "Patente inválida. Debe tener entre 6 y 8 caracteres (solo letras y números).";
        return;
    }

    patenteActual = patenteIngresada;

    loginMsg.textContent = "Patente cargada correctamente.";
    menu.classList.remove("oculto");
});


// Calcular multa
calcularMultaBtn.addEventListener("click", function () {

    let velocidad = Number(velocidadInput.value);

    if (velocidad <= 0 || isNaN(velocidad)) {
        resultadoMulta.textContent = "Ingrese una velocidad válida.";
        return;
    }

    if (velocidad <= 60) {
        resultadoMulta.textContent = "No corresponde multa.";
        return;
    }

    let exceso = velocidad - 60;
    let montoFinal = datosSistema.multaBase;

    if (exceso <= 10) {
        montoFinal += 2000;
    } else if (exceso <= 30) {
        montoFinal += 4000;
    } else {
        montoFinal += 6000;
    }

    let nuevaMulta = {
        patente: patenteActual,
        velocidad: velocidad,
        exceso: exceso,
        monto: montoFinal
    };

    multasGuardadas.push(nuevaMulta);
    localStorage.setItem("multas", JSON.stringify(multasGuardadas));

    resultadoMulta.textContent =
        "Multa generada para " + patenteActual +
        ". Exceso: " + exceso +
        " km/h. Total: $" + montoFinal;
});


// Mostrar patente actual
mostrarPatenteBtn.addEventListener("click", function () {

    if (patenteActual !== "") {
        patenteMsg.textContent = "Patente ingresada: " + patenteActual;
    } else {
        patenteMsg.textContent = "No hay patente cargada.";
    }
});
