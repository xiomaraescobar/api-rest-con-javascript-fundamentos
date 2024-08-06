const URL = ' https://api.thecatapi.com/v1/images/search?limit=10';
/*
fetch(URL)
.then(res => res.json())
.then(data => {
    const img = document.querySelector('img');
    img.src =  data[0].url;
});
 */

async function CatImage () {
  try {
    const response =  fetch(URL); // Esperando respuesta de la API
    const data = await response.json(); // la respuesta se convierta en JSON
    const img = document.querySelector('img');
    img.src = data[0].url; // Asignacion de la URL de la imagen al atributo src
  } catch (error) {
    console.error('Error al cargar la imagen:', error); // Maneja cualquier error que ocurra
  }
}

// Asignacion de la función al evento click del botón
const reloadButton = document.querySelector('.recargar');
reloadButton.addEventListener('click', CatImage);

// Cargar una imagen inicial
CatImage();

