const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Important to allow requests from frontend

const app = express();
const port = 64473;

app.use(cors());              // Enable CORS for frontend
app.use(express.json());      // Parse incoming JSON

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sargam_movies'
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL as id ' + connection.threadId);
});

// Home route
app.get('/', (req, res) => {
  res.send('Hello from Express and MySQL!');
});

// Signup route
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err) => {
    if (err) {
      console.error('Signup error:', err);
      return res.status(500).json({ success: false, message: 'Signup failed' });
    }
    res.json({ success: true, message: 'Signup successful' });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ success: false, message: 'Login failed' });
    }
    res.json({ success: true, message: 'Login successful' });
  });
});

// Book route (optional)
app.post('/book', (req, res) => {
  const { movie, date, seats } = req.body;
  res.json({ success: true, message: `Booked ${seats} seat(s) for ${movie} on ${date}` });
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
