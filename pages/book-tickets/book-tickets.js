// Written by Lars

export default (id) => {
  const content = document.querySelector('.content');

  return fetch('./pages/book-tickets/book-tickets.html')
    .then((response) => response.text())
    .then((bookTicketHtml) => {
      content.innerHTML = bookTicketHtml;
      renderPage(id);
    });
};

async function renderPage(id) {
  const screening = await fetchMovieDetails(id);
  renderMovieDetails(screening);
  console.log(screening);
  renderBookingTool(screening);
}

async function fetchMovieDetails(id) {
  return fetch(`${window.apiUrl}/api/public/screenings/${id}`)
    .then((Response) => Response.json())
    .then((movieData) => movieData);
}

async function fetchSeatingAvailability(screeningId) {
  return fetch(`${window.apiUrl}/api/public/seats/${screeningId}`)
    .then((Response) => Response.json())
    .then((seatingData) => seatingData);
}

function renderMovieDetails(screening) {
  const title = document.querySelector('h1');
  const img = document.querySelector('.movie-poster');
  title.innerHTML = screening.movie.title;
  img.setAttribute('src', screening.movie.posterUrl);
}

async function renderBookingTool(screening) {
  let user;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch {}

  if (user == null || user.accessToken == null) {
    renderNotAuthenticatedMsg();
    return;
  }

  let seatingData = await fetchSeatingAvailability(screening.id);
  console.log(seatingData);
  const selectedSeats = renderSeating(seatingData);
  renderConfirmationButton(selectedSeats, screening.id);
}

function renderNotAuthenticatedMsg() {
  const bookingTools = document.querySelector('.booking-tools');
  const notAuthenticatedMsg = document.createElement('p');
  notAuthenticatedMsg.setAttribute('class', 'ta-center blue');
  notAuthenticatedMsg.innerHTML =
    'Please <a class="inline-block" href="/#/signup">signup</a> or <a class="inline-block" href="/#/login">login</a> to book tickets';
  bookingTools.appendChild(notAuthenticatedMsg);
}

function renderSeating(seatingData) {
  const bookingTools = document.querySelector('.booking-tools');
  const seatContainer = document.createElement('div');
  const selectedSeats = new Set();

  const lastSeat = seatingData[seatingData.length - 1];
  for (let row = 1; row <= lastSeat.row; row++) {
    const rowDiv = document.createElement('div');
    const seatsInRow = seatingData.filter((seat) => seat.row == row);
    const lastSeatInRow = seatsInRow[seatsInRow.length - 1];

    for (let seatNo = 1; seatNo <= lastSeatInRow.seatNo; seatNo++) {
      const seat = seatsInRow[seatNo - 1];

      const seatDiv = document.createElement('div');
      if (seat.status == 'FREE') {
        seatDiv.setAttribute('class', 'seat available');
        addSeatEventlistener(selectedSeats, seat, seatDiv);
      } else seatDiv.setAttribute('class', 'seat unavailable');

      rowDiv.appendChild(seatDiv);
    }
    seatContainer.appendChild(rowDiv);
  }

  bookingTools.appendChild(seatContainer);
  return selectedSeats;
}

function addSeatEventlistener(selectedSeats, seat, seatDiv) {
  seatDiv.addEventListener('click', () => {
    if (selectedSeats.has(seat)) {
      selectedSeats.delete(seat);
      seatDiv.setAttribute('class', 'seat available');
    } else {
      selectedSeats.add(seat);
      seatDiv.setAttribute('class', 'seat reserved');
    }
  });
}

function renderConfirmationButton(selectedSeats, screeningId) {
  const con = document.querySelector('.book-seats-container');
  const btn = document.createElement('button');
  btn.innerHTML = 'Book Seats';
  btn.addEventListener('click', () => {
    sendBookSeatsRequest(selectedSeats, screeningId);
  });

  con.appendChild(btn);
}

async function sendBookSeatsRequest(seats, screeningId) {
  let seatIds = [];
  seats.forEach((seat) => {
    seatIds.push(seat.id);
  });

  if (seatIds.length == 0) return;

  const user = JSON.parse(localStorage.getItem('user'));

  console.log(screeningId);
  console.log(seatIds);

  await fetch(`${window.apiUrl}/api/user/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + user.accessToken,
    },
    body: JSON.stringify({
      screeningId: screeningId,
      seatIds: seatIds,
    }),
  })
    .then((Response) => Response.json())
    .then((response) => {
      console.log(response);
    });

  window.location.reload();
}
