const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'] //automatically checks email input for validity of email
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
        minlength: [6, 'min password length is 6 characters'], // minlength should not be camelCase
    },
});
// mongoose hooks
//execute a function before doc is saved to schema
userSchema.pre('save', async function(next) {
    console.log("Here we go, weeeeee!", this); // this represents the instance of the user
    // generate a salt
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


//execute a function after a new user has been saved to database
userSchema.post('save', function(doc, next) {
    console.log('new user created', doc);

    next();
})





// create a new model based on the userSchema
const User = mongoose.model('user', userSchema); //must be in singular form to what you named your db collection. 
// mongoose looks at the model name 'user', pluralizes it and then connects it to your collection.


module.exports = User;