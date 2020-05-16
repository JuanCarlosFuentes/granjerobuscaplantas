//He hecho un pelín distinto a lo que pone en la tarea, me dejé llevar y no me fijé de algunas cosas
//Se acercan los exámenes y no hay tiempo, pero se puede mejorar mucho más
//La finalización del juego la he puesto con cronómetro o al recoger todas las plantas
//Todos los métodos JS usados están soportados por todos los navegadores, comprobado que funciona
//En Chrome, Firefox y Edge, por falta de tiempo el diseño está regular

//Evento para esperar que se cargue todo el DOM
document.addEventListener('DOMContentLoaded', ()=>{

/***** Creamos todas la variables globales al juego *****/
//Creamos una etiqueta img para el granjero
var $granjero = document.createElement('IMG');
//Creamos el array con el controleramos que hay en cada posición
var posiciones = [];
//Creamos una variable para almacenar la posición del granjero 
var posicionGranjero;
//Creamos una variable para la posición del obstaculo
var posicionObstaculo;
//Creamos una variable para saber la orientación del granjero
var direccion;
//Variable para el intervalo de tiempo según nivel
var intevaloTiempo;
//variable para el número de plantas que van a generarse según nivle
var numeroPlantas;
//Variable para almacenar la puntuación
var puntuacion;
//Variable para el contenedor del tablero
var $tablero
//Variable para el intervalo de generanción del suelo
var suelo;
//variable para el intervalo de duración del juego
var duracionJuego;
//variable para el cronometro
var cuentaAtras;
//variable para el intervalo del cronometro
var cronometroInterval;

//Creamos las etiquetas de audio
const $audio = document.createElement('AUDIO');
//A la música principal le ponemos loop para que no termine nunca
$audio.setAttribute('loop', true);
//A cada etiqueta audio le añadimos una source con la musica o sonido
const $source = document.createElement('SOURCE');
$audio.appendChild($source);
$source.setAttribute('src', './audio/audio.mp3');

const $comePlanta = document.createElement('AUDIO');
const $sourceComePlanta = document.createElement('SOURCE');
$comePlanta.appendChild($sourceComePlanta);
$sourceComePlanta.setAttribute('src', './audio/come.wav');

const $gameOverSound = document.createElement('AUDIO');
const $sourceGameOverSound = document.createElement('SOURCE');
$gameOverSound.appendChild($sourceGameOverSound);
$sourceGameOverSound.setAttribute('src', './audio/gameover.wav');

const $bienSound = document.createElement('AUDIO');
const $sourceBienSound = document.createElement('SOURCE');
$bienSound.appendChild($sourceBienSound);
$sourceBienSound.setAttribute('src', './audio/bien.wav');


/***** Creamos la estructura principal de la página *****/
//Creamos el contenedor principal que albergará el juego
const $container = document.createElement('DIV');
//Añadimos la clase container
$container.classList.add('container');
//Añadimos el id container
$container.setAttribute('id', 'container');
//Llamamos a la función para crear el tablero inicial
tableroInicial();


//Creamos el h1 de la página y añadimos el texto y lo añadimos al body
const $cabecera = document.createElement('H1'),
$textoCabecera = document.createTextNode("Juan Carlos Fuentes - Tarea 5 - DWEC");
$cabecera.appendChild($textoCabecera);
document.body.appendChild($cabecera);

/***** Elementos del Section *****/
//Creamos un h3 para texto y le añadimos el contenido
const $h3 = document.createElement("H3"),
    $h3Texto = document.createTextNode("Elige dificultad");
$h3.appendChild($h3Texto);

//Creamos los 4 botones y le añadimos el texto
const $btnDificultad1 = document.createElement("BUTTON"),
    $btnDificultad1Texto = document.createTextNode("Nivel 1");
    $btnDificultad2 = document.createElement("BUTTON"),
    $btnDificultad2Texto = document.createTextNode("Nivel 2");
    $btnDificultad3 = document.createElement("BUTTON")
    $btnDificultad3Texto = document.createTextNode("Nivel 3");
    $btnRendirse = document.createElement("BUTTON")
    $btnRendirseTexto = document.createTextNode("Me rindo!");
    $btnRendirse.appendChild($btnRendirseTexto);
    $btnRendirse.setAttribute('id', 'rendirse');
    //El botón rendirse inicialmente lo deshabilitamos
    $btnRendirse.setAttribute('disabled', true);
//A cada botón le añadimos un id y un evento con los valores iniciales según el nivel a jugar    
$btnDificultad1.appendChild($btnDificultad1Texto);
$btnDificultad1.setAttribute('id', 'nivel1');
$btnDificultad1.addEventListener('click', () => {
    //Deshabilitamos los botones de niveles
    desabilitaBotones();
    //Iniciamos las variables para este nivel
    intevaloTiempo = 3000;
    numeroPlantas = 5;
    puntuacion = 0;
    cuentaAtras = 25000;
    //Llamamos a la función para iniciar el juego
    iniciarJuego();
});

//Lo mismo para los otros botones de niveles, cada uno con su dificultad
$btnDificultad2.appendChild($btnDificultad2Texto);
$btnDificultad2.setAttribute('id', 'nivel2');
$btnDificultad2.addEventListener('click', () => {
    desabilitaBotones();
    intevaloTiempo = 2000;
    numeroPlantas = 8;
    puntuacion = 0;
    cuentaAtras = 20000;
    iniciarJuego();
});

$btnDificultad3.appendChild($btnDificultad3Texto);
$btnDificultad3.setAttribute('id', 'nivel3');
$btnDificultad3.addEventListener('click', () => {
    desabilitaBotones();
    intevaloTiempo = 1000;
    numeroPlantas = 10;
    puntuacion= 0;
    cuentaAtras = 15000;
    iniciarJuego();
});

//Botón de rendirse, habilita botones niveles, suena música y finaliza juego
$btnRendirse.addEventListener('click', () => {
    habilitaBotones();
    $gameOverSound.play();
    finJuego("TE HAS RENDIDO!!");
});

//Función para deshabilitar botones de niveles y habilitar el de rendirse
function desabilitaBotones(){
    document.getElementById('nivel1').setAttribute('disabled', true);
    document.getElementById('nivel2').setAttribute('disabled', true);
    document.getElementById('nivel3').setAttribute('disabled', true);
    document.getElementById('rendirse').removeAttribute('disabled');
}

//Función para habilitar botones de niveles y deshabilitar el de rendirse
function habilitaBotones(){
    document.getElementById('nivel1').removeAttribute('disabled');
    document.getElementById('nivel2').removeAttribute('disabled');
    document.getElementById('nivel3').removeAttribute('disabled');
    document.getElementById('rendirse').setAttribute('disabled', true);
}

//Creamos un contenedor para los botones y los añadimos
const $divBotones = document.createElement("DIV");
$divBotones.classList = 'divBotones';
$divBotones.appendChild($btnDificultad1);
$divBotones.appendChild($btnDificultad2);
$divBotones.appendChild($btnDificultad3);
$divBotones.appendChild($btnRendirse);

//Creamos otro h3 para texto
const $puntuacionH3 = document.createElement("H3"),
    $puntuacionH3Texto = document.createTextNode("Puntuación: ");
$puntuacionH3.appendChild($puntuacionH3Texto);

//Creamos un div donde irá la puntuación del juego
const $puntuacion = document.createElement("DIV");
const $puntuacionTexto = document.createTextNode("0");
$puntuacion.appendChild($puntuacionTexto);
$puntuacion.setAttribute('id', 'puntuacion');
$puntuacion.classList = 'puntuacion';

//Creamos más h3 para las intrucciones del juego
const $instrucciones = document.createElement("H3"),
    $instruccionesTexto = document.createTextNode("Instrucciones: Recoge todas las plantas antes de quedarte atrapado o sin tiempo");
$instrucciones.appendChild($instruccionesTexto);
const $teclas = document.createElement("H3"),
    $teclasTexto = document.createTextNode("Usa las teclas a,s,d,w");
$teclas.appendChild($teclasTexto);

//Creamos otro h3 para texto
const $cronometroH3 = document.createElement("H3"),
    $cronometroH3Texto = document.createTextNode("Tiempo: ");
$cronometroH3.appendChild($cronometroH3Texto);

//Creamos un div donde irá la cuenta atrás del tiempo
const $cronometroDiv = document.createElement("DIV");
const $cronometroTexto = document.createTextNode("0");
$cronometroDiv.appendChild($cronometroTexto);
$cronometroDiv.setAttribute('id', 'cronometro');
$cronometroDiv.classList = 'puntuacion';

//Creamos la etiqueta section y le añadimos todo el contenido creado
const $section = document.createElement('SECTION');
$section.appendChild($h3);
$section.appendChild($divBotones);
$section.appendChild($puntuacionH3);
$section.appendChild($puntuacion);
$section.appendChild($instrucciones);
$section.appendChild($teclas);
$section.appendChild($cronometroH3);
$section.appendChild($cronometroDiv);

//Añadimos el section al contendor principal
$container.appendChild($section);
//Añadimos el tablero al contenedor principal
$container.appendChild($tablero);

//Añadimos el contenedor al body
document.body.appendChild($container);

//Función que se ejecutará para empezar el juego
function iniciarJuego(){
    //Que empiece la música
    $audio.play();
    //Reiniciamos los intervalos
    clearInterval(cronometroInterval);
    clearInterval(suelo);
    clearInterval(duracionJuego);
    //Empezamos la puntuación a 0
    document.getElementById('puntuacion').innerHTML = "0";
    document.getElementById('cronometro').innerHTML = (cuentaAtras/1000);
    //Borramos el tablero anterior
    if ($tablero.parentNode){
        $tablero.parentNode.removeChild($tablero);
    }
    //Llamamos a la función para genera un nuevo tablero
    CrearTablero()
    //Posicionamos al granjero y al obstaculo inicial
    PosicionInicialGrangeroYObstaculo();
    //posicionamos las plantas
    PosicionInicialPlantas();
    //Creamos evento para que cuando se pulse una tecla se ejecute la función
    document.addEventListener('keyup', movimiento);
    //Creamos un intervalo para que se ejecute la función GeneraSuelo cada x milisegundos en función del nivel elegido
    suelo = setInterval(GeneraSuelo, intevaloTiempo);
    //Creamos un intervalo para la finalización del juego
    duracionJuego = setInterval(()=> {$gameOverSound.play(); finJuego("GAME OVER")}, cuentaAtras);
    //Creamos un intervalo para el cronometro
    cronometroInterval = setInterval(cronometroFinJuego, 1000);
}

//Función para la cuenta atrás del cronómetro
function cronometroFinJuego(){
    //Restamos 1 segundo
    cuentaAtras-=1000;
    //Actualizamos el cronómetro
    document.getElementById('cronometro').innerHTML = (cuentaAtras/1000);
}

//Función para el fin del juego
function finJuego(mensaje){
    //Eliminamos el evento keyup
    document.removeEventListener('keyup', movimiento);
    //Paramos la música
    $audio.pause();
    //habilitamos botones
    habilitaBotones();
    //Borramos el interavalo de generación del suelo
    clearInterval(suelo);
    //Borramos el intervalo de duración del juego
    clearInterval(duracionJuego);
    // //Actualizamos el cronómetro para que muestre 0
    cronometroFinJuego();
    //Borramos el intervalo del cronómetro
    clearInterval(cronometroInterval);
    //Comprobamos el padre del tablero para borrar el tablero actual
    if ($tablero.parentNode){
        $tablero.parentNode.removeChild($tablero);
    }
    //Llamamos al método gameOver con el mensaje
    gameOver(mensaje);
}

//Función que genera el trablero inicial
function tableroInicial(){

    $tablero = document.createElement('DIV');
    $tablero.classList.add('tableroInicial');
    $tablero.setAttribute('id', 'tablero');

    var $finJuego = document.createElement('P');
    $finJuego.setAttribute('id', 'finJuego');
    $finJuego.classList = 'gameover';
    $finJuego.innerHTML = 'Pulsa un nivel para empezar';
    var $puntuacionFinJuego = document.createElement('P');
    $puntuacionFinJuego.setAttribute('id', 'puntuacionFinJuego');
    $puntuacionFinJuego.classList = 'gameover';
    $tablero.appendChild($finJuego);
    $tablero.appendChild($puntuacionFinJuego);
    $container.appendChild($tablero);
}

//Función para terminar el juego como game over
function gameOver(mensaje){
    //Mostramos el tableroinicial
    tableroInicial();
    //Y los mensajes con la puntuación e instrucciones
    document.getElementById('finJuego').innerHTML = mensaje;
    document.getElementById('puntuacionFinJuego').innerHTML = "PUNTUACIÓN: " + puntuacion;
    var $pOtroJuego = document.createElement('P');
    $pOtroJuego.classList = 'gameover';
    $pOtroJuego.innerHTML = 'Pulsa un nivel para volver a jugar';
    $tablero.appendChild($pOtroJuego);
}

//Función que va a generar un nuevo tablero
function CrearTablero(){

    //Creamos una constante para el fragamento donde crear el tablero
    //Con esto conseguimos mejor rendimiento al escribir una vez en el dom y no 64
    const $tableroFragment = document.createDocumentFragment();
    //Creamos el div que contendrá el tablero
    $tablero = document.createElement('DIV');
    //Le añadimos la clase tablero
    $tablero.classList.add('tablero');
    posiciones = [];
    //Creamos un bucle para iniciar el array y añadir las celdas
    for (var x = 0; x < 8; x++){
        //Al array posiciones lo creamos bidimiensional
        posiciones[x] = [];
        //Creamos un array para iniciar el array de cada array
        for (var y = 0; y < 8; y++){
            //Ponemos cada posición a 0
            posiciones[x][y] = 0;
            //Creamos el div que contendrá la celda
            let $celda = document.createElement("DIV");
            //Le añadimos la clase celda
            $celda.classList.add("celda");
            //A cada div le añadimos un id diferente
            $celda.setAttribute('id', `celda${x}-${y}`);
            //Le añadimos una imagen de background
            $celda.style.backgroundImage = "url('./img/floor1.png')";
            //añadimos al fragmento cada celda
            $tableroFragment.appendChild($celda);
        }
    }
    //Añadimos al tablero el fragmento
    $tablero.appendChild($tableroFragment);
    //Añadimos el tablero al contenedor
    $container.appendChild($tablero);
}


//Función que inicializa las plantas a recoger
function PosicionInicialPlantas(){
    //Iniciamos variable que servira para salir del bucle
    var plantas = 0;
    //mientras la variable sea menor que 11
    do {
        //Creamos dos numeros aleatorios
        let pos1 = NumeroAleatorio();
        let pos2 = NumeroAleatorio();
        //Si la posición inicial es distinta a la posición aleatoria que acabamos de generar
        if (posicionGranjero != pos1+'-'+pos2 && posicionObstaculo != pos1+'-'+pos2 && posiciones[pos1][pos2] != 1){
            //Añadimos la imagen de la planta en esa posición
            document.getElementById(`celda${pos1}-${pos2}`).style.backgroundImage = "url('./img/planta.png')";
            document.getElementById(`celda${pos1}-${pos2}`).style.backgroundSize = "cover";
            document.getElementById(`celda${pos1}-${pos2}`).style.maxWidth = "100%";
            //En cada una de las posiciones de las plantas almacenamos un 1
            posiciones[pos1][pos2] = 1;
            //Incrementamos la variable para salir del bucle
            plantas++;
        }
    } while (plantas < 10);
}

//Función que posiciona al granjero
function PosicionInicialGrangeroYObstaculo(){
    //Alamcenamos en la variable la posición inicial usando la función NumeroAleatorio()
    posicionGranjero = NumeroAleatorio()+'-'+NumeroAleatorio();
    //Le añadimos el atributo src que contiene la ruta de la imagen a mostrar
    $granjero.setAttribute('src', './img/granjero.png');
    //Le damos un id al granjero
    $granjero.setAttribute('id', 'granjero');
    //Le añadimos la clase granjero
    $granjero.classList.add('granjero');
    //Localicamos la celda de la posición inicial y añadimos el granjero
    document.getElementById(`celda${posicionGranjero[0]}-${posicionGranjero[2]}`).appendChild($granjero);
    //Creamos dos numeros aleatorios para la posición del obstaculo
    let pos1 = NumeroAleatorio();
    let pos2 = NumeroAleatorio();
    //Creamos condición para salir del bucle
    let posicionGranjeroObstaculo = false;
    do {
        //Si la posición inicial es distinta a la posición aleatoria que acabamos de generar
        if (posicionGranjero != pos1+'-'+pos2){
            //Almacenamos la posición del obstaculo
            posicionObstaculo = pos1+'-'+pos2;
            //En el array ponemos esa posición a 4 que será lo que impedirá que el granjero pase por él
            posiciones[pos1][pos2] = 4;
            //Creamos una etiqueta img para el obstaculo
            const $obstaculo = document.createElement('IMG');
            //Le añadimos el atributo src que contiene la ruta de la imagen a mostrar
            $obstaculo.setAttribute('src', './img/obstaculo.png');
            //Localicamos la celda para posicional el obstaculo
            document.getElementById(`celda${pos1}-${pos2}`).appendChild($obstaculo);
            //Ponemos a true la variable para salir de bucle
            posicionGranjeroObstaculo = true;
        }

    } while (!posicionGranjeroObstaculo)

}

//Función que genera un número aleatorio del 0 al 7
function NumeroAleatorio(){
    return Math.round(Math.random() * (7 - 0));
}

//Función que controla el movimiento del granjero, recibe como parámetro el evento
function movimiento(e){

    if (e.keyCode == 65){  
        direccion = 1; //Se ha pulsado la a y vamos a la izquierda
        mueveGranjero(direccion);
    }else if (e.keyCode == 83){
        direccion = 2;  //Se ha pulsado la s y vamos abajo
        mueveGranjero(direccion)
    } else if (e.keyCode == 68) {
        direccion = 3; //Se ha pulsado la tecla d y vamos a la derecha
        mueveGranjero(direccion)
    } else if (e.keyCode == 87){
        direccion = 4; //Se ha pulsado la tecla w y vamos arriba
        mueveGranjero(direccion);
    }
}

//Función que mueve al granjero
function mueveGranjero(direccion){
    //Obtenemos la posición x del granjero
    let x = parseInt(posicionGranjero[0])
    //Obtenemos la posición y del granjero
    let y = parseInt(posicionGranjero[2])
    //Almacenamos las 4 posibles posiciones
    let izquierda = y-1;
    let derecha = y+1;
    let arriba = x-1;
    let abajo = x+1;

    //comprobamos si la dirección es izquierda y no ha rebasado el tablero
    if (direccion == 1 && izquierda >= 0 ){
        if (posiciones[x][izquierda] != 4){
            //Pintamos al granjero en la nueva posición
            document.getElementById(`celda${x}-${izquierda}`).appendChild($granjero);
            $granjero.setAttribute('src', './img/granjeroizquierda.png');
            //Actualizamos la posicion del granjero
            posicionGranjero = x + '-' + izquierda;
            //Comprobamos si ha pasado por una planta
            CompruebaPlanta(x, y);

        }
    //comprobamos si la dirección es derecha y no ha rebasado el tablero
    } else if (direccion == 3 && derecha <= 7){
        if (posiciones[x][derecha] != 4){
            //Pintamos al granjero en la nueva posición
            document.getElementById(`celda${x}-${derecha}`).appendChild($granjero);
            $granjero.setAttribute('src', './img/granjero.png');
            //Actualizamos la posicion del granjero
            posicionGranjero = x + '-' + derecha;
            //Comprobamos si ha pasado por una planta
            CompruebaPlanta(x, y);
        }
    }
    //comprobamos si la dirección es abajo y no ha rebasado el tablero
     else if (direccion == 2 && abajo <= 7){
        if (posiciones[abajo][y] != 4){
            //Pintamos al granjero en la nueva posición
            document.getElementById(`celda${abajo}-${y}`).appendChild($granjero);
            $granjero.setAttribute('src', './img/granjeroabajo.png');
            //Actualizamos la posicion del granjero
            posicionGranjero = abajo + '-' + y;
            //Comprobamos si ha pasado por una planta
            CompruebaPlanta(x, y);
        }
    //comprobamos si la dirección es arriba y no ha rebasado el tablero
    } else if (direccion == 4 && arriba >= 0){
        if (posiciones[arriba][y] != 4){
            //Pintamos al granjero en la nueva posición
            document.getElementById(`celda${arriba}-${y}`).appendChild($granjero);
            $granjero.setAttribute('src', './img/granjero.png');
            //Actualizamos la posicion del granjero
            posicionGranjero = arriba + '-' + y;
            //Comprobamos si ha pasado por una planta
            CompruebaPlanta(x, y);
        }
    }

}

//Función que va a controlar la colisión con una planta
function CompruebaPlanta(x, y){
    //Si en el array de la posición actual hay un 1 es que hay una planta
    if (posiciones[x][y] == 1){
        //Sustituimos la planta por suelo
        document.getElementById(`celda${x}-${y}`).style.backgroundImage = "url('./img/floor1.png')";
        //Cambiamos el valor del array de 1 a 0
        posiciones[x][y] = 0;
        //Aumentamos la puntuación
        puntuacion++;
        //Actualizamos el valor del div
        document.getElementById('puntuacion').innerHTML = puntuacion;
        //Sonido cuando se come una planta
        $comePlanta.play();
        //Comprobamos si la puntuación ha llegado a 10
        if (puntuacion == 10){
            //Sonido de enhorabuena
            $bienSound.play();
            //Terminamos el juego
            finJuego("ENHORABUENA!!");
        }
    }
}

//Función que se va a encargar de generar el suelo
function GeneraSuelo(){
    //Contador para la finalización del bucle
    let posicionNuevoSuelo = 0;

    do {
        //Creamos dos numeros aleatorios
        let pos1 = NumeroAleatorio();
        let pos2 = NumeroAleatorio();

        //Si la posición inicial del grangjero es distinta a la posición aleatoria que acabamos de generar
        //y distinta a la posición del grangjero y en esa posición del array no hay una planta es que tenemos que cambiar el suelo
        if (posicionGranjero != pos1+'-'+pos2 && posicionObstaculo != pos1+'-'+pos2 && posiciones[pos1][pos2] != 1 ){
            //Si hay un 0 es que hay cesped
            if (posiciones[pos1][pos2] == 0){
                //Cambiamos a amarillo
                document.getElementById(`celda${pos1}-${pos2}`).style.backgroundImage = "url('./img/floor2.png')";
                //Actualizamos el array
                posiciones[pos1][pos2] = 2;
              //Si hay un 2 es que hay suelo amarillo
            } else if (posiciones[pos1][pos2] == 2){
                //Cambiamos a marrón claro
                document.getElementById(`celda${pos1}-${pos2}`).style.backgroundImage = "url('./img/floor3.png')";
                //Actualizamos el array
                posiciones[pos1][pos2] = 3;
           
            } else if (posiciones[pos1][pos2] == 3){
                document.getElementById(`celda${pos1}-${pos2}`).style.backgroundImage = "url('./img/floor4.png')";
                posiciones[pos1][pos2] = 4;
                
            }
            //incrementamos el contador
            posicionNuevoSuelo ++;
           
        }

    } while (posicionNuevoSuelo < numeroPlantas);
}

})