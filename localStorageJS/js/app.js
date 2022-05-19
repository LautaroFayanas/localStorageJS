
// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// Event Listeners
eventListener();
function eventListener(){
    // El usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando cargue el documento, quiero que apararezcan mis tweets impresos
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    })
    
}


// Funciones
function agregarTweet(e){
    e.preventDefault();
    // Donde el suario escribe - TextArea -
    const tweet = document.querySelector('#tweet').value;

    // Validacion
    if(tweet === ''){
        mostrarError('Debes completar el tweet')
        return; // El Return EVITA ejecutar mas lineas de codigo por debajo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //Agregar al arreglo de tweets
    tweets = [... tweets,tweetObj]
    console.log(tweets)

    //Una vez agregado , creo el HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();

}


// Mensaje de error
function mostrarError(mensaje){

    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error');

    //Insertarlo en el Contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}


// Muestra un listado de los tweet en HTML
function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach(tweet => {
            //Crear Boton Eliminar Tweet
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'x';

            //Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear el html
            const li = document.createElement('li');
            li.innerText = tweet.tweet;

            //Asignar BTN
            li.appendChild(btnEliminar);

            listaTweets.appendChild(li);

        })
    }

    sincronizarStorage();
}


// Agrega los tweets al Local Storage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}



// Limpiar HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}


// Borrando Tweet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id)
    crearHTML();
}