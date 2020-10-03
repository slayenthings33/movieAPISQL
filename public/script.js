let searchButton = document.getElementById('searchButton');
let createButton = document.getElementById('createButton');
let updateButton = document.getElementById('updateFilmBtn')
//**********SEARCH FILM***********//
if(searchButton) {
  searchButton.addEventListener("click", getInput) //Button event listeners
  function getInput() {   //Insert  into URL to access API
    let userInput = document.getElementById("userInput");
    location.replace(`/films/${userInput.value}`)
  }
}

//**********CREATE FILM***********//
if(createButton) {
  createButton.addEventListener('click', createFilm)
  function createFilm() {
  location.replace(`/films/create/`)
  }
}


//**********HOME PAGE***********//

function goHome() {  //Refresh home page
  location.replace("/")
}

//**********BUTTON FUNCTIONS***********//

function deleteFilm(title) {
  let eraseFilm = {
    "Title": title
  }

  fetch('/films/deletefilm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(eraseFilm)
  })
    .then((respuesta) => {
      console.log(respuesta)
      location.replace("/")
    })
    .catch((e) => {
      console.log("error" + e)
    });
};

// SEARCH FILM 
function getDetails(title) {
  let filmURL = `/films/filmdetails/${title}`;
  location.replace(filmURL)
}

function editFilmPage(ID) {
  let urlEdit = `/films/editFilm/${ID}`;
  location.replace(urlEdit)
}
