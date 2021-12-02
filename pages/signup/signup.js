export default () => {
    const content = document.querySelector('.content');
  
    return fetch('./pages/signup/signup.html')
      .then((Response) => Response.text())
      .then((mainHtml) => {
        content.innerHTML = mainHtml;
      });
  };