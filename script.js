"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const actorsRow = document.querySelector(".actorsRow");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  const movieCrd = await fetchMoviesCridit(movie.id);
  const movietrailer =await  movieTrailer(movie.id);
  const d=await fiveMovie();
  gId=movie.id
  onlyeOnce=false;
  const key =movietrailer.results[0].key;
  renderMovie(movieRes,movieCrd.cast,key);
  actorName(movieCrd.cast);
  renderMovies(d);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`); //person/{person_id} //movie/now_playing
  const res = await fetch(url);
  return res.json(); // shows a listt of now playing movis
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// You'll need to play with this function in order to add features and enhance the style.
// ===================this function render movies ================================
const renderMovies = (movies) => {
    const re =document.querySelector('.re');
    movies.map((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.setAttribute('class',`he`)
        movieDiv.innerHTML = `
          <div class="card ">
            <div class="front">
          <img class="smallPosterimg1 " style="border-radius: 25px;" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
            movie.title
          } poster">
            <div class="smallPoster" >
            <span > <img class="smallPosterimg" src="${BACKDROP_BASE_URL + movie.poster_path}" alt="${
              movie.title
            } poster"></span> <span class="h3P"><h3>${movie.title}</h3>
    
            </span> 
            <svg  xmlns="http://www.w3.org/2000/svg" class="h-1 w-0 svg2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
         </svg>
            </div>
            <div class="movieDetiles ">
              <div>Release Date<br>${movie.release_date}</div>
              <div>Rating <br>${movie.vote_average}</div>
              <div>Lang<br>${movie.original_language}</div>
              <div>Vote Count<br>${movie.vote_count}</div>
            </div>
          </div>
          <div class="back" style="background-image: url(${BACKDROP_BASE_URL + movie.poster_path})" >
            <p  calss="overview" >${movie.overview}</p>
          </div>
          </div>
          `;

          movieDiv.addEventListener("click", () => {          
          movieDetails(movie);
        });         
          if(movies.length===5){
            re.append(movieDiv) 
          }
          else{
            CONTAINER.appendChild(movieDiv)
            onlyeOnce=true
          }
      });     
};
// ===================this function render movies END ================================

// You'll need to play with this function in order to add features and enhance the style.
// ===================this function render |ONEMOVIE| ================================
const renderMovie = (movie,cridit,key) => {
  CONTAINER.innerHTML = `
            <div id="movie-backdrop" class="coverBg col"style="background-image: url(${BACKDROP_BASE_URL + movie.backdrop_path})" >        
            <div class="row grBackGround" >
              <div class="col-3 posterCard">
                <a class="trilerTag"  target="_blank" href="https://www.youtube.com/watch?v=${key}">
                <svg class="svg1" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <img  class="poster " src="${BACKDROP_BASE_URL + movie.poster_path}" >
                </a>            
              </div> 
              <div class="col-7 movieInfo">
                <h2 id="movie-title"> <span class="rating">
                <b>${movie.vote_average}</b>
                </span> ${movie.title}</h2>
                <hr>  
                <div class="txtInfo">
                  <p id="movie-release-date"><b>Release Date: </b> ${
                    movie.release_date
                  } </p>
                  <span id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</span>
                  <hr>
                  <h3>Overview:</h3>
                  <p id="movie-overview">${movie.overview}</p>
                  </div>
                  <ul id="actors" class="list-unstyled">Actors:</ul>  
                <div>
                    <div id="carousel">
                      <figure id="spinner">
                        <img src="${BACKDROP_BASE_URL + cridit[0].profile_path}" >
                        <img src="${BACKDROP_BASE_URL + cridit[1].profile_path}" >
                        <img src="${BACKDROP_BASE_URL + cridit[2].profile_path}" >
                        <img src="${BACKDROP_BASE_URL + cridit[3].profile_path}" >
                        <img src="${BACKDROP_BASE_URL + cridit[4].profile_path}" >
                        <img src="${BACKDROP_BASE_URL + cridit[5].profile_path}" >
                        <img src="${BACKDROP_BASE_URL + cridit[6].profile_path}" >
                        <img src="${BACKDROP_BASE_URL + cridit[7].profile_path}" >
                      </figure>
                      <span class="ActorName" >${cridit[0].original_name} </span> 
                    </div>
                  <span style="float:left" class="ss-icon" onclick="galleryspin('-')">&lt;</span>
                  <span style="float:right" class="ss-icon" onclick="galleryspin('')">&gt;</span> 
                </div>
               </div>
               <div class="re"></div>
              </div>
            </div>     
            </div>
    `;
    
};
// =================== this function render |ONEMOVIE| END ================================


// movies section Codes
const ddlists=document.querySelectorAll('.dropdown-item')
ddlists.forEach(element=>{
  addEventClick(element)
})

let gId=28; // the defult Id >> Action movies

// adding click event to the list's tags 
function addEventClick(element){
  element.addEventListener('click',async ()=>{
    const res= await getMoviesGeners();
    res.forEach( async(elementGenre)=>{   // getting the Id genre of the pressed tag
     if(elementGenre.name===element.innerHTML){
          const results=await fetchMoviesSimilar(elementGenre.id,'similar') 
          CONTAINER.innerHTML=" ";   
          renderMovies(results.results)
          gId=elementGenre.id;
          console.log(results.results)
     } 
    })
  })
}

// This function is to fetch Genres
const fetchMoviesGenre = async () => {
  const urlMoviesList=constructUrl(`genre/movie/list`);
  const resMoviesList= await fetch(urlMoviesList);
  return resMoviesList.json();
};

// this function get movies depend on the genere
const getMoviesGeners=async()=>{
  const res=await fetchMoviesGenre()
    return res.genres;
}

// This function is to fetch simirlar Movie depend on the Id
const fetchMoviesSimilar = async (genreId,typeId) => {
  const url = constructUrl(`movie/${genreId}/${typeId}`);
  const res = await fetch(url);
  return res.json();
};

// This function to add similar movies when scroling
const fetchMoviesSimilarNewPAge = async (genreId,pageNumber) => {
  const url = constructUrlNewPage(`movie/${genreId}/similar`,pageNumber);
  const res = await fetch(url);
  return res.json();
};

// this function to construct the link to get the next page of the appended movies
const constructUrlNewPage = (path,pageNumber) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI")}&page=${pageNumber}
  )}`;
};

