// Written by Lars

export default () => {
  const content = document.querySelector('.content');

  const user = JSON.parse(localStorage.getItem('user'));
  if (user == null || user.accessToken == null) window.location.href = '/';

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
    console.log(order.screening.startTime);
    const datetime = order.screening.startTime.split('T');
    const date = formatDate(datetime[0]);
    const time = datetime[1].slice(0, 5);

    const orderDiv = document.createElement('div');
    orderDiv.setAttribute('class', 'order flex');
    orderDiv.innerHTML = getOrderHtml(order, date, time);

    ordersDiv.appendChild(document.createElement('hr'));
    ordersDiv.appendChild(orderDiv);

    if (order.status == 'CONFIRMED') {
      const cancelTd = document.querySelector(`#cancel-td-${order.id}`);
      cancelTd.appendChild(getCancelButton(order));
    }
  });
}

function formatDate(date) {
  const dateList = date.split('-');
  const year = dateList[0];
  const month = dateList[1];
  const day = dateList[2];

  return `${day}-${month}-${year}`;
}

function getOrderHtml(order, date, time) {
  return `
  <table>
    <tbody>
      <tr>
        <td rowspan="6">
          <img src="${order.screening.movie.posterUrl}" alt="movie poster"/>
        </td>
        <td>Movie:</td>
        <td>${order.screening.movie.title}</td>
        <td class="cancel-td" id="cancel-td-${order.id}" rowspan="6"></td>
      </tr>
      <tr>
        <td>Theater:</td>
        <td>${order.screening.theater.name}</td>
      </tr>
      <tr>
        <td>Date:</td>
        <td>${date}</td>
      </tr>
      <tr>
        <td>Time:</td>
        <td>${time}</td>
      </tr>
      <tr>
        <td>Status:</td>
        <td>${order.status}</td>
      </tr>
      <tr>
        <td>Seats:</td>
        <td>${getSeatHtml(order.seats)}</td>
      </tr>  
    </tbody>
  </table>
  `;
}

function getSeatHtml(seats) {
  let seatHtml = ``;

  seats.forEach((seat) => {
    seatHtml += `
      <div>Row: ${seat.row}, Seat: ${seat.seatNo}</div>
    `;
  });

  return seatHtml;
}

function getCancelButton(order) {
  const btn = document.createElement('button');
  btn.setAttribute('class', 'cancel-tickets');
  btn.setAttribute('title', 'Cancel Tickets');
  btn.innerHTML = 'X';
  addCancelTicketsEventListener(btn, order);

  return btn;
}

function addCancelTicketsEventListener(button, order) {
  button.addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    fetch(`${window.apiUrl}/api/user/bookings/${order.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: 'Bearer ' + user.accessToken,
      },
    }).then((Response) => {
      console.log(Response);
      window.location.reload();
    });
  });
}
