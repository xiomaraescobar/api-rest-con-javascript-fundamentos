const API_URL_RANDOM = ' https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_y6ugbp5HOwshYFSac1hCZnsD2gbmPWZM7vIN2a316cBIHQt2YjP8twwH5bntTBO7';

const API_URL_FAVOURITES = ' https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_y6ugbp5HOwshYFSac1hCZnsD2gbmPWZM7vIN2a316cBIHQt2YjP8twwH5bntTBO7';

const spanError = document.getElementById('Error')

async function loadRandomMichis() {
    const response = await fetch(API_URL_RANDOM); // Esperando respuesta de la API
    const data = await response.json(); // la respuest se convierta en JSON
    console.log('Random')
    console.log(data)

    if (response.status !== 200) {
       spanError.innerHTML = " Hubo un error:" + response.status;
    } else {
      const imagen1 = document.getElementById('imagen1');
      const imagen2 = document.getElementById('imagen2');

      imagen1.src = data[0].url;
      imagen2.src = data[1].url;
  }
  }

async function loadFavouritesMichis() {
    const response = await fetch(AP); // Esperando respuesta de la API
    const data = await response.json(); // la respuese convierta en JSON
    console.log(data)

    if (response.status !== 200) {
      spanError.innerHTML = " Hubo un error:" + response.status;
  }
}
// Asignacion de la función al evento click del botón
const reloadButton = document.querySelector('.recargar');
reloadButton.addEventListener('click',  loadRandomMichis);

// Cargar una imagen inicial
loadRandomMichis();
loadFavouritesMichis();
