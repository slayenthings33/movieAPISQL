const express = require("express");
const app = express();
const port = 3000;
const movie = require("./movie");
const bodyParser = require('body-parser');

//***********MIDDLEWARE************//

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static('public'));
app.use("/films",express.static('public'));
app.use("/films/details", express.static('public'));
app.use("/films/edit", express.static('public'));
app.use("/films/create", express.static('public'))
app.use("/films/editFilm", express.static('public'))

//***********VIEW ENGINE************//

app.set("views", "./views") //Where to read to pug
app.set("view engine", "pug") //View generating motor

//***********ROUTES************//
//  <----------- GET ROUTES 
// HOME PAGE
app.get('/', movie.getHome);
// CREATE MOVIE PAGE
app.get('/films/create', movie.createMovie);

// SEARCH MOVIE
app.get('/films/:title', movie.getFilmAPI);

// MOVIE DETAILS RESULT PAGE
app.get("/films/filmdetails/:ID", movie.getDetails);

// EDIT MOVE RESULTS PAGE 
app.get("/films/editFilm/:ID", movie.getEditFilm) 


// ----------> POST ROUTES

// SAVE FILM to DB from film.pug
app.post("/films/save", movie.saveFave);

// DELETE FILM from DB from home.pug
app.post("/films/deletefilm", movie.postDeleteFilm);

// EDIT FILM from edit.pug TO db 
app.post("/films/postEditFilm", movie.postEditFilm);

// EVERYTHING ELSE 
// app.get('*', movie.errorPage);



app.listen(port, () => {
  console.log(`You are connected to: ${port}`)
})