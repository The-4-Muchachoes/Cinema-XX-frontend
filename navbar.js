let signup;
let login;
let logout;
const navOptions = document.querySelector('.nav-options');

renderNavbar();

function renderNavbar() {
  let user;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch {}
  //   console.log('User: ' + user);
  //   console.log('Token: ' + user.accessToken);

  if (user == null || user.accessToken == null) renderLoggedOut();
  else renderLoggedIn();
}

function renderLoggedOut() {
  navOptions.innerHTML = `
        <div class="flex logged-out">
            <div>
                <a href="" class="signup-nav nav-option" data-navigo>Signup</a>
            </div>
            <div>
                <a href="" class="login-nav nav-option" data-navigo>Login</a>
            </div>
        </div>`;

  signup = document.querySelector('.signup-nav');
  login = document.querySelector('.login-nav');
  signup.setAttribute('href', '/signup');
  login.setAttribute('href', '/login');
}

function renderLoggedIn() {
  const user = JSON.parse(localStorage.getItem('user'));

  navOptions.innerHTML = `
        <div class="flex logged-in">
            <div>
                <a href="" class="logout-nav nav-option">Logout</a>
            </div>
        </div>`;

  logout = document.querySelector('.logout-nav');
  logout.setAttribute('href', '/');

  logout.addEventListener('click', () => {
    user = null;
    localStorage.setItem('user', user);
    renderNavbar();
  });
}
