# Reto 3: Endiablado

SuperCoco se ha escondido en un lugar que cree que es definitivo.

Pero, como buen peluche que es, se ha dejado una puerta abierta para descubrir en qué lugar del globo se encuentra.

😈 Eso si, es endiablada.

Supongamos una matriz de 7 x 7. Cada uno de las 49 casillas tiene una coordenada, que va desde la {0,0} a la {6,6} siguendo los ejes horizontales y verticales.

![casillas_resize](https://user-images.githubusercontent.com/1122071/203628575-109a6d88-3da8-4790-a809-252a6623895e.png)


SuperCoco ha preparado esta matriz para poderse “colorear”. Esto es, marcar unas casillas a “true” y otros a “false”.

Así sería la matriz si representa una A.

![casillas-a_resize](https://user-images.githubusercontent.com/1122071/203628602-c2c3ece0-e593-426d-9a79-e777240454e6.png)


Por tanto los puntos que devuelven `true` son:

`{0,6},{1,6},{2,6},{3,6},{4,6},{5,6},{6,6},{0,5},{0,5},{0,4},{6,5},{6,4},{1,3},{2,3},{3,3},{4,3},{5,3},{6,3},{0,2},{0,1},{0,0},{6,2},{6,1},{6,0}`


## Tu reto es el siguiente

Se trata ahora de adivinar cuál es la siguiente coordenada de la posición de SuperCoco. 

👉 **La primera es un ‘3’**

La primera llamada a la API que conecta con el GPS de SuperCoco es esta:

```md
https://donde-esta-supercoco.vercel.app/api/reto/3
```

Si envías una petición tipo `POST` con este cuerpo:

```md
{
  "checkpoint": "{0,6}"
}
```
 
La API tiene que developer `status: true`.  

👉 Eso quiere decir que el dígito que está escondido en la matriz en ese punto tiene esa casilla coloreada.

Si envías una petición tipo `POST` con este cuerpo:

```md
{
  "checkpoint": "{1,5}"
}
```
 
Obtendrás un  error 404 (y un mensajito)

👉 Lo que quiere decir que NO está coloreada y por tanto no forma parte del dibujo.

|

|

Probando esas coordenadas tendrás al final qué casillas de la matriz están coloreadas y podrás ver un caracter ahí.

Estos caracteres pueden ser los números del 1 al 9, una P y una C (mayúsculas).

- No hay negativos.
- Cada ruta de la API contiene un solo caracter.

---

### ¿Para qué quiero ese carácter?

El caracter obtenido es la letra que tienes que añadir en la ruta de la API para seguir obteniendo las coordenadas.

Imagínate que en `https://donde-esta-supercoco.vercel.app/api/reto/3` obtienes las casillas coloreadas que hacen un `0`.

La siguiente ruta de la API sería `https://donde-esta-supercoco.vercel.app/api/reto/30`

Y ahí tendrías que volver a adivinar el caracter escondido en la matriz para obtener el siguiente caracter para añadir a la ruta del endpoint.

El resultado final podría ser algo como esto:

`https://donde-esta-supercoco.vercel.app/api/reto/30P31C45P1`

Sabrás que es la solución correcta porque obtendrás otro mensaje diferente con un campo `success: true`.

Nota. Aunque da igual para el reto, 30P31C45P1 equivale a las coordenadas `30.31,45.1`  (la ‘P’ es un punto y la ‘C’ una coma).

**🚨 Atención**

SuperCoco es muy listo y ha añadido una ruta donde el mensaje que obtendrás será completamente distinto y no se corresponderá con resultados de la matriz. Es antihackers y te dirá que tienes que añadir una letra concreta a la ruta de la API para seguir jugando.


## Límite de entrega

1 de Diciembre a las 18:00 UTC+1 (la hora de Valladolid, Spain, ya sabes).

## Sistema de puntos

1. Un punto por la solución correcta.
2. Dos puntos más si presentas la solución en directo el 1 de Diciembre.
3. Dos puntos más si inlcuyes test unitarios en la solución (al menos 3 tests unitarios)
4. Tres puntos más si utilizas en la solución un lenguaje de programación desconocido para ti.
