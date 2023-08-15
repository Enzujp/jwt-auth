const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
});


// create a new model based on the userSchema
const User = mongoose.model('user', userSchema); //must be in singular form to what you named your db collection. 
// mongoose looks at the model name 'user', pluralizes it and then connects it to your collection.


module.exports = User;