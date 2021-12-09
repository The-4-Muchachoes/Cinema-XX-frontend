// Written by everyone

import renderNavbar from './components/navbar/navbar.js';
import renderMain from '/pages/main/main.js';
import renderSignup from '/pages/signup/signup.js';
import renderLogin from './pages/login/login.js';
import renderBookingPage from './pages/book-tickets/book-tickets.js';
import renderOrders from './pages/my-orders/my-orders.js';
import renderNowPlaying from './pages/screening/screening.js';

export default () => {
  const router = new Navigo('/', { hash: true });
  window.router = router;
  router
    .on({
      '/': () => {
        renderMain().then(router.updatePageLinks);
        console.log('User requested main page');
      },
      login: () => {
        renderLogin().then(router.updatePageLinks);
        console.log('User requested login page');
      },
      signup: () => {
        renderSignup().then(router.updatePageLinks);
        console.log('User requested signup page');
      },
      '/book-tickets/:id': ({ data }) => {
        renderBookingPage(data.id).then(router.updatePageLinks);
      },
      orders: () => {
        renderOrders().then(router.updatePageLinks);
      },
      screening: () => {
        renderNowPlaying().then(router.updatePageLinks);
      },
    })
    .on({
      '*': async () => {
        renderNavbar().then(router.updatePageLinks);
      },
    })
    .resolve();
};
