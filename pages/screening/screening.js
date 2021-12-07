export default () => {
    const content = document.querySelector('.content');
  
    return fetch('./pages/screening/screening.html')
      .then((Response) => Response.text())
      .then((screeningHtml) => {
        content.innerHTML = screeningHtml;
      });
  };


const apiUrl = 'http://api.jazzymcjazz.dk/api/public/screenings/2/14-10-2021/20-11-2022'
fetch(apiUrl)
    .then(response => response.json())
    .then(movieData => {
        console.log(movieData);
    })   

    