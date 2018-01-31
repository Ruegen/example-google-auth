const mongoose = require('../db/init')
const timestamps = require('mongoose-timestamp')
const passportLocalMongoose = require('passport-local-mongoose')

// developer used typescript so they export "default"
const { default: findOneOrCreate } = require('mongoose-findoneorcreate')


var userSchema = new mongoose.Schema({
  email:  { type: String, index: true },
  username: { type: String, index: true },
  password:  String,
  googleId: { type: String, index: true },
  googleTokens: {
    refreshToken: String,
    accessToken: String
  }
})

userSchema.plugin(timestamps)
userSchema.plugin(findOneOrCreate)
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true, // Ensure that all emails are lowercase
  session: false, // Disable sessions as we’ll use JWTs
})


const User = mongoose.model('User', userSchema)

module.exports = User