let x=1; // page counter
let onlyeOnce=true // this variable to control the flow of the "Append When scrolling" event 
document.addEventListener('scroll', () => { // event when reaching the bootom get triggered
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight-1 && onlyeOnce) {
    x++;
    (async ()=>{
      const v=await fetchMoviesSimilarNewPAge(gId,x)
      renderMovies(v.results)
      console.log('hello1')
    })();
  }
});

// this function is to fetch five similar movies  
async function fiveMovie(){
      const v=await fetchMoviesSimilarNewPAge(gId,x)
      v.results.slice(0,5);
      return v.results.slice(0,5);
};

let type='upcoming'; // the general type  of the appendded movies if scroling event faild to get type

// ========================== movie filter start here ===========================
// This funciton to make the type of the appended movie "Top rated"  
const topRated=document.querySelector('.topRated')
topRated.addEventListener('click',e=>{    
  type='top_rated'
  Moviefilter(type)
})

const Upcoming=document.querySelector('.upcoming')
Upcoming.addEventListener('click',e=>{    
  type='upcoming'
  Moviefilter(type)
})

const popular=document.querySelector('.popular')
popular.addEventListener('click',e=>{    
  type='popular';
  Moviefilter(type)
})

const fetchMoviesfilter = async (type) => {
  const url = constructUrl(`movie/${type}`);
  const res = await fetch(url);
    return  res.json();
};

const movieTrailer =async (id)=>{
  const url= constructUrl(`movie/${id}/videos`)
  const res = await fetch(url);
  return res.json();
}

const recom=document.querySelector('.recommendations')
recom.addEventListener('click',async e=>{    
  gId=28;
  const results=await fetchMoviesSimilar(gId,'recommendations') 
  CONTAINER.innerHTML=" ";     
  renderMovies(results.results)
  console.log(results.results)
})


// ========================== movie filter End here ===========================

// ========================= fetch movie cridit ===============================
const fetchMoviesCridit = async (Id) => {
  const url = constructUrl(`movie/${Id}/credits`);
  const res = await fetch(url);
  return res.json();
};

let nameAr=[]; // this array will hold the main 8 char of the movie
// this funciton to get the name of the main 8 actors in the movie
async function actorName(cast){
  for(let i=0;i<8;i++){
    nameAr[i]= cast[i].original_name;
  }
}


