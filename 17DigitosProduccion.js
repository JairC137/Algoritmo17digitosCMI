Qualtrics.SurveyEngine.addOnload(function()
{
	//https://cmicx.qualtrics.com/ControlPanel/Graphic.php?IM=IM_YxeV6FlYibDxiIx
	var that = this;
	var q = jQuery("#"+this.questionId);
	this.hideNextButton();

	q.find("input[type=text]").on("paste , touchstart", function(element) {});	
	jQuery("#Wrapper").on("paste , touchend", function(element) {		
		validCode(element.originalEvent["clipboardData"].getData('text'), that);
	});
	
	q.find("input[type=text]").on("keydown , touchstart", function() {});
	jQuery("#Wrapper").on("keyup , touchend", function(element) {		
		validCode(element.target.value, that);
	});
});

Qualtrics.SurveyEngine.addOnPageSubmit(function()
{
	
});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});

function validCode(digits, that) {
	if(digits.length == 17){
		var text = digits;
		//Numero de la tienda
		var pdv1 = text.substring(1, 2);
		var pdv2 = text.substring(12, 13);
		var pdv3 = text.substring(8, 9);
		var pdv4 = text.substring(10, 11);
		var pdv = pdv1 + pdv2 + pdv3 + pdv4;
        
		Qualtrics.SurveyEngine.setEmbeddedData( 'PDV', pdv);
		
		alert(pdv)

		//Pais
		var pais = text.substring(0, 1);
		var pais_nom;
		switch(pais)
		{
			case "1":
				pais_nom = "MEX"
				break;
			case "2":
				pais_nom = "GTM"
				break;
			case "3":
				pais_nom = "SLV"
				break;
		}
		Qualtrics.SurveyEngine.setEmbeddedData( 'Pais_id', pais);
		Qualtrics.SurveyEngine.setEmbeddedData( 'Pais', pais_nom);
		
		//Fecha anio
		var anio1 = text.substring(7, 8);
		var anio2 = text.substring(2, 3);
		var anio = "20" + anio1 + anio2;

		//Juliana dia y mes

		var juliana1 = text.substring(4, 5);
		var juliana2 = text.substring(6, 7);
		var juliana3 = text.substring(14, 15);
		var juliana = juliana1+juliana2+juliana3;
		
		Qualtrics.SurveyEngine.setEmbeddedData( 'Juliana', juliana);

// Determinar el año gregoriano a partir del día juliano
var year = anio;
var daysInYear = 365;
while (juliana > daysInYear) {
    year++;
    daysInYear = (isLeapYear(year)) ? 366 : 365;
    juliana -= daysInYear;
}

// Calcular el mes y el día gregoriano
var month = 1;
var day = juliana;
var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

if (isLeapYear(year)) {
    monthDays[1] = 29; // Febrero tiene 29 días en un año bisiesto
}

while (day > monthDays[month - 1]) {
    day -= monthDays[month - 1];
    month++;
}

		if (day < 10) day = '0' + day;
		if (month < 10) month = '0' + month;

		var fecha_p = day + "/" + month + "/" + year;
		var fecha = year + "-" + month + "-" + day + "T06:00:00.000Z";

		// Función para d-e-erminar si un año es bisiesto
		function isLeapYear(year) {
    	return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
		}
		
		Qualtrics.SurveyEngine.setEmbeddedData( 'Fecha', fecha);
		Qualtrics.SurveyEngine.setEmbeddedData( 'Fecha_P', fecha_p);
		
		//Fecha actual
		const today = new Date();
		const yyyy = today.getFullYear();
		let mm = today.getMonth() + 1;
		let dd = today.getDate();

		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;

		var fecha_actual = dd + mm  + yyyy;

		var canal_num = text.substring(13, 14);
		var canal;
		switch(canal_num)
		{
			case "1":
				canal = "Llevar"
				break;
			case "3":
				canal = "Auto"
				break;
			case "4":
				canal = "Institucion"
				break;
			case "5":
				canal = "CAD"
				break;
			case "2":
				canal = "Mesas"
				break;
			case "6":
				canal = "Mesas"
				break;
			case "7":
				if(pais = 2)
				{canal = "3PD"}
				break;
		}
		Qualtrics.SurveyEngine.setEmbeddedData( 'Canal', canal);

		//Ticket
		var ticket1 = text.substring(9, 10);
		var ticket2 = text.substring(5, 6);
		var ticket3 = text.substring(11, 12);
		var ticket4 = text.substring(16, 17);
		var ticket = ticket1 + ticket2 + ticket3 + ticket4;
		Qualtrics.SurveyEngine.setEmbeddedData( 'Ticket', ticket);

		//Hora
		var hora1 = text.substring(3, 4);
		var hora2 = text.substring(15, 16);
		var hora = hora1 + hora2;
		Qualtrics.SurveyEngine.setEmbeddedData( 'Hora', hora);
	
		var pase = false;
		if(parseInt(yyyy) > parseInt(anio))
		{
			pase = true;
		}
		else if (parseInt(yyyy) == parseInt(anio))
		{
			if(parseInt(mm) > parseInt(month))
			{
				pase = true;	
			}
			else if(parseInt(mm) == parseInt(month))
			{
				if(parseInt(dd) >= parseInt(day))
				{
					pase = true;
				}
			}
		}
		//Lógica para validar si es un año válido y por lo tanto puede avanzar a las siguiente pregunta
		if(pase == true){ //Agregar lógica de que la fecha es la correcta
			that.showNextButton();
			//alert("PASASTE MIJO");
			
		}else{
			that.hideNextButton();
			alert('Verifique que el código sea válido');
		}	
	}
	/*else{
		that.hideNextButton();
	}*/
	/*var that = this;
	var msg = 'Número inválido';
	alert(msg);*/
}