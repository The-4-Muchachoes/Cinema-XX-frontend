import renderMain from './pages/main/main.js';
import renderLogin from './pages/login/login.js';

export default () => {
  const router = new Navigo('/', { hash: true });
  const contentDiv = document.querySelector('.content');
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
    })
    .resolve();
};
