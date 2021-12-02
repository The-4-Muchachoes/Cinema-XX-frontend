import renderMain from '/pages/main/main.js';
import renderSignup from '/pages/signup/signup.js';

export default () => {
  const router = new Navigo('/', { hash: true });
  router
    .on({
      '/': () => {
        renderMain().then(router.updatePageLinks);
        console.log('User requested main page');
      },
      signup: () => {
        renderSignup().then(router.updatePageLinks);
        console.log('User requested signup page');
      },
    })
    .resolve();
};
