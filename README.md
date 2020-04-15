Como parte de la catedra de Ingeniería de Software, desarrollamos un sistema para votaciones en línea con arquitectura de microservicios, bus de mensajes con apache kafka, y uso de sockets para comunicación en tiempo real.

inicialmente el alcance del proyecto fue pensado para solamente una empresa pequeña, sin embargo, para cumplir el requerimiento de utilizar arquitectura de micro servicios, decidimos ampliar la escala a una nación completa.

Los componentes del sistema son:

- Registro de Participantes (https://github.com/robCastro/micros_registroparticipantes): Encargado de registrar todas las personas que participarán en la votación, así como su posición dentro la organización. La tabla "Nivel" posee una relación circular que permite se adapte a la tipica estructura top down de la mayoría de organizaciones, países incluidos.

- Diseño de Votacion (https://github.com/robCastro/micros_diseniovotacion): Contiene toda la logistica para el diseño de la votación, como los detalles de como se recontarán, los centros de votación y las mesas de votación para cada centro. Tiene un componente de comunicación con apache kafka para escuchar mensajes.

- Microservicio Socket (https://github.com/robCastro/micros_socket): Tiene varios roles: 
    1) Gateway para los micro servicios: Facilita la comunicación con el front end, de tal forma que el front end solo debe preocuparse por comunicarse con un solo componente.
    2) Publica mensajes en apache kafka: Ya que el front end solo se comunica con este componente, es este ultimo el encargado de publicar todos los mensajes pertinentes en apache kafka. Consideramos un mensaje pertinente como aquel que actualiza tablas en diferentes micro servicios.
    3) Sockets: Implementa web sockets para tener comunicación en tiempo real con los clientes.
    
- Front Votacion (https://github.com/robCastro/front-votacion): Front end para la presentación del sistema

Existen más componentes del sistema, sin embargo, los esenciales son estos.
