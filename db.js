const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "",
  connectionLimit: 5,
  database: "moviedb",
});

//Connect to DB
const connect = () => {
  return pool;
};

// CREATE MOVIE 
//Method to create movie documents in DB from Fave btn

exports.createMovie = async (movie) => {
  console.log(movie)
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(
      `INSERT INTO movies (Title, Synopsis, Rating, Runtime, Genre, Director, Actors, Released, Score) VALUES (?,?,?,?,?,?,?,?,?)`, 
      [movie.Title, movie.Plot, movie.Rating, movie.Runtime,movie.Genre,movie.Director,movie.Actors,movie.Date,movie.Score]);
    console.log("movie uploaded");
    return res;
  } catch (err) {
    console.log("Your error is "+err);
    return;
  } finally {
    if (conn) conn.release(); //release to pool
  }
}

//FIND FILM IN COLLECTION

exports.getMovieDetails = async (movie) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(
      "SELECT * FROM movies WHERE ID=(?)", [movie._id]
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return;
  } finally {
    if (conn) conn.release(); //release to pool
  }
}

//FIND VARIOUS FILMS IN COLLECTION

exports.getAllFilms = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(
      "SELECT * FROM movies"
    );
    return res;
    } catch (err) {
    console.log(err);
    return;
  } finally {
    if (conn) conn.release(); //release to pool
  }
};

// DELETE FILM FROM COLLECTION
exports.deleteFilmDoc = async(movie) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(
      "DELETE FROM movies WHERE Title=(?)", [movie.Title]
    );
    return res;
    } catch (err) {
    console.log(err);
    return;
  } finally {
    if (conn) conn.release(); //release to pool
  }
}

exports.updateFilmDoc = async(movie) => {
  console.log(movie)
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(
      "DELETE FROM movies WHERE Title=(?)", [movie.Title]
    );
    return res;
    } catch (err) {
    console.log(err);
    return;
  } finally {
    if (conn) conn.release(); //release to pool
  }
}
// const client = await connect();
// console.log("****************")
// console.log(editedFilm)
// console.log("++++++++++++++++")
// console.log(editedFilm.title)
// result = await client
//   .db("movieDB")
//   .collection("movies")
//   .updateOne(
//     {"_id": ObjectID(_id) }, // Filtered
//     { $set: {
//       "Title": editedFilm.title,
//       "Released": editedFilm.released,
//       "Genre": editedFilm.genre,
//       "Director": editedFilm.director,
//       "Actors": editedFilm.actors,
//       "Plot": editedFilm.plot,
//       "Rating": editedFilm.rating,
//       "Score": editedFilm.score,
//       "Poster": editedFilm.route
//     }}, //UPDATED
//     {upsert: true}
//     );
// console.log(`${result.matchedCount} documents which coincide with request.`);
// if (result.upsertedCount > 0) { 
//     console.log(`A document was created with id: ${result.upsertedId._id}`);
//     return result;
//   } else {
//     console.log(`${result.modifiedCount} could not be modified.`);
// }