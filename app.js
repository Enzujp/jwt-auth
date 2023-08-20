const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = "mongodb+srv://jay:zuzu@cluster0.zyzefdv.mongodb.net/" //make collection names plural
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000), console.log("This finally works baby"))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('index'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

// cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/set-cookies', (req, res) => {

  // res.setHeader('Set-Cookie', 'newUser=true');
  
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

  res.send('you got the cookies!');

});

app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies; //this can be used because of the cookie-parser middleware
  console.log(cookies.newUser);

  res.json(cookies);

});