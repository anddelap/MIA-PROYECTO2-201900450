# Manual tecnico
## Objetivos

#### General
- Conjuntar los conocimientos del uso de un framework junto con NodeJS y JSON para realizar una aplicacion con funcionamiento en la nube.


#### Especificos

- Proporcionar un frontend intuitivo y vistoso para que el usuario pueda utilizarla de manera optima.
- 
-  

## Arquitectura

La arquitectura presenta la infraestructura que se realiza. En primer lugar tenemos la computadora la cual representa desde donde el usuario utilizara la aplicacion. Luego tenemos la representacion de las dos instancias EC2 en donde la primera muestra la utilizada para frontend junto con el logo de React representando el framework utilizado y apoyado con nginx para que pueda ser mostrada la aplicacion. La segunda instancia representa el backend que, al igual que la primera, representa el apoyo de nginx y la utilizacion de node js como servidor de consultas. Por último, se representan las conexiones hacia los servicios de bucket (para almacenar imagenes) y cognito (para el manejo de usuario). Todos estos rodeados por un cuadro representando que estan en la nube de AWS.

![alt text](images/Usuario.jpg)

## Descripcion de Usuario IAM

## Descripcion de servicios

- Instancia EC2 (Frontend):



- Instancia EC2 (Backend):



- Cognito:


- Bucket
## Conclusiones

- Se utilizo el framework de react junto con boostrap los cuales permiten diseñar un frontend vistoso y facil de entender para el usuario en las tareas que desee realizar.
- 