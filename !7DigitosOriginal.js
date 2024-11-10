var pase = false; // Declarar 'pase' en el ámbito global para que sea accesible en todas las funciones

Qualtrics.SurveyEngine.addOnload(function()
{
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

Qualtrics.SurveyEngine.addOnPageSubmit(function()
{
    /* Aquí puedes agregar código si necesitas ejecutar algo al enviar la página */
});

Qualtrics.SurveyEngine.addOnReady(function()
{
    /* Aquí puedes agregar código que se ejecute cuando la página esté completamente cargada */
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
    /* Aquí puedes agregar código que se ejecute cuando la página se descargue */
});

function validCode(digits, that) {
    if (digits.length > 17) {
        return; // Si tiene más de 17 dígitos, no hacer nada y salir de la función
    }

    if (digits.length == 17) {
        var text = digits;
        // Número de la tienda
        var pdv1 = text.substring(1, 2);
        var pdv2 = text.substring(12, 13);
        var pdv3 = text.substring(8, 9);
        var pdv4 = text.substring(10, 11);
        var pdv = pdv1 + pdv2 + pdv3 + pdv4;
        Qualtrics.SurveyEngine.setEmbeddedData('PDV', pdv);
		alert(pdv);

        // País
        var pais = text.substring(0, 1);
        var pais_nom;
        switch (pais) {
            case "1":
                pais_nom = "MEX";
                break;
            case "2":
                pais_nom = "GTM";
                break;
            case "3":
                pais_nom = "SLV";
                break;
            default:
                pais_nom = "Desconocido";
        }
        Qualtrics.SurveyEngine.setEmbeddedData('Pais_id', pais);
        Qualtrics.SurveyEngine.setEmbeddedData('Pais', pais_nom);

        // Fecha año
        var anio1 = text.substring(7, 8);
        var anio2 = text.substring(2, 3);
        var anio = "20" + anio1 + anio2;

        // Juliana día y mes
        var juliana1 = text.substring(4, 5);
        var juliana2 = text.substring(6, 7);
        var juliana3 = text.substring(14, 15);
        var juliana = juliana1 + juliana2 + juliana3;

        Qualtrics.SurveyEngine.setEmbeddedData('Juliana', juliana);

        // Función para determinar si un año es bisiesto
        function isLeapYear(year) {
            return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        }

        // Determinar el año gregoriano a partir del día juliano
        var year = parseInt(anio);
        var daysInYear = (isLeapYear(year)) ? 366 : 365;
        while (juliana > daysInYear) {
            juliana -= daysInYear;
            year++;
            daysInYear = (isLeapYear(year)) ? 366 : 365;
        }

        // Calcular el mes y el día gregoriano
        var month = 1;
        var day = parseInt(juliana);
        var monthDays = [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        while (day > monthDays[month - 1]) {
            day -= monthDays[month - 1];
            month++;
        }

        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;

        var fecha_p = day + "/" + month + "/" + year;
        var fecha = year + "-" + month + "-" + day + "T06:00:00.000Z";

        Qualtrics.SurveyEngine.setEmbeddedData('Fecha', fecha);
        Qualtrics.SurveyEngine.setEmbeddedData('Fecha_P', fecha_p);
        let fecha_comp = new Date(year, month - 1, day);
        let fechaActual = new Date();

        // Fecha actual
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        var fecha_actual = dd + "/" + mm + "/" + yyyy;

        var fecha_actual_comp = new Date(fecha_actual);

        var canal_num = text.substring(13, 14);
        var canal;
        switch (canal_num) {
            case "1":
                canal = "Llevar";
                break;
            case "3":
                canal = "Auto";
                break;
            case "4":
                canal = "Institucion";
                break;
            case "5":
                canal = "CAD";
                break;
            case "2":
            case "6":
                canal = "Mesas";
                break;
            case "7":
                if (pais == "2") {
                    canal = "3PD";
                } else {
                    canal = "Desconocido";
                }
                break;
            default:
                canal = "Desconocido";
        }
        Qualtrics.SurveyEngine.setEmbeddedData('Canal', canal);

        // Ticket
        var ticket1 = text.substring(9, 10);
        var ticket2 = text.substring(5, 6);
        var ticket3 = text.substring(11, 12);
        var ticket4 = text.substring(16, 17);
        var ticket = ticket1 + ticket2 + ticket3 + ticket4;
        Qualtrics.SurveyEngine.setEmbeddedData('Ticket', ticket);

        // Hora
        var hora1 = text.substring(3, 4);
        var hora2 = text.substring(15, 16);
        var hora = hora1 + hora2;
        Qualtrics.SurveyEngine.setEmbeddedData('Hora', hora);

        let valor = localStorage.getItem('miVariable');

        // Si no existe, inicializa a 0
        if (valor === null) {
            valor = 0;
        } else {
            // Convierte a número si ya existe
            valor = parseInt(valor);
        }

        pase = true; // Asumimos que el código es válido inicialmente
        var msj = "";

        // Validaciones
        if (pais != "1" && pais != "2" && pais != "3") {
            pase = false;
            msj = "Verifique que el código sea válido pais";
            valor += 1;
            localStorage.setItem('miVariable', valor);
        }

        var diferenciaEnDias = Math.floor((fechaActual - fecha_comp) / (1000 * 60 * 60 * 24));
        if (diferenciaEnDias > 7) {
            pase = false;
            //alert("La fecha no puede ser mayor a 7 días" + diferenciaEnDias);
            msj = "Verifique que el código sea válido fecha";
            valor += 1;
            localStorage.setItem('miVariable', valor);
        }

        if (diferenciaEnDias < 0) {
            //alert("La fecha no puede ser mayor a la actual " + diferenciaEnDias);
            pase = false;
            msj = "Verifique que el código sea válido dias";
            valor += 1;
            localStorage.setItem('miVariable', valor);
        }

        if (canal_num > 7 || canal_num == 0 || canal == "Desconocido") {
            pase = false;
            msj = "Verifique que el código sea válido canal";
            valor += 1;
            localStorage.setItem('miVariable', valor);
        }

        // Mostrar u ocultar el botón "Siguiente" y el mensaje de error
        if (pase == true || valor >= 2) {
            var var_algo = "Algoritmo invalido";
            that.showNextButton();
            if (valor >= 2 ) {
                Qualtrics.SurveyEngine.setEmbeddedData('Algoritmo invalido', var_algo);
                Qualtrics.SurveyEngine.setEmbeddedData('Algoritmo', var_algo);
            }
        } else {
            that.hideNextButton();
        }

        // Manejo del mensaje de error
        // Obtener o crear el elemento de mensaje de error
        var textoError = document.getElementById('error-message');
        if (!textoError) {
            textoError = document.createElement('div');
            textoError.id = 'error-message';
        }

        // Obtener el contenedor de la pregunta
        var contenedorPregunta = document.querySelector('div.QuestionBody');

        // Verificar la condición y mostrar el mensaje si es necesario
        if (valor < 2 && pase == false) {
            textoError.style.display = 'block';
            textoError.innerText = msj || "Verifique que el código sea válido"; // Mostrar el mensaje de error específico

            // Estilos para el mensaje de error
            textoError.style.marginTop = '10px';
            textoError.style.fontWeight = 'bold';
            textoError.style.fontFamily = 'inherit';

            // Añadir el mensaje de error al contenedor de la pregunta si aún no está añadido
            if (!textoError.parentNode) {
                contenedorPregunta.appendChild(textoError);
            }
        } else {
            textoError.style.display = 'none'; // Ocultar el mensaje si no hay error
        }
    } else {
        pase = false; // Si el código no tiene 17 dígitos, no es válido aún
        that.hideNextButton();

        // Ocultar el mensaje de error si el código aún no tiene 17 dígitos
        var textoError = document.getElementById('error-message');
        if (textoError) {
            textoError.style.display = 'none';
        }
    }
}

window.addEventListener('beforeunload', function () {
    localStorage.removeItem('miVariable'); // Elimina el ítem
});