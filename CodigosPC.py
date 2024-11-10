from datetime import datetime
import random

PDVS = [
    115, 109, 136, 170, 177, 181, 191, 202, 632, 635, 638, 639, 669, 677, 692, 702, 711, 720, 124, 141, 143, 182, 192, 196, 637, 648, 658, 659, 671, 681, 690, 703, 705, 718, 146, 178, 179, 197, 633, 634, 640, 644, 654, 656, 679, 693, 698, 699, 700, 708, 112, 114, 120, 134, 139, 149, 164, 174, 186, 642, 651, 668, 686, 688, 689, 696, 701, 707, 709, 715, 723, 130, 138, 140, 142, 144, 155, 160, 163, 641, 646, 653, 672, 673, 687, 697, 710, 714, 716, 145, 159, 631, 643, 650, 652, 655, 660, 662, 667, 680, 704, 106, 108, 118, 121, 126, 137, 147, 148, 152, 156, 173, 193, 195, 199, 200, 201, 645, 657, 661, 664, 706, 713, 721, 128, 129, 131, 151, 165, 172, 194, 636, 647, 649, 666, 674, 675, 682, 683, 684, 685, 695, 717, 719, 102, 101, 111, 129, 141, 146, 653, 660, 671, 682, 685, 689, 125, 139, 142, 144, 651, 669, 675, 687, 101, 118, 668, 700, 704, 102, 132, 133, 657, 661, 676, 678, 108, 115, 127, 652, 656, 658, 659, 664, 665, 679, 681, 702, 703, 706, 116, 117, 124, 138, 143, 662, 667, 708, 104, 114, 120, 126, 655, 672, 674, 701, 707, 105, 109, 119, 130, 145, 654, 663, 677, 683, 705
]
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
    return random.randint(1, 7)

def pais():
    return random.choice([2, 3])

def PDV():
    pdv = random.choice(PDVS)
    return f'0{pdv}'

def CodigoPolloGrangero():
        id_pais = str(pais())
        pdv = PDV()
        anio = ultimos_dos_digitos_anio()
        hora = hora_militar()
        fecha_juliana = generar_fecha_juliana()
        num_ticket = str(ticket())

        codigo = (
            id_pais +
            pdv[0] +
            anio[1] +
            hora[0] +
            fecha_juliana[0] +
            num_ticket[1] +
            fecha_juliana[1] +
            anio[0] +
            pdv[2] +
            num_ticket[0] +
            pdv[3] +
            num_ticket[2] +
            pdv[1] +
            str(canal()) +
            fecha_juliana[2] +
            hora[1] +
            num_ticket[3]
        )

        return codigo

def main():
    cantidad = int(input("¿Cuántos códigos de 17 dígitos desea generar? "))
    for _ in range(cantidad):
        print("Código: ", CodigoPolloGrangero())
        print("punto de venta: ", PDV())


if __name__ == "__main__":
        main()
