export default () => {
  const content = document.querySelector('.content');

  return fetch('./pages/my-orders/my-orders.html')
    .then((Response) => Response.text())
    .then((myOdersHtml) => {
      content.innerHTML = myOdersHtml;
      run();
    });
};

async function run() {
  const orders = await fetchOrders();
  renderOrders(orders);
}

async function fetchOrders() {
  const user = JSON.parse(localStorage.getItem('user'));

  return await fetch(`${window.apiUrl}/api/user/bookings`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + user.accessToken,
    },
  })
    .then((Response) => Response.json())
    .then((bookingData) => {
      console.log(bookingData);
      return bookingData;
    });
}

function renderOrders(orders) {
  const ordersDiv = document.querySelector('.orders');

  orders.forEach((order) => {
    const datetime = order.screening.startTime.split('T');
    const date = formatDate(datetime[0]);
    const time = datetime[1].slice(0, 5);

    const orderDiv = document.createElement('div');
    orderDiv.innerHTML = `
            <div class="orders-movie-title">Movie ${order.screening.movie.title}</div>
            <div class="order-info">Theater: ${order.screening.theater.name}</div>
            <div class="order-info">Date: ${date}</div>
            <div class="order-info">Time: ${time}</div>
            <div class="order-info">Seats: </div>
            <div class="order-info">Status: ${order.status}</div>
          `;
    ordersDiv.appendChild(orderDiv);
  });
}

function formatDate(date) {
  const dateList = date.split('-');
  const year = dateList[0];
  const month = dateList[1];
  const day = dateList[2];

  return `${day}-${month}-${year}`;
}
