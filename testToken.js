const username = 'JazzyMcJazz';
const password = 'savemeperi';

testEndpoints();

async function testEndpoints() {
  //   await testSignup(username, password);
  //   await testLogin(username, password);
  await createBooking(1, [5]);
}

async function testSignup(username, password) {
  fetch('http://localhost:8080/api/public/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((Response) => Response.json())
    .then((userData) => {
      console.log(userData);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function testLogin(username, password) {
  fetch('http://localhost:8080/api/public/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.accessToken) {
        localStorage.setItem('user', JSON.stringify(response));
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

async function createBooking(screeningId, seatIds) {
  const user = JSON.parse(localStorage.getItem('user'));

  fetch('http://localhost:8080/api/user/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.accessToken,
    },
    body: JSON.stringify({
      screeningId: screeningId,
      seatIds: seatIds,
    }),
  })
    .then((Response) => Response.json())
    .then((bookingData) => {
      console.log(bookingData);
    });
}
