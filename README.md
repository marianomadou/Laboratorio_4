# Laboratorio 4

## Laboratorio 4 Tecnicatura Universitaria en Programación. UTN-FRA

**Autores: Prof. Villegas Octavio**

## Desarrollado con Angular 8 - Bootstrap: 4.3.1 - Firebase: 7.2.1 - Jquery: 3.4.1 - Angular Material

![Laboratorio_4](https://github.com/marianomadou/TPBD2/blob/master/Documentacion/header_app.jpg)

## PWA con API Marvel

**https://developer.marvel.com/docs**

Firebase deploy en:

### https://marvel-heroes-a5272.firebaseapp.com/

![Laboratorio_4](https://github.com/marianomadou/Laboratorio_4/blob/master/Documentacion/marvel_header.jpg)

### Sección Personajes

![Laboratorio_4](https://github.com/marianomadou/Laboratorio_4/blob/master/Documentacion/marvel_personajes.jpg)

### Sección Comics

![Laboratorio_4](https://github.com/marianomadou/Laboratorio_4/blob/master/Documentacion/marvel_comics.jpg)

### Sección Series

![Laboratorio_4](https://github.com/marianomadou/Laboratorio_4/blob/master/Documentacion/marvel_series.jpg)

---

## Angular Crud con Material

Firebase deploy en:

### https://relevamientovisual-f186f.firebaseapp.com/home/

![CRUD Angular Material](https://github.com/marianomadou/Laboratorio_4/blob/master/Documentacion/crud1.jpg)

![CRUD Angular Material](https://github.com/marianomadou/Laboratorio_4/blob/master/Documentacion/crud2.jpg)


---

## TP Sala de Juegos

Github deploy en:

### https://marianomadou.github.io/

Build: 

### https://github.com/marianomadou/marianomadou.github.io

Repositorio: 

### https://github.com/marianomadou/Laboratorio_4/tree/master/TP-Sala-de-Juegos-ANGULAR--master

Tenemos una aplicación de juegos que permite a nuestros usuarios (jugadores) medir sus capacidades cognitivas y motrices, debe ser simple de utilizar y que nos permita tener estadísticas de cada jugador y de cada juego. 

Los juegos deben guardar toda la información que sea importante para cada juego en particular.

Solo se puede ingresar si es un usuario registrado o se registra.

![Sala de Juegos](https://github.com/marianomadou/Laboratorio_4/blob/master/Documentacion/sala_juegos1.jpg)

**A continuación se detalla la forma de corrección del tp , con los elementos excluyentes y el valor de cada punto.**

Se debe lograr 80 puntos para aprobar el TP.

![Sala de Juegos](https://github.com/marianomadou/Laboratorio_4/blob/master/Documentacion/sala_juegos6.jpg)

1. (1 pt) Presentarlo en un servidor WEB . ! Excluyente
2. (1 pt) Presentarlo en un servidor GitHub .
3. (2 pt) Estructura de herencia y utilización de polimorfismo. ! Excluyente
4. (2 pt) Lógica de los juegos. ! Excluyente .
5. (2 pt) Almacenamiento de datos. ! Excluyente
6. (2 pt) Juego agregado por el alumno. ! Excluyente
7. (20 pts.) Experiencia de navegación de la app.
8. (30 pts.) Diseño de pantallas de los juegos.
9. (10 pts.) Información clara y completa al mostrar mensajes o hacer acciones.
10. (30 pts.) Experiencia de usuario en los juegos.
11. (10 pts.) Utilización de los estilos con variables sass
12. (10 pts) Utilización de primeNG
13. (10 pts) Utilización de material design.
14. (10 pts) Utilización de animaciones(css o con ts)

**Juegos que debe tener:**

### Anagrama.(se muestra una palabra desordenada y se debe ingresar la correcta)

![Sala de Juegos](https://github.com/marianomadou/Laboratorio_4/blob/master/Documentacion/sala_juegos2.jpg)

### Piedra papel tijera.(se debe elegir una de las opciones )

![Sala de Juegos](https://github.com/marianomadou/Laboratorio_4/blob/master/Documentacion/sala_juegos7.jpg)

### Agilidad Aritmética. (se presenta una cuenta aritmética y el jugador un tiempo para contestar).

![Sala de Juegos](https://github.com/marianomadou/Laboratorio_4/blob/master/Documentacion/sala_juegos8.jpg)

### Adivina el número.(se debe adivinar el número secreto).

![Sala de Juegos](https://github.com/marianomadou/Laboratorio_4/blob/master/Documentacion/sala_juegos5.jpg)

### TaTeTi

![Sala de Juegos](https://github.com/marianomadou/Laboratorio_4/blob/master/Documentacion/sala_juegos3.jpg)

### Ahorcado

![Sala de Juegos](https://github.com/marianomadou/Laboratorio_4/blob/master/Documentacion/sala_juegos4.jpg)

---

# La Comanda Dinner

Firebase deploy en:

### https://comandangular.firebaseapp.com/bienvenida


### Pantalla de Bienvenida
Los usuarios se encontrarán con una breve descripción del restaurante Dinner, imágenes de las mesas y las comodidades que ofrece el lugar. El la sección superior de la página se encuentra el botón para acceder a logueo, tanto para clientes como para empleados de Dinner.

<a href="https://www.youtube.com/embed/SCS2barPlU8" target="_blank"><img src="https://github.com/marianomadou/Laboratorio_4/blob/master/SegundoParcial/capturas_de_pantallas/bienvenida_dinner.JPG" alt="pantalla de bienvenida" width="882" height="380"/></a>

### Pantalla de Logueo
Por intermedio de la pantalla de logueo podrán acceder tanto clientes como empleados, teniendo la posibilidad de además poder loguearse con redes sociales (google). Adicionalmente, los usuarios del sistema que aún no tengan creada una cuenta podrán hacerlo en esta instancia. 
Si es empleado y recién está haciendo su primer registro, deberá hacerlo como si fuera un cliente y después el socio podrá hacer los cambios necesarios para implementar un nuevo rol de este usuario. 

*Debajo se encuentra un ejemplo de logueo de cliente y de empleado, ingresando a sus diferentes rutas seguras por intermedio de sus respectivos guards.*

<a href="https://www.youtube.com/embed/dFp_ZLctoxw" target="_blank"><img src="https://github.com/marianomadou/Laboratorio_4/blob/master/SegundoParcial/capturas_de_pantallas/login.JPG" alt="pantalla de logueo" width="882" height="487"/></a>


### El cliente realiza un pedido completo
Una vez logueado el usuario, tendrá la posibilidad de solicitar una mesa a los mozos, esta solicitud será visualizada tanto por los mozos como por los socios. Una vez aprobada la solicitud por parte de los empleados, el cliente tendrá acceso a elegir los productos que posteriormente serán realizados por las distintas áreas de la cocina y la barra.
El proceso concluye cuando al cliente se le entrega la comida y este tiene la posibilidad de solicitar la cuenta y hacer un pago electrónico de la factura entregada.

*Debajo se encuentra un ejemplo del proceso completo del pedido desde la vista del cliente.*

<a href="https://www.youtube.com/embed/BkSLZMUWeyQ" target="_blank"><img src="https://github.com/marianomadou/Laboratorio_4/blob/master/SegundoParcial/capturas_de_pantallas/cliente_hace_pedido.JPG" alt="pantalla de logueo" width="882" height="486"/></a>

*Debajo se encuentra un ejemplo del proceso completo del pedido desde la vista del cliente desde un dispositivo movil (Samsung A30).*

<a href="https://www.youtube.com/embed/eH5zPbQClcU" target="_blank"><img src="https://github.com/marianomadou/Laboratorio_4/blob/master/SegundoParcial/capturas_de_pantallas/usuariocomandapedido.jpg" alt="pantalla de logueo" width="224" height="486"/></a>

### El perfil administrador / socio
El perfil del socio tiene control sobre todos los estados del pedido, de los perfiles de los usuarios (clientes o empleados), también cuenta con la posibilidad de ejecutar altas, bajas y modificaciones tanto de mesas como de productos.
Actualmente me encuentro desarrollando una nueva funcionalidad para el perfil del administrador. Esta nueva funcionalidad es capaz de graficar estadísticas relacionadas con las encuestas de satisfacción que los usuarios completan al finalizar las instancia del pedido. 
Adicionalmente se podrán descargar los datos de las encuestas en formato XLSX y PDF.

<a href="https://www.youtube.com/embed/vgdLLdCj09c" target="_blank"><img src="https://github.com/marianomadou/Laboratorio_4/blob/master/SegundoParcial/capturas_de_pantallas/perfil_admin.JPG" alt="pantalla de logueo" width="882" height="487"/></a>

---