//======================= Animation flipCard ===================
let angle = 0;
let index=0;
function galleryspin(sign) { 
  const actorN=document.querySelector('.ActorName');
  actorN.innerHTML=nameAr[index];
  index++;
  if(index>=7){
    index=0;
  }
  const spinner = document.querySelector("#spinner");
if (!sign) { angle = angle+45 ; } else { angle = angle - 45;}
spinner.setAttribute("style","-webkit-transform: rotateY("+ angle +"deg); -moz-transform: rotateY("+ 0 +"deg); transform: rotateY("+ angle +"deg);");
}
//======================= end Animation flipCard ===================

// this funtion fetch movie toprated/upcoming/....
const Moviefilter = async (type) => {
  const movie = await fetchMoviesfilter(type);
  CONTAINER.innerHTML="";
  gId=movie.results[0].id;
  renderMovies(movie.results);
};

// =================Actors single page starts here===================
const actorDetails = async (actor) => {
  const actorRes = await fetchActor(actor.id);
  const creditsresult = await fetchCredits(actor.id);
  onlyeOnce=false;
  renderActor(actorRes);
  render(creditsresult);
};
const fetchActor = async (personId) => {
  const url = constructUrl(`person/${personId}`);
  const res = await fetch(url);
  return res.json();
};
const fetchCredits = async (personId) => {
  const url = constructUrl(`person/${personId}/movie_credits`);
  const res = await fetch(url);
  return res.json();
};
const render = (creditsresult) => {
  renderActorMovie(creditsresult.cast.slice(0,5)); 
};
// =================End Actors single page starts here===================

// this funciton to render actor realted movies 
//=============================actor realted movies start ================
const renderActorMovie = (movies) => {
  console.log(movies)
  const movieCredits =document.querySelector('.movieCredits');
  movies.forEach ((movie) => {
    const div=document.createElement('div')
    console.log(movie)
    console.log("i")
     div.innerHTML = `
        <div class="card1 ">
            <div class="front front1">
          <img class="smallPosterimg1 " style="border-radius: 25px;" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
            movie.title
          } poster">
            <div class="smallPoster" >
            <span > <img class="smallPosterimg" src="${BACKDROP_BASE_URL + movie.poster_path}" alt="${
              movie.title
            } poster"></span> <span class="h3P"><h3>${movie.title}</h3>
            </span> 
            <svg  xmlns="http://www.w3.org/2000/svg" class="h-1 w-0 svg2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
         </svg>
            </div>
            <div class="movieDetiles ">
              <div>Release Date<br>${movie.release_date}</div>
              <div>Rating <br>${movie.vote_average}</div>
              <div>Lang<br>${movie.original_language}</div>
              <div>Vote Count<br>${movie.vote_count}</div>
            </div>
          </div> 
          </div>
          `;
        movieCredits.append(div)
        movieCredits.addEventListener("click", () => {  
         movieDetails(movie);
        });           
    });    
};
//=============================actor realted movies end ================

// this function renders actor info
// ============================= renderActor start =====================
const renderActor = (actor) => {
  CONTAINER.innerHTML = `
  <div class="act_or">
   <div class="row">
      <div class="col-4">
        <img src="${
          actor.profile_path
            ? BACKDROP_BASE_URL + actor.profile_path
            : "https://via.placeholder.com/350"
        }" alt="Card image cap" style="width:21rem;height:27rem">
      </div>
      <div class="col-8">
          <strong>
            <h2>${actor["name"]}</h2>
          </strong>   
          <strong>
            <h5>Gender:</h5>
          </strong>
          <p>${actor["gender"] === 1 ? "Female" : "Man"}</p>
          <strong>
            <h5>Birthday:</h5>
          </strong>
          <p>${actor["birthday"]}</p>
          <h5>popularity</h5>
          <p>${actor["popularity"]}</p>
          <strong>
            <h5>Biography:</h5>
          </strong>
          <p>${actor["biography"]}</p>
      </div>
    </div>
        <div>
        <strong>
         <h5 class='pl-3'>Known for:</h5>
        </strong>
        </div>
    <div class="movieCreditsParent ">
      <div  class='movieCredits'>
      </div>
    </div>
  </div>`;
};

