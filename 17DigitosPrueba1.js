var pase = false; // Declarar 'pase' en el ámbito global para que sea accesible en todas las funciones
const PDVS = [
    115, 109, 136, 170, 177, 181, 191, 202, 632, 635, 638, 639, 669, 677, 692, 702, 711, 720, 124, 141, 143, 182, 192, 196, 637, 648, 658, 659, 671, 681, 690, 703, 705, 718, 146, 178, 179, 197, 633, 634, 640, 644, 654, 656, 679, 693, 698, 699, 700, 708, 112, 114, 120, 134, 139, 149, 164, 174, 186, 642, 651, 668, 686, 688, 689, 696, 701, 707, 709, 715, 723, 130, 138, 140, 142, 144, 155, 160, 163, 641, 646, 653, 672, 673, 687, 697, 710, 714, 716, 145, 159, 631, 643, 650, 652, 655, 660, 662, 667, 680, 704, 106, 108, 118, 121, 126, 137, 147, 148, 152, 156, 173, 193, 195, 199, 200, 201, 645, 657, 661, 664, 706, 713, 721, 128, 129, 131, 151, 165, 172, 194, 636, 647, 649, 666, 674, 675, 682, 683, 684, 685, 695, 717, 719, 102, 101, 111, 129, 141, 146, 653, 660, 671, 682, 685, 689, 125, 139, 142, 144, 651, 669, 675, 687, 101, 118, 668, 700, 704, 102, 132, 133, 657, 661, 676, 678, 108, 115, 127, 652, 656, 658, 659, 664, 665, 679, 681, 702, 703, 706, 116, 117, 124, 138, 143, 662, 667, 708, 104, 114, 120, 126, 655, 672, 674, 701, 707, 105, 109, 119, 130, 145, 654, 663, 677, 683, 705
];

Qualtrics.SurveyEngine.addOnload(function() {
    var that = this;
    var q = jQuery("#" + this.questionId);
    this.hideNextButton();

    // Variable para rastrear si ya se alcanzaron los 17 caracteres
    var hasReached17Digits = false;

    // Se ejecuta cuando se pega algo en el campo
    q.find("input[type=text]").on("paste touchend", function(event) {
        var pastedData = event.originalEvent.clipboardData.getData('text');
        if (pastedData.length > 17) {
            // Si se pega un texto con más de 17 caracteres, lo recorta a 17
            event.target.value = pastedData.substring(0, 17);
        }
        validCode(event.target.value, that);
    });

    // Evento keyup cuando se escribe en el campo
    q.find("input[type=text]").on("keyup touchend", function(event) {
        if (event.target.value.length <= 17) {
            validCode(event.target.value, that);
        }
    });

    // Evento keydown para prevenir más de 17 caracteres
    q.find("input[type=text]").on("keydown touchstart", function(event) {
        var input = event.target;
        if (input.value.length >= 17 && event.keyCode !== 8 && event.keyCode !== 46) {
            hasReached17Digits = true;
            event.preventDefault(); // Esto previene que se ingresen más caracteres
        }
    });

    // Evento para clicks en botones
    jQuery("button").on("click", function(event) {
        var codeLength = q.find("input[type=text]").val().length;
        if (codeLength == 17 && !pase) {
            event.preventDefault();
            // No hacer nada
            return false;
        }
    });
});

Qualtrics.SurveyEngine.addOnPageSubmit(function() {
    /* Aquí puedes agregar código si necesitas ejecutar algo al enviar la página */
});

Qualtrics.SurveyEngine.addOnReady(function() {
    /* Aquí puedes agregar código que se ejecute cuando la página esté completamente cargada */
});

Qualtrics.SurveyEngine.addOnUnload(function() {
    /* Aquí puedes agregar código que se ejecute cuando la página se descargue */
});

