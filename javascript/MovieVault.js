const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=191a732&s=';
const API_URL_SEARCH = 'http://www.omdbapi.com/?apikey=191a732&i=';

var search_input = document.getElementById("search-input");
var card= document.getElementsByClassName("movie-cards")[0];

document.getElementsByClassName("search")[0].addEventListener("click", function(){
    const query = search_input.value;
    if(query){
        getMovies(API_URL+query);
    }
});

async function getMovies(url){
    const resp= await fetch(url);
    const rdata = await resp.json();
    showMovies(rdata.Search);
}

function showMovies(movies){
    card.innerHTML="";
    movies.forEach(async function(movie){
        const movieData = await fetch(API_URL_SEARCH+movie.imdbID);
        const movieDataobj = await movieData.json();
        movie_display(movieDataobj);
    });
}

function movie_display(imovie){
    const movieElem = document.createElement('div');
    movieElem.classList.add("movie-card");
    movieElem.innerHTML=`
    <div class="card">
        <div class="poster">
            <img src="${imovie.Poster}" alt = "Poster" />
        </div>
        <div class="movie-description">
            <p class="movie-title"><b>Title: </b>${imovie.Title}</p>
            <p class="movie-title"><b>Rating: </b>${imovie.imdbRating}</p>
            <p class="movie-title"><b>Director: </b>${imovie.Director}</p>
            <p class="movie-title"><b>Released: </b>${imovie.Released}</p>
            <p class="movie-title"><b>Genre: </b>${imovie.Genre}</p>
        </div>     
    </div>
    `;
    card.appendChild(movieElem);
}