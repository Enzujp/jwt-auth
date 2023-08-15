module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = (req, res) => {
    const { email, password } = req.body; // the email and password inputs were put in using postman, to test the server 
    // functionalities without the presence of the frontend.
    // and then it is destructured using the curly braces and set to req.body using the express.json() middleware which
    // was imported into the app.js file

    console.log(email, password);
    res.send('User sign up');
}

module.exports.login_post = (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);

    res.send('user login');
}