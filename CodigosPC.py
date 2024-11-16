from datetime import datetime
import random

codigos = {
    '102': '2', '104': '2', '105': '2', '106': '2', '108': '2', '109': '2', '111': '2', '112': '2', '113': '2', '114': '2', '115': '2', '118': '2', '120': '2', '121': '2', '122': '2', '123': '2', '124': '2', '126': '2', '128': '2', '129': '2', '130': '2', '131': '2', '134': '2', '136': '2', '137': '2', '138': '2', '139': '2', '140': '2', '141': '2', '142': '2', '143': '2', '144': '2', '145': '2', '146': '2', '147': '2', '148': '2', '149': '2', '151': '2', '152': '2', '155': '2', '156': '2', '159': '2', '160': '2', '163': '2', '164': '2', '165': '2', '170': '2', '172': '2', '173': '2', '174': '2', '177': '2', '178': '2', '179': '2', '181': '2', '182': '2', '186': '2', '191': '2', '192': '2', '193': '2', '194': '2', '195': '2', '196': '2', '197': '2', '199': '2', '200': '2', '201': '2', '202': '2', '631': '2', '632': '2', '633': '2', '634': '2', '635': '2', '636': '2', '637': '2', '638': '2', '639': '2', '640': '2', '641': '2', '642': '2', '643': '2', '644': '2', '645': '2', '646': '2', '647': '2', '648': '2', '649': '2', '650': '2', '651': '2', '652': '2', '653': '2', '654': '2', '655': '2', '656': '2', '657': '2', '658': '2', '659': '2', '660': '2', '661': '2', '662': '2', '664': '2', '666': '2', '667': '2', '668': '2', '669': '2', '671': '2', '672': '2', '673': '2', '674': '2', '675': '2', '677': '2', '679': '2', '680': '2', '681': '2', '682': '2', '683': '2', '684': '2', '685': '2', '686': '2', '687': '2', '688': '2', '689': '2', '690': '2', '692': '2', '693': '2', '695': '2', '696': '2', '697': '2', '698': '2', '699': '2', '700': '2', '701': '2', '702': '2', '703': '2', '704': '2', '705': '2', '706': '2', '707': '2', '708': '2', '709': '2', '710': '2', '711': '2', '713': '2', '714': '2', '715': '2', '716': '2', '717': '2', '718': '2', '719': '2', '720': '2', '721': '2', '723': '2', '101': '3', '102': '3', '104': '3', '105': '3', '108': '3', '109': '3', '111': '3', '114': '3', '115': '3', '116': '3', '117': '3', '118': '3', '119': '3', '120': '3', '124': '3', '125': '3', '126': '3', '127': '3', '129': '3', '130': '3', '132': '3', '133': '3', '138': '3', '139': '3', '141': '3', '142': '3', '143': '3', '144': '3', '145': '3', '146': '3', '651': '3', '652': '3', '653': '3', '654': '3', '655': '3', '656': '3', '657': '3', '658': '3', '659': '3', '660': '3', '661': '3', '662': '3', '663': '3', '664': '3', '665': '3', '667': '3', '668': '3', '669': '3', '671': '3', '672': '3', '674': '3', '675': '3', '676': '3', '677': '3', '678': '3', '679': '3', '681': '3', '682': '3', '683': '3', '685': '3', '687': '3', '689': '3', '700': '3', '701': '3', '702': '3', '703': '3', '704': '3', '705': '3', '706': '3', '707': '3', '708': '3'
}

def generar_fecha_juliana():
    fecha_actual = datetime.now()
    fecha_juliana = fecha_actual.strftime('%j')
    return fecha_juliana

def ticket():
    return random.randint(1000, 9999)

def ultimos_dos_digitos_anio():
    anio_actual = datetime.now().year
    return str(anio_actual)[-2:]

def hora_militar():
    hora_actual = datetime.now().strftime('%H')
    return hora_actual

def canal():
    return random.choice([1, 2, 3, 5, 6, 7])

def PDV():
    pdv, pais = random.choice(list(codigos.items()))
    return pdv, pais

