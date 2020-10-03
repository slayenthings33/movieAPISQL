const fetch = require('node-fetch');
const db = require('./db')

// HOME
exports.getHome = (req, res) => {
     db
    .getAllFilms()
    .then((data)=>{
        res
        .status(200)
        .render("home", {
            message: 'Search for a film by title:',
            films: data,
        })
    }).catch((e)=>console.log("An error has occurred:" +e));
  };
// ERROR PAGE 
// exports.getErrorPage = (req,res) =>{
//     res
//     .status(404)
//     .render("error", {
//         message: "Uh oh, looks like you took a wrong turn somewhere...",
//         message2: "ERROR 404"
//     });
// };
// LOAD FORM
exports.getForm = (req, res) => {
    res
        .status(200)
        .render("edit", {title:film})
}
//API fetch
exports.getFilmAPI = (req,res) => {
  fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=8f00377f&t=${req.params.title}`)
  .then(function(response) { //returns a JSON of requested film
    return response.json();
  }).then(function(data) {        
        res.render("film", {
            movie: data.Title,
            _id:data._id,
            movieName: data.Title,
            route: data.Poster,
            movieName: data.Title,
            rated: data.Rated,
            director: data.Director,
            actors: data.Actors,
            plot: data.Plot,
            released: data.Released,
            score: data.imdbRating,
            genre: data.Genre,
            runtime: data.Runtime,
        })
    }).catch(e=> console.log("getFilmApi error: "+e))
}
// MODULE TO DISPLAY DETAILS PUG
exports.getDetails = (req,res) => {
    db.getMovieDetails(req.params.ID)
    .then((data)=> {
        console.log("*********************")
        console.log(req.params)
        console.log(data)
        console.log(data.title)
        console.log(data.Title)
        console.log("*********************")
        res.status(200)
        .render("details", {
            //variable in pug : name in server.js generated url
            // route: data.Poster,  
            movieName: data.Title,
            rating: data.Rating,
            runtime: data.Runtime,
            genre: data.Genre,
            director: data.Director,
            actors: data.Actors,
            released: data.Date,
            score: data.Score,
            plot: data.Synopsis,
            route: data.Poster,
            id: req.params.ID
        })
    }).catch((e)=> console.log("An error has occurred "+e))
}
// MODULE TO UPLOAD FILM TO DB FROM FILM PUG 
exports.saveFave = (req,res) => {
    let movie= req.body;
    console.log("Saving")
    db.createMovie(movie)
    .then(()=>{
        res
        .status(200)
        .redirect("/")
    })
    .catch((e)=> {
        console.log("An error has occurred "+e)
    })
}

// MODULE LOAD FORM PUG WITH DETAILS FROM DB 
exports.getEditFilm = (req,res) => {
    db.getMovieDetails(req.params.ID)
    .then((data)=> {
    res.render("edit", {
            route: "/films/postEditFilm",
            message: "Edit your favorite Film!!",
            ID: data.ID,
            posterEdit: data.Poster,  
            titleEdit: data.Title,
            ratingEdit: data.Rating,
            runtimeEdit: data.Runtime,
            genreEdit: data.Genre,
            directorEdit: data.Director,
            actorsEdit: data.Actors,
            releasedEdit: data.Released,
            scoreEdit: data.Score,
            plotEdit:data.Synopsis
        })
    }).catch((e)=>console.log(`An error occurred ${e}`))
}
// MODULE SAVE THE USERS EDITED FAVED FILM 
exports.saveChanges = (req,res) => {
    console.log("saveChanges module")
    db.updateFilmDoc(req.params.title)
    res.status(200).render("edit", {
        ID: req.params.id,
        Title: req.query.title,
        Rating: req.query.rating,
        Director: req.query.director,
        Actors: req.query.actors,
        Release: req.query.release,
        Score: req.query.score,
        Poster: req.query.poster,
        Plot: req.query.plot,
        Runtime: req.query.plot
    })
} 
// MODULE TO LOAD CREATE FILM PUG 
exports.createMovie = (req,res) => {
    res.render("edit", { message: 'Create your own Motion Picture!'});
    db.createMovie(film)
}

// POST METHOD TO ERASE FROM DB 
exports.postDeleteFilm = (req,res) => {
    db.deleteFilmDoc(req.body)
    .then(() => {
        res
        .status(200)
        .redirect("/")
    }).catch((e)=> console.log("An error has occurred "+e))
    // console.log(req.body)
}

// POST METHOD TO EDIT FROM DB 
exports.postEditFilm = (req,res) => {
    let id = req.body.id;
    console.log("*********UPLOAD FORM DATA***************");
    console.log(req.body);
    db.updateFilmDoc(id, req.body)
    .then(()=> {
        res
        .status(200)
        .redirect("/");
    }).catch((e)=> console.log("An unexpected error has occurred:"+e))
}
