const jwt = require('jsonwebtoken');
const { findById } = require('../models/User');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'my name is jp', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

//check user 
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) { // check for token
        jwt.token(token, 'my name os jp', async (err, decodedToken) => { // verify token
            if (err) {
                console.log(err.message);
                res.locals.user = null; // explicitly setting user property to null, as we would check it later in views
                next();
            } else {
                console.log(decodedToken); // recall that the id is embedded during the creation of the token
                let user = await User.findById(decodedToken.id)
                res.locals.user = user;
                next();
                // to output this value in a view, we make use of the .locals function
                
                // res.locals.xyz = "using this sample xyz variable would output the string contents"
            }
        })
    } else {
        res.locals.user = null;
    }
}

module.exports = { requireAuth, checkUser };