def CodigoPolloCampero():
    pdv, id_pais = PDV()
    anio = ultimos_dos_digitos_anio()
    hora = hora_militar()
    fecha_juliana = generar_fecha_juliana()
    num_ticket = str(ticket())
    canal1 = canal()

    codigo = (
        id_pais +
        "0" +
        anio[1] +
        hora[0] +
        fecha_juliana[0] +
        num_ticket[1] +
        fecha_juliana[1] +
        anio[0] +
        pdv[1] +
        num_ticket[0] +
        pdv[2] +
        num_ticket[2] +
        pdv[0] +
        str(canal1) +
        fecha_juliana[2] +
        hora[1] +
        num_ticket[3]
    )
    print("Codigo", codigo)
    print("Pais: ", id_pais)
    print("Pdv: ", pdv)
    print("Canales: ", canal1)
    print("Fecha juliana: ", fecha_juliana)

    return True

def Generador_de_codigos_incorrectos():
    print("\nTipos de errores:")
    print("1. País incorrecto")
    print("2. Fecha incorrecta")
    print("3. Canal incorrecto")
    print("4. PDV incorrecto")
    opcion = input("Seleccione el tipo de error que desea generar: ")
    cantidad = int(input("¿Cuántos códigos incorrectos desea generar? "))   

    for _ in range(cantidad):
        if opcion == '1':
            id_pais = str(4)  # Generar un país incorrecto
            pdv, _ = PDV()
        else:
            pdv, id_pais = PDV()
                
        anio = ultimos_dos_digitos_anio()
        hora = hora_militar()
        fecha_juliana = generar_fecha_juliana()
        num_ticket = str(ticket())

        if opcion == '2':
            fecha_juliana = int(fecha_juliana) - 100
            fecha_juliana = str(fecha_juliana)  # Generar una fecha incorrecta
                
        if opcion == '3':
            canal_incorrecto = 8  # Generar un canal incorrecto
        else:
            canal_incorrecto = canal()

        if opcion == '4':
            pdv = f'0{900}'  # Generar un PDV incorrecto

        codigo = (
            id_pais +
            "0" +
            anio[1] +
            hora[0] +
            fecha_juliana[0] +
            num_ticket[1] +
            fecha_juliana[1] +
            anio[0] +
            pdv[1] +
            num_ticket[0] +
            pdv[2] +
            num_ticket[2] +
            pdv[0] +
            str(canal_incorrecto) +
            fecha_juliana[2] +
            hora[1] +
            num_ticket[3]
        )
        print(codigo)
        print("pais: ", id_pais)
        print("pdv: ", pdv)
        print("canales: ", canal_incorrecto)
        print("fecha juliana: ", fecha_juliana)
    return codigo

def desarmar_codigo(codigo):
    if len(codigo) != 17:
        print("Código inválido. La longitud debe ser de 17 caracteres.")
        return

    # Mapeo de posiciones según la estructura del código generado
    id_pais = codigo[0]

    pdv = codigo[1] + codigo[12] + codigo[8] + codigo[10]

    anio = codigo[7] + codigo[2]

    hora = codigo[3] + codigo[15]

    fecha_juliana = codigo[4] + codigo[6] + codigo[14]

    num_ticket = codigo[9] + codigo[5] + codigo[11] + codigo[16]

    canal = codigo[13]

    # Mostrar las partes extraídas
    print("Id País:", id_pais)
    print("PDV:", pdv)
    print("Año:", anio)
    print("Hora:", hora)
    print("Fecha Juliana:", fecha_juliana)
    print("Número de Ticket:", num_ticket)
    print("Canal:", canal)

    return {
        'id_pais': id_pais,
        'pdv': pdv,
        'anio': anio,
        'hora': hora,
        'fecha_juliana': fecha_juliana,
        'num_ticket': num_ticket,
        'canal': canal
    }

def main():
    while True:
        print("\nMenu:")
        print("1. Generar código correcto")
        print("2. Generar código incorrecto")
        print("3. Desarmar código")
        opcion = input("Seleccione una opción: ")

        if opcion == '1':
            Cantidad = input("Cantidad de códigos a generar: ")
            for _ in range(int(Cantidad)):
                CodigoPolloCampero()
        elif opcion == '2':
            print("Código incorrecto: ")
            Generador_de_codigos_incorrectos()
        elif opcion == '3':
            while True:
                codigoadesarmar = input("Ingrese el código a desarmar: ")
                desarmar_codigo(codigoadesarmar)
        else:
            print("Opción no válida, por favor seleccione nuevamente.")

if __name__ == "__main__":
    main()
