const User = require("../models/User");
const jwt = require("jsonwebtoken"); // to be used for signup

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

const maxAge = 3 * 24 * 60 * 60; //setting maxage to 3 days as the values of jwt "expiresIn " must be in seconds

const createToken = (id) => { // the jwt.sign method takes in the payload and a secret, the secret should be long
  return jwt.sign({id}, 'my name is jp', {
    expiresIn: maxAge
  }); //the id is the payload and it is the only required value for the jwt creation
}

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id); // create token using user id from database
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }); //cookie maxAges are in milliseconds
    // res.status(201).json(user);
    res.status(201).json({user: user._id}); // to send the user id instead of returning all the user's information
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  } 
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  res.send('user login');
}