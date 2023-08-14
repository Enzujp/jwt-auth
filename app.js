const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');//  selecting ejs to serve as the templating system.

app.use(express.static('public')); // directing express to a folder to use static files 

app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, ()=> {
    console.log("This app runs on port 3000")
})


app.get('/', (req, res)=> {
    res.render('index');
})