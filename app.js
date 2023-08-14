const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();


app.set('view engine', 'ejs');//  selecting ejs to serve as the templating system.

app.use(express.static('public')); // directing express to a folder to use static files 

app.use(bodyParser.urlencoded({extended:true}));

const DBURI = "mongodb+srv://jay:zuzu@cluster0.zyzefdv.mongodb.net/" //make collection names plural
mongoose.connect(DBURI, ({useNewUrlParser: true, useUnifiedTopology: true})) // connect to database
    .then((result) => app.listen(8000))
    .catch((err) => console.log(err));

app.listen(3000, ()=> {
    console.log("This app runs on port 8000")
})

let newTodoList = [];


app.get('/', (req, res)=> {
    res.render('index');
})
