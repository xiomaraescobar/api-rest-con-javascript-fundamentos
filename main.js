const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1'
});
api.defaults.headers.common['X-API-KEY'] = 'live_y6ugbp5HOwshYFSac1hCZnsD2gbmPWZM7vIN2a316cBIHQt2YjP8twwH5bntTBO7';

const API_URL_RANDOM = ' https://api.thecatapi.com/v1/images/search?limit=2';
const API_URL_FAVOURITES = ' https://api.thecatapi.com/v1/favourites';
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';


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
    const response = await fetch(API_URL_FAVOURITES, { // Esperando respuesta de la API
    method: 'GET',
    headers: {
      'X-API-KEY': 'live_y6ugbp5HOwshYFSac1hCZnsD2gbmPWZM7vIN2a316cBIHQt2YjP8twwH5bntTBO7',
    },
  });    
    const data = await response.json(); // la respuesta se convierta en JSON
    console.log('favoritos')
    console.log(data)

    if (response.status !== 200) {
      spanError.innerHTML = " Hubo un error:" + response.status +  data.message;
  } else {
    const section = document.getElementById('favoriteMichis')
    section.innerHTML = "";
    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Michis favoritos');
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach(michi => {
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('sacar al michi de favoritos');

      img.src = michi.image.url;
      img.width = 150;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavouriteMichi(michi.id);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function saveFavouriteMichi(id) {// aqui estamos usando el metodo axios
const response = await api.post('/favourites', {
  image_id: id,
});

  //const response = await fetch(API_URL_FAVOURITES, {
   // method:'POST',
   // headers: {
   //   'content-type': 'application/json',
    //  'X-API-KEY': 'live_y6ugbp5HOwshYFSac1hCZnsD2gbmPWZM7vIN2a316cBIHQt2YjP8twwH5bntTBO7',
   // },
    //body: JSON.stringify({
      //image_id: id
    //}),
  //});
  //const data = await response.json();

  console.log('save')
  
  if (status !== 200) {
    spanError.innerHTML = "hubo un error al guardar en favoritos: " +  status + " " ;
  } else {
    console.log('Michi guardado en favoritos')
    loadFavouriteMichis();
  }
}

async function deleteFavouriteMichi(id) {
  const response = await fetch(API_URL_FAVOURITES_DELETE(id), {
    method: 'DELETE',
    headers: {
      'X-API-KEY': 'live_y6ugbp5HOwshYFSac1hCZnsD2gbmPWZM7vIN2a316cBIHQt2YjP8twwH5bntTBO7',
    },
    });
   const data = await response.json();

   if (response.status !== 200) {
    spanError.innerHTML = "hubo un error: " +  response.status + " " + data.message;
  } else {
    console.log('Michi eliminado de favoritos');
    loadFavouriteMichis();
  }
}  
// Asignacion de la función al evento click del botón
const reloadButton = document.querySelectorAll('.recargar');
reloadButton.forEach(button => {
  button.addEventListener('click',  loadRandomMichis);
})

function previewImage() {
  const fileInput = document.getElementById('file');
  const previewImage = document.getElementById('previewImage');
  const file = fileInput.files[0];

  const reader = new FileReader();
  reader.onloadend = function () {
    previewImage.src = reader.result;
    previewImage.style.display = 'block';
  }
  if (file) {
    reader.readAsDataURL(file);
  } else {
    previewImage.src = '';
    previewImage.style.display = 'none';
  }
}

async function uploadMichiPhoto() {
  const form = document.getElementById('uploadingForm')
  const formData = new FormData(form);

  console.log(formData.get('file'))

  const response = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers: {
      //'content-type': 'multipart/form-data',
      'X-API-KEY': 'live_y6ugbp5HOwshYFSac1hCZnsD2gbmPWZM7vIN2a316cBIHQt2YjP8twwH5bntTBO7',
    },
    body: formData,
  })
  const data = await response.json();

  if (response.status !== 201) {
    spanError.innerHTML = "Hubo un error: " + response.status + data.message;
    console.log({data})
  } else {
    console.log('Foto de michi subida :)')
    console.log({data})
    console.log(data.url)
    saveFavouriteMichi(data.id) //agraga el michi cargado a favoritos.
  }
}
//asignacion de la funcion previewImage al evento 
document.getElementById('file').addEventListener('change', previewImage);

loadRandomMichis();
loadFavouriteMichis();
