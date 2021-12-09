// Written by Lars and Periklis

export default () => {
  const header = document.querySelector('.header');

  return fetch('./components/navbar/navbar.html')
    .then((Response) => Response.text())
    .then((navbarHtml) => {
      header.innerHTML = navbarHtml;
      renderNavbar();
    });
};

function renderNavbar() {
  let user;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch {}

  if (user == null || user.accessToken == null) renderLoggedOut();
  else renderLoggedIn();
}

function renderLoggedOut() {
  const navOptions = document.querySelector('.nav-options');

  navOptions.innerHTML = `
        <div class="flex logged-out">
            <div>
               <a href="" class="screening-nav nav-option" data-navigo>Screenings</a>
            </div>
            <div>
                <a href="" class="signup-nav nav-option" data-navigo>Signup</a>
            </div>
            <div>
                <a href="" class="login-nav nav-option" data-navigo>Login</a>
            </div>
         </div>`;

  const signup = document.querySelector('.signup-nav');
  const login = document.querySelector('.login-nav');
  const screening = document.querySelector('.screening-nav');
  signup.setAttribute('href', '/signup');
  login.setAttribute('href', '/login');
  screening.setAttribute('href', '/screening');
}

function renderLoggedIn() {
  const navOptions = document.querySelector('.nav-options');

  navOptions.innerHTML = `
      <div class="flex logged-in">
        <div>
          <a href="" class="screening-nav nav-option" data-navigo>Screenings</a>
        </div>
        <div>
          <a href="" class="my-orders-nav nav-option" data-navigo>My Bookings</a>
        </div>
        <div>
          <a class="logout-nav nav-option">Logout</a>
        </div>
      </div>`;

  const screening = document.querySelector('.screening-nav');
  const myorders = document.querySelector('.my-orders-nav');
  const logout = document.querySelector('.logout-nav');
  screening.setAttribute('href', '/screening');
  myorders.setAttribute('href', '/orders');
  logout.setAttribute('href', window.location.hash);

  logout.addEventListener('click', () => {
    localStorage.setItem('user', null);
    window.location.reload();
  });
}