// ============================= renderActor end =====================
const actorsBtn = document.getElementById("actors");
const fetchActors = async () => {
  const url = constructUrl("person/popular"); //person/{person_id} //movie/now_playing
  const res = await fetch(url);
  return res.json(); // shows a lsit of popular people
};

//this funciton to render Acors page top 20
//==================rendering Actors start ===================
const renderingActors = (actor1) => {
  onlyeOnce=false;
actor1.map((actor) => {
  const actorCardsDiv = document.createElement("div");
    let knFor=" "  
  if(typeof(actor.known_for[0].original_title) === "undefined" ){
        knFor ="there is no data";
    } 
    else{
      knFor=actor.known_for[0].original_title +actor.known_for[1].original_title
    }
  actorCardsDiv.innerHTML += `
    <div class="row mb-5 actorCards">
      <div class="col ree">
        <div class="cardd    " >
          <img class="card-img-top" src="${
            actor.profile_path
              ? BACKDROP_BASE_URL + actor.profile_path
              : "https://via.placeholder.com/350"
          }" alt="Card image cap" style="width: 15rem;height:15rem">
          <p class="text-dark mb-0 pl-2 ">
            <a><strong>${
              actor["name"].length >= 25
                ? actor["name"].slice(0, 20) + "..."
                : actor["name"]
            }</strong></a>
          </p>
          <p class="card-text pl-2 text-muted">${knFor.slice(0,50)}...</p>
        </div>
      </div>`;
      actorCardsDiv.addEventListener("click", () => {
      actorDetails(actor)
    });      
    CONTAINER.append(actorCardsDiv); // i midoified here
  });  
};
//==================rendering Actors end ===================

const homePageBtn = document.getElementById("homePage");
const homePage = async () => {
  let moviesInfo = await fetchMovies();
  let moviesarray = moviesInfo.results;
  CONTAINER.innerHTML = " ";
  renderMovies(moviesarray);
};
homePageBtn.addEventListener("click", homePage);

const addingActors = async () => {
  let fetchedActorObj = await fetchActors();
  let actorsList = fetchedActorObj.results;
  CONTAINER.innerHTML = "";
  renderingActors(actorsList)
};
actorsBtn.addEventListener("click", addingActors);


// Search box starts here
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const searchUrl = (search) => {
  return `${TMDB_BASE_URL}/search/multi?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}&query=${search}`;
};
const searchRes = async (value) => {
  const url = searchUrl(value);
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  console.log(data.results);
  return data.results;
};
const searching = async (event) => {
  event.preventDefault();
  const results = await searchRes(searchBox.value);
  console.log(results);
  CONTAINER.innerHTML = " ";
  if (results.length !== 0) {
    renderMovies(results);
  } else {
    CONTAINER.innerHTML = `
      <div class='notFoundMsgContainer'>
        There are no movies that matched your query.
      </div>
    `;
  }
};
searchBtn.addEventListener("click", searching);
// Search box ends here



////=================== About Us Code===================
// About us page starts here
const aboutUsBtn = document.getElementById("aboutUs");

const openAboutUsPage = () => {
  onlyeOnce=false;
  CONTAINER.innerHTML = " ";
  CONTAINER.innerHTML = `
  <div class='container aboutUsContainer d-flex justify-content-center flex-column align-items-center'>
    <div class='undrawContainer'>
      <h2 class="hithereh2">Hi there,</h2>
    </div>
    <div>
      <h1>Let's talk about OurMovies</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
    <div classe='advantegesContainer container'>
      <div class='row d-flex justify-content-center pb-2 '>
        <h2>The ourMovies Advantage</h2>
      </div>
      <div class='row'>
        <div class="col-1 pr-0 numbersAboutus">
          1
        </div>
        <div class='col-11 pl-0'>
          <p class='advantegesp'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
      <div class='row'>
        <div class="col-1 pr-0 numbersAboutus">
          2
        </div>
        <div class='col-11 pl-0'>
          <p class='advantegesp'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
      <div class='row'>
        <div class="col-1 pr-0 numbersAboutus">
          3
        </div>
        <div class='col-11 pl-0'>
          <p class='advantegesp'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
    </div>
  </div>
`;
};
aboutUsBtn.addEventListener("click", openAboutUsPage);
// About us page endss here
//===================About Us End Here===================


document.addEventListener("load", autorun());
