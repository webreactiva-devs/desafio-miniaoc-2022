import string

def decodedMsg (msg:str, offset:int):
    '''
    Devuelve el mensaje descifrado  usando el metodo cesar.

        Parameters:
            msg (str): cadena de texto cifrada
            offset (int): entero usado para encriptar el mensaje
        Returns:
            msgDescifrado (str): mensaje descifrado
    
    '''

    #comprobamos que los argumentos son pasados en orden y del tipo esperado
    for n in (msg,offset):
        if not isinstance (msg,str) and not isinstance (offset,int):
            raise TypeError

    #creamos una lista con el abecedario
    abc= list(string.ascii_uppercase)

    #añadimos a la lista una ultima posicion que es el espacio
    abc.append (" ")

    #valor del desplazamiento usado en la codificacion
    desplazamiento = offset

    #se convierte a lista el mensaje secreto
    list_msg = list(msg)


    #lista resultante con el mensaje decodificado
    list_salida = []

    #recorrer el mensaje codificado buscando cada elemento en la referencia
    for c in list_msg:               
        #salto en la ejcucion del for cuando encotramos un espacio
        if abc.index(c) >= 26:  
            list_salida.append(" ") 
            continue

        indice = abc.index(c)
        #si superamos el tamaño de nuestra lista, hay que reposicionar para encontrar el caracter adecuado
        if  (indice+desplazamiento >=26):
            indice = (indice-26)
        #añadimos el caracter a la lista decodificada
        list_salida.append(abc[indice+desplazamiento])

    #convertir la lista a cadena de caracteres
    msgDescifrado  = ''.join(list_salida)

    return msgDescifrado
    

msg = "NVI EPVI YZ BVUOZGPBVOSZ"
offset = 5
salida = decodedMsg (msg, offset)

print ( salida)