function validCode(digits, that) {
    if (digits.length > 17) {
        return; // Si tiene más de 17 dígitos, no hacer nada y salir de la función
    }

    if (digits.length == 17) {
        var text = digits;
        var pdv = text.substring(1, 2) + text.substring(12, 13) + text.substring(8, 9) + text.substring(10, 11);
        Qualtrics.SurveyEngine.setEmbeddedData('PDV', pdv);

        var pais = text.substring(0, 1);
        var pais_nom = getPaisNombre(pais);
        Qualtrics.SurveyEngine.setEmbeddedData('Pais_id', pais);
        Qualtrics.SurveyEngine.setEmbeddedData('Pais', pais_nom);

        var anio = "20" + text.substring(7, 8) + text.substring(2, 3);
        var juliana = text.substring(4, 5) + text.substring(6, 7) + text.substring(14, 15);
        Qualtrics.SurveyEngine.setEmbeddedData('Juliana', juliana);

        var fecha = getFecha(anio, juliana);
        Qualtrics.SurveyEngine.setEmbeddedData('Fecha', fecha.fecha);
        Qualtrics.SurveyEngine.setEmbeddedData('Fecha_P', fecha.fecha_p);

        var canal_num = text.substring(13, 14);
        var canal = getCanal(canal_num, pais);
        Qualtrics.SurveyEngine.setEmbeddedData('Canal', canal);

        var ticket = text.substring(9, 10) + text.substring(5, 6) + text.substring(11, 12) + text.substring(16, 17);
        Qualtrics.SurveyEngine.setEmbeddedData('Ticket', ticket);

        var hora = text.substring(3, 4) + text.substring(15, 16);
        Qualtrics.SurveyEngine.setEmbeddedData('Hora', hora);

        let valor = localStorage.getItem('miVariable');
        valor = valor === null ? 0 : parseInt(valor);

        pase = true; // Asumimos que el código es válido inicialmente
        var msj = "";

        // Validaciones
        let mensajeError = ""; // Variable para almacenar el mensaje de error específico

        if (!PDVS.includes(parseInt(pdv))) {
            pase = false;
            mensajeError = "Error PDV";
        } else if (pais != "1" && pais != "2" && pais != "3") {
            pase = false;
            mensajeError = "Error País";
        } else if (Math.floor((new Date() - new Date(fecha.fecha)) / (1000 * 60 * 60 * 24)) > 7 || 
                   Math.floor((new Date() - new Date(fecha.fecha)) / (1000 * 60 * 60 * 24)) < 0) {
            pase = false;
            mensajeError = "Error Fecha";
        } else if (canal_num > 7 || canal_num == 0 || canal == "Desconocido") {
            pase = false;
            mensajeError = "Error Canal";
        }

        if (!pase) {
            msj = mensajeError || "Verifique que el código sea válido";
            valor += 1;
            localStorage.setItem('miVariable', valor);
        }

        // Mostrar u ocultar el botón "Siguiente" y el mensaje de error
        if (pase == true || valor >= 2) {
            var var_algo = valor >= 2 ? "Algoritmo invalido" : "Algoritmo valido";
            Qualtrics.SurveyEngine.setEmbeddedData('Algoritmo', var_algo);
            that.showNextButton();
        } else {
            that.hideNextButton();
        }

        // Manejo del mensaje de error
        handleErrorMessage(msj, valor, pase);
    } else {
        pase = false; // Si el código no tiene 17 dígitos, no es válido aún
        that.hideNextButton();
        hideErrorMessage();
    }
}

function getPaisNombre(pais) {
    switch (pais) {
        case "1":
            return "MEX";
        case "2":
            return "GTM";
        case "3":
            return "SLV";
        default:
            return "Desconocido";
    }
}

function getFecha(anio, juliana) {
    var year = parseInt(anio);
    var daysInYear = isLeapYear(year) ? 366 : 365;
    while (juliana > daysInYear) {
        juliana -= daysInYear;
        year++;
        daysInYear = isLeapYear(year) ? 366 : 365;
    }

    var month = 1;
    var day = parseInt(juliana);
    var monthDays = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    while (day > monthDays[month - 1]) {
        day -= monthDays[month - 1];
        month++;
    }

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    var fecha_p = day + "/" + month + "/" + year;
    var fecha = year + "-" + month + "-" + day + "T06:00:00.000Z";

    return { fecha, fecha_p };
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getCanal(canal_num, pais) {
    switch (canal_num) {
        case "1":
            return "Llevar";
        case "3":
            return "Auto";
        case "4":
            return "Institucion";
        case "5":
            return "CAD";
        case "2":
        case "6":
            return "Mesas";
        case "7":
            return pais == "2" ? "3PD" : "Desconocido";
        default:
            return "Desconocido";
    }
}

function handleErrorMessage(msj, valor, pase) {
    var textoError = document.getElementById('error-message');
    if (!textoError) {
        textoError = document.createElement('div');
        textoError.id = 'error-message';
    }

    var contenedorPregunta = document.querySelector('div.QuestionBody');

    if (valor < 2 && pase == false) {
        textoError.style.display = 'block';
        textoError.innerText = msj || "Verifique que el código sea válido";

        textoError.style.marginTop = '10px';
        textoError.style.fontWeight = 'bold';
        textoError.style.fontFamily = 'inherit';

        if (!textoError.parentNode) {
            contenedorPregunta.appendChild(textoError);
        }
    } else {
        textoError.style.display = 'none';
    }
}

function hideErrorMessage() {
    var textoError = document.getElementById('error-message');
    if (textoError) {
        textoError.style.display = 'none';
    }
}

window.addEventListener('beforeunload', function () {
    localStorage.removeItem('miVariable'); // Elimina el ítem
});
