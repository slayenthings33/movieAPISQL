//***************FILM PAGE****************//

let favoriteButton = document.getElementById("favoriteButton");

  favoriteButton.addEventListener("click", ()=> {
    console.log("function uploadFave");
    let movieData = document.getElementsByTagName("span")
    console.log(movieData);
    let newMovie={
      "ID": _id.innerText,
      "Title":movieName.innerText,
      "Rating": rated.innerText,
      "Runtime": runtime.innerText,
      "Genre": genre.innerText,
      "Director": director.innerText,
      "Actors": actors.innerText,
      "Date": released.innerText,
      "Score": score.innerText,
      "Plot": plot.innerText,
      "Poster": document.getElementById("poster").src,
    }
    fetch('/films/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'},
      body:JSON.stringify(newMovie)
        })
        .then((response)=>{
          console.log("Data uploaded successfully!")
          location.replace("/");
          console.log(response)
        })
      .catch((e)=>{
        console.log("error "+e)
      })});