print("Esta es una historia en la que tu debes crear los protagonistas y el final")
end = ""

protagonist = input("Escribe el nombre del protagonista: ")
supporting_actor = input("Escribe el nombre del personaje secundario: ")
adjective = input("Escribe un adjetivo para el protagonista: ")
color = input("Escribe un color: ")
place = input("Escribe el lugar de la historia: ")
object = input("Escribe el nombre de un objeto al azar: ")

happy_end = f"El/a {protagonist} vio esto y se la devolvió,\n meses más tarde el/la {protagonist} ganó un sorteo de lotería,\n y la persona que le entrego el premio\n fue el/la {supporting_actor}¿Buena Suerte o casualidad?"
unhappy_end = f"El/a {protagonist} vio esto y no se la devolvió,\n meses más tarde el/la {protagonist} perdió su {object},\n y refunfuñó -'¿Por qué me pasa esto a mi?' "
choice = int(input(
    "Elija el final ==> Ingrese '1' para final feliz o '2' para final no feliz: "))

if choice == 1:
    end = happy_end
elif choice == 2:
    end = unhappy_end
else:
    choice = int(input(
        "Elija el final ==> Ingrese '1' para final feliz o '2' para final no feliz: "))


history = f"----------UNA HISTORIA----------\n Había una vez un/a {protagonist} de color {color},\n y este/a era {adjective}.\nEste/a vivia en {place}\n Un día a un/a {supporting_actor} se le cayó su {object} y\n {end}\n----------FINAL----------"


print(history)
