## Fish Game 

This is a game made with typescript and javascript, it consists in a server who has players that connect to the server, and the server put them in a room where he will send and 
manage the information of the game( players, games, rooms, each player features, etc.). To manage the requests made by the client we have used websocket which is a very powerful
tool and easy to use, and it allows you to manage a server very easy.

### Goals Fulfilled

- " Implementación de un tablero de tamaño NxN correctamente generado"

- " Configuración inicial de los jugadores en las esquinas del tablero"

- " Configuración del servidor para manejar conexiones de clientes vía WebSockets"

- "Envío y recepción de mensajes de manera eficiente entre cliente y servidor"

- "Sincronización en tiempo real del estado del juego en todos los clientes conectados"

- "Representación visual dinámica del tablero y los jugadores según datos del servidor"

- "Implementación de eventos de juego: desplazamiento, rotación y disparo." (Only rotation and movement more or less also)

- "Diseño de una interfaz intuitiva para la interacción del jugador"

- "Adaptabilidad del cliente a posibles rediseños o mejoras futuras" (More or less)

- "Implementación de salas para gestionar partidas independientes"

- " Control centralizado del estado del juego en el servidor."

- " Compartición eficiente de datos del mapa entre todos los clientes."

- " Uso adecuado de clases, objetos JSON y patrones de diseño"

- "Código modular y bien estructurado que facilite la escalabilidad"



## Goals Doesn't achieved

- Refactorización del cliente para adaptarlo a Angular.
- Implementación de servicios y componentes en Angular para la gestión del juego.
- Manejo de finalización de partidas y asignación de ganadores.
- Manejo de desconexiones y reconexiones de jugadores sin afectar la partida.
- Implementación de ataques entre jugadores con reglas de distancia.
- Implementación de casillas de escondite con normas de posicionamiento
adecuadas.



# For Raul

Raul como veras, casi todo el codigo lo he intentado hacer lo mas en inglés que he podido, esto es porque quiero coger la buena praxis de hacer los comentarios en ingles, para que 
en la empresa pues no quedar como raro, y mostrar buenas practicas. He usado patrones de factoria y te puedes preguntar porque? Bueno los he usado porque en el servidor se guardaran
unos datos que pueden ser mas privados o que no son necesarios enviarlos al cliente ya que ello supondria errores; un ejemplo de esto es por ejemplo el que tuve no se si te acuerdas
de que enviaba el socket entero y eso hacia StackOverflow de la pila de memoria por llamadas recursivas, bueno para solucionarlo se me ocurrio usar una factoria, y directamente
obtengo el tupo de jugador o de juego que yo quiera en el momento solicitado. Esto además considero que puede ser escalable de cara al futuro ya que puedes implementar propiedades
en el juego del lado del servidor que no deben estar en el cliente y esto es muy útil ya que como puedo configurar el patron factoria elijo que envio y que no envio y es mucho mas 
sencillo. Tambien he implementado lo que comentaste en clase de que el tablero contenga objetos en lugar de numeros para mejorar la accesibilidad, entre otras cosas que he estado
haciendo.

