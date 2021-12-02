const signup = document.querySelector('.signup-nav');
const login = document.querySelector('.login-nav');

signup.setAttribute('href', '/signup');
login.setAttribute('href', '/login');

console.log('asdf');

fetch('http://localhost:8080/api/public/login', {
  method: 'POST',
  mode: 'no-cors',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify({
    username: 'jazzymcjazz',
    password: 'savemeperi',
  }),
})
  .then((Response) => Response.json())
  .then((response) => {
    console.log(response);
  });
