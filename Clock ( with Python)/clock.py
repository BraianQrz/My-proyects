
import tkinter as tk
from tkinter import ttk
from tkinter import Label
from time import strftime

window = tk.Tk()
window.title("Simple clock")
window.config(bg="black")
window.geometry("350x250+10+10")
window.minsize(width=250, height=200)


window.columnconfigure(0, weight=15)
window.rowconfigure(0, weight=15)

window.columnconfigure(0, weight=1)
window.rowconfigure(1, weight=1)

window.columnconfigure(0, weight=1)
window.rowconfigure(2, weight=1)


text_hour = Label(window,  fg='aqua', bg='black')
text_hour.grid(row=0, sticky="nsew", ipadx=5, ipady=20)

text_day = Label(window,  fg='white',  bg='gray2', font=('Comic Sans MS', 20))
text_day.grid(row=1, sticky="nsew")

text_date = Label(window,  fg='gold',  bg='gray3',
                  font=('Comic Sans MS', 20, 'bold'))
text_date.grid(row=2, sticky="nsew")


def getTime():
    hour = strftime('%H:%M:%S')
    day = strftime('%A')
    date = strftime('%d-%m-%y')
    x = text_hour.winfo_height()
    t = int((x-5)*0.32)

    if day == 'Monday':
        day = 'Lunes'
    elif day == 'Tuesday':
        day = 'Martes'
    elif day == 'Wednesday':
        day = 'Miercoles'
    elif day == 'Thursday':
        day = 'Jueves'
    elif day == 'Friday':
        day = 'Viernes'
    elif day == 'Saturday':
        day = 'Sábado'
    else:
        day = 'Domingo'

    text_hour.config(text=hour, font=('Comic Sans MS', t))
    text_day.config(text=f"Hoy es: {day}")
    text_date.config(text=date)

    text_hour.after(1000, getTime)


getTime()

window.mainloop()
