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
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(
      `INSERT INTO movies (Title, Poster, Synopsis, Rating, Runtime, Genre, Director, Actors, Released, Score) VALUES (?,?,?,?,?,?,?,?,?,?)`, 
      [movie.Title, movie.Poster, movie.Plot, movie.Rating, movie.Runtime,movie.Genre,movie.Director,movie.Actors,movie.Date,movie.Score]);
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

exports.getMovieDetails = async (id) => {
  console.log(id);
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(
      "SELECT * FROM movies WHERE ID=(?)", [id]
    );
    console.log(res[0])
    console.log(res)
   return res[0];
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
    console.log(`The film ${movie.Title} has been removed from DB`)
    return res;
    } catch (err) {
    console.log(err);
    return;
  } finally {
    if (conn) conn.release(); //release to pool
  }
}

exports.updateFilmDoc = async(ID,movie) => {
  let conn;
  console.log("@@@@@@@@@@@@@@@@@@@@")
  console.log(ID)
  try {
    conn = await pool.getConnection();
    const res = await conn.query(
      `UPDATE movies SET Title=(?), Poster=(?), Synopsis=(?), Rating=(?), Runtime=(?), Genre=(?), Director=(?), Actors=(?), Released=(?), Score=(?) WHERE ID=(?)`, [movie.title, movie.poster, movie.plot, movie.rating, movie.runtime, movie.genre, movie.director, movie.actors, movie.released, movie.score, movie.ID]
    );
    console.log(res);
    console.log("Film has been updated to DB");
    return res;
    } catch (err) {
    console.log(err);
    return;
  } finally {
    if (conn) conn.release(); //release to pool
  }
}