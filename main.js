const API_URL_RANDOM = ' https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_y6ugbp5HOwshYFSac1hCZnsD2gbmPWZM7vIN2a316cBIHQt2YjP8twwH5bntTBO7';

const API_URL_FAVOURITES = ' https://api.thecatapi.com/v1/favourites?api_key=live_y6ugbp5HOwshYFSac1hCZnsD2gbmPWZM7vIN2a316cBIHQt2YjP8twwH5bntTBO7';

const spanError = document.getElementById('Error')

async function loadRandomMichis() {
    const response = await fetch(API_URL_RANDOM); // Esperando respuesta de la API
    const data = await response.json(); // la respuest se convierta en JSON
    console.log('Random')
    console.log(data)

    if (response.status !== 200) {
       spanError.innerHTML = " Hubo un error: " + response.status;
    } else {
      const imagen1 = document.getElementById('imagen1');
      const imagen2 = document.getElementById('imagen2');
      const btn1 = document.getElementById('btn1');
      const btn2 = document.getElementById('btn2');

      imagen1.src = data[0].url;
      imagen2.src = data[1].url;

      btn1.onclick = () => saveFavouriteMichi(data[0].id);
      btn2.onclick = () => saveFavouriteMichi(data[1].id);
    }
  }

async function loadFavouriteMichis() {
    const response = await fetch(API_URL_FAVOURITES); // Esperando respuesta de la API
    const data = await response.json(); // la respuese convierta en JSON
    console.log(data)

    if (response.status !== 200) {
      spanError.innerHTML = " Hubo un error:" + response.status +  data.message;
  } else {
    data.forEach(michi => {
      const section = document.getElementById('favoriteMichis')
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('sacar al michi de favoritos');

      img.src = michi.image?.url || 'default-image.jpg';
      btn.appendChild(btnText);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function saveFavouriteMichi(id) {
  const response = await fetch(API_URL_FAVOURITES, {
    method:'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      image_id: id
    }),
  });
  const data = await response.json();
  
  if (response.status !== 200) {
    spanError.innerHTML = "hubo un error al guardar en favoritos: " +  response.status + " " + data.message;
  } else {
    console.log('Michi guardado en favoritos');
  }
}
// Asignacion de la función al evento click del botón
const reloadButton = document.querySelectorAll('.recargar');
reloadButton.forEach(button => {
  button.addEventListener('click',  loadRandomMichis);
})

loadRandomMichis();
loadFavouriteMichis();
