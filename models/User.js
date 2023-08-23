const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  }
});

// fire a function after doc saved to db
userSchema.post('save', function (doc, next) {
  console.log('new user was created & saved', doc);
  next();
});

// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
  console.log('user about to be created & saved', this);
  const salt = await bcrypt.genSalt();
  this.password = bcrypt.hash(this.password, salt); 
  next();
});


// use userSchema statics property to authenticate login
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email }); // this could be written as User.findOne
  if (user) {// if user exists, compare inputed password to hashed password in database using bcrypt
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect Password');
  } 
  throw Error('Incorrect Email Address Entered');
} 

const User = mongoose.model('user', userSchema);

module.exports = User;