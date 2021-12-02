import renderNavbar from './navbar.js';
import renderMain from '/pages/main/main.js';
import renderSignup from '/pages/signup/signup.js';
import renderLogin from './pages/login/login.js';

export default () => {
  const router = new Navigo('/', { hash: true });
  router
    .on({
      '/': () => {
        renderMain().then(router.updatePageLinks);
        console.log('User requested main page');
      },
      login: () => {
        renderLogin();
        console.log('User requested login page');
      },
      signup: () => {
        renderSignup().then(router.updatePageLinks);
        console.log('User requested signup page');
      },
    })
    .on({
      '*': async () => {
        renderNavbar();
      },
    })
    .resolve();
};
