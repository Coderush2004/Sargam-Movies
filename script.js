const backendUrl = 'http://localhost:64473'; 

function showSignup() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "block";
}

function showLogin() {
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  fetch(`http://localhost:64473/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password })
  }).then(res => res.json()).then(data => {
    if (data.success) {
      alert('Login successful!');
      document.getElementById("bookingSection").style.display = "block";
      document.getElementById("loginBox").style.display = "none";
    } else {
      alert('Login failed!');
    }
  });
}

function signup() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  fetch(`http://localhost:64473/signup`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password })
  }).then(res => res.json()).then(data => {
    alert(data.message);
    if (data.success) showLogin();
  });
}

function bookTicket() {
  const movie = document.getElementById("movieSelect").value;
  const date = document.getElementById("date").value;
  const seats = document.getElementById("seats").value;

  fetch(`http://localhost:64473/book`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ movie, date, seats })
  }).then(res => res.json()).then(data => {
    document.getElementById("response").innerText = data.message;
  });
}
