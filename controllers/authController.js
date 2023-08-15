const user = require("../models/User");

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body; // the email and password inputs were put in using postman, to test the server 
    // functionalities without the presence of the frontend.
    // and then it is destructured using the curly braces and set to req.body using the express.json() middleware which
    // was imported into the app.js file

    try {
        const user = await User.create({ email, password }) // creates an instance of a user and passess it into the database.
        // we pass in the object containing the necessities for user attributes from the userSchema created
        res.status(201).json(user); //send user back as json
    }
    catch(err) {
        console.log(err);
        res.status(400).send("error, user not created")
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);

    res.send('user login');
}