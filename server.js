// librairies
const express = require('express');
const bodyParser = require('body-parser');

// vars
const app = express();
const port = 3000;

// users data
const db = {
  users: [
    {
      id: 55,
      password: 'welcomeadmin',
      username: 'Viktk',
      email: 'admin@victorcao.me',
    },
  ]
};

/* Middlewares */
// parse request body
app.use(bodyParser.json());

// cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  // response to preflight request
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  }
  else {
    next();
  }
});


/* Routes */
// Page d'accueil du serveur : GET /
app.get('/', (req, res) => {
  console.log('>> GET /');
  res.sendFile( __dirname + '/index.html');
});

// Login : POST /login
app.post('/login', (req, res) => {
  console.log('>> POST /login', req.body);
  const { email, password } = req.body;

  // authentication
  const user = db.users.find(user => user.email === email && user.password === password);

  // http response
  if (user) {
    console.log('<< 200', user.username);
    res.json({ 
      pseudo: user.username,
    });
  }
  else {
    console.log('<< 401 UNAUTHORIZED');
    res.sendStatus(401);
  }
});


/*
 * Server
 */
app.listen(port, () => {
  console.log(`listening on *:${port}`);
});
