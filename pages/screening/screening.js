export default () => {
  const content = document.querySelector('.content');

  return fetch('./pages/screening/screening.html')
    .then((Response) => Response.text())
    .then((screeningHtml) => {
      content.innerHTML = screeningHtml;
    });
};

document.addEventListener("DOMContentLoaded", function() {
const apiUrl = 'http://api.jazzymcjazz.dk/api/public/screenings/1/14-10-2021/20-11-2022';
fetch(apiUrl)
.then(response => response.json())
.then(movieData => {
  //testing what movieData returns
  console.log(movieData);
  movieData.forEach(movie => {
    //testing what movie returns
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movieContainer');

    const movieTitle = document.createElement('h1');
    const movieImage = document.createElement('img');
    
    const movieTickets = document.createElement('button');
    movieTickets.addEventListener('click', () => {
      console.log(movie.movie.trailerUrl);
    });

    movieTickets.innerHTML = 'Buy Ticket';

    movieImage.src = movie.movie.posterUrl;
    movieTitle.innerHTML = movie.movie.title;
    

    movieContainer.appendChild(movieImage);
    movieContainer.appendChild(movieTitle);
    movieContainer.appendChild(movieTickets);

    document.querySelector('.screenings').appendChild(movieContainer);
  });
});    
});  

    