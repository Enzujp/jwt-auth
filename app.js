const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();



// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = "mongodb+srv://jay:zuzu@cluster0.zyzefdv.mongodb.net/"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(8000), console.log("Connected to the database"))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('index'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);