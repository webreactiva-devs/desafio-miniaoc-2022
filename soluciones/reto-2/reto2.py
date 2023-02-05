import requests
import time
# ------------------------------------------------
def peticion (url:str, datos:dict):
    '''
    hacemos una peticion POST al servidor con las coordenadas
    

    '''
    respuesta = requests.post(url,json=datos)
    como_json = respuesta.json()
    
    salida = como_json["status"]
    fallo = "Intenténtalo de nuevo, malandriner nunca se rinde"
    
    if salida == fallo: #si no obtenemos la respuesta esperada pasamos al sieguiente dato
        return
    print (datos, salida)
    print (como_json)
    

   

#direccion hacia la que lanzar las peticiones
url='https://donde-esta-supercoco-delineas.vercel.app/api/reto/2'


#datos= {"solution":"{2.0,3.5}"}
#peticion (url, datos) 

pista ="3311014444"


#lista que contendra todos las latitudes posibles
latitud =[]
for i in range (0,2):
    for j in range (i,(10-(i+1))):
         #print ("i",i,"j",j, "- "+pista[0:i+1] + '.' + pista[i+1:j+2])
         latitud.append(pista[0:i+1] + '.' + pista[i+1:j+2])
        #latitud.append('-'+ pista[0:i+1] + '.' + pista[i+1:j+2])  

#lista para guardar las posibles coordenadas
coordenada = []

#se itera la cadena para sacar todas las posibles soluciones (sin filtros)
for i in latitud:
    
    pista2= pista[len(i)-1:10]
    tamaño = len(pista2)
    
    for j in range(0, tamaño-1):
        #print (pista2[0:j+1]+'.'+pista2[j+1:tamaño])
        #coordenada positiva
        coordenada.append([i,pista2[0:j+1]+'.'+pista2[j+1:tamaño]])
        #coordenada latitud negativa longitud positiva
        coordenada.append(['-'+i,pista2[0:j+1]+'.'+pista2[j+1:tamaño]])
        #coordenada latitud negativa longitud negativa
        coordenada.append(['-'+i,'-'+pista2[0:j+1]+'.'+pista2[j+1:tamaño]])
        #coordenada latitud positiva longitud negativa
        coordenada.append([i,'-'+pista2[0:j+1]+'.'+pista2[j+1:tamaño]])


print ("tenemos una lista sin filtrar con ", len(coordenada),"elementos. Preguntando al servidor! paciencia" )


#generar diccionario de una  coordenada  para hacer la peticion a la url
for c in coordenada:
    
    cadenaLat = str(c[0])
    cadenaLon = str(c[1])
    coor = "{"+cadenaLat+","+cadenaLon+"}"
    #dato ="{solution:{"+cadenaLat+","+cadenaLon+"}"
    
    dato={"solution":coor}
    peticion (url,dato)
    
print ("Acabe!!! \n")

'''
#coordenadas solucion

ref= {"solution":"{-33.110,144.44}"}
print (ref)
peticion (url,ref)
'''