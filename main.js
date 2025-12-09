// Simulador de Control Vehicular

// Variables
const patente_base = "SBT 2623";
const multa_base = 1000;
let patenteauto = 2000;

// Función para validar el auto del cliente
function validarpatente() {
    for (let intentos = 3; intentos > 0; intentos--) {
        let ingreso = prompt("Ingresa la patente de tu auto:");

        if (patente_base == ingreso) {
            alert("Bienvenido al Simulador de Multas Vehiculares.");
            return true;
        } else {
            alert("Patente incorrecta. Verifíquela e intente nuevamente. Intentos restantes: " + (intentos - 1));
        }
    }

    // Si llega aquí, agotó los intentos
    alert("Has agotado los intentos. Acceso denegado.");
    return false;
}

// Función para calcular multa de velocidad
function multa_velocidad() {
    let velocidad = Number(prompt("Ingresa la velocidad a la que ibas (KM/H):"));

    if (isNaN(velocidad)) {
        alert("Por favor ingresa un número válido.");
        return;
    }

    if (velocidad <= 60) {
        alert("No tenés multa, ibas dentro del límite.");
        return;
    }

    let exceso = velocidad - 60;
    let multa_total = 0;

    if (exceso <= 10) {
        multa_total = multa_base + 2000;
    } else if (exceso <= 30) {
        multa_total = multa_base + 4000;
    } else {
        multa_total = multa_base + 6000;
    }

    alert(
        "Velocidad registrada: " + velocidad + " km/h\n" +
        "Exceso: " + exceso + " km/h" +
        " Multa total: $" + multa_total
    );
}

// Función para mostrar patente
function mostrar_patente() {
    alert("La patente de tu vehículo es:" + " $" + patenteauto);
}

// Función para inicializar menú
function iniciarmenu() {
    if (!validarpatente()) return;

    let opcion;
    do {
        opcion = prompt("Elegí una opción: \n1 - Multas\n2 - Patente\nX - Salir del menú").toLowerCase();

        if (opcion == "1") {
            multa_velocidad();
        } else if (opcion == "2") {
            mostrar_patente();
        } else if (opcion != "x") {
            alert("Elegí una opción válida para conocer información de tu vehículo.");
        }

    } while (opcion != "x");

    alert("Gracias por usar el Simulador de Multas Vehiculares. ¡Hasta luego!");
}

iniciarmenu();
