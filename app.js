const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes")


const app = express();


app.set('view engine', 'ejs');//  selecting ejs to serve as the templating system.

app.use(express.static('public')); // directing express to a folder to use static files 
app.use(express.json()); //allows us access to json data in body passed in with requests, has to be declared above authroutes
app.use(authRoutes); // grants app access to created routes


app.use(bodyParser.urlencoded({extended:true}));

const DBURI = "mongodb+srv://jay:zuzu@cluster0.zyzefdv.mongodb.net/" //make collection names plural
mongoose.connect(DBURI, ({useNewUrlParser: true, useUnifiedTopology: true})) // connect to database
    .then((result) => app.listen(8080))
    .catch((err) => console.log(err));

app.listen(3000, ()=> {
    console.log("This app runs on port 8080")
})



app.get('/', (req, res)=> {
    res.render('index');
})
