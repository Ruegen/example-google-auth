const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const passport = require('passport')
const JWT = require('jsonwebtoken')
const PassportJwt = require('passport-jwt')
const User = require('../users/userModel')

const jwtSecret = process.env.JWT_SECRET
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '7 days'


passport.use(User.createStrategy())

// google auth strategy for passport
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {

    User.findOneOrCreate(
        // find the user
        { googleId: profile.id },
        // if unfound, create user
        { 
            googleId: profile.id,
            // accessToken gives user access to their google account
            // refreshToken is for accessToken renewal
            googleTokens: { 
                accessToken: accessToken, 
                refreshToken: refreshToken
            }  
        }
    )
    .then( user => {
        if(!user) { 
            return done(null, false)
        }

        return done(null, user)
    })
    .catch( error => { 
        return done(error, false)
    })
}))


passport.use(new PassportJwt.Strategy(
  // Options
  {
    // Where will the JWT be passed in the HTTP request?
    // e.g. Authorization: Bearer eyJhbGc…
    jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    // What is the secret
    secretOrKey: jwtSecret,
    // What algorithm(s) was used to sign it?
    algorithms: [jwtAlgorithm]
  },
  // When we have a verified token
  (payload, done) => {
    // Find the real user from our database using the `id` in the JWT
    User.findById(payload.sub)
      .then((user) => {
        // If user was found with this id
        if (user) {
          done(null, user)
        }
        // If not user was found
        else {
          done(null, false)
        }
      })
      .catch((error) => {
        // If there was a failure
        done(error, false)
      })
  }
))
  

function signJWTForUser(req, res) {
  // Get the user (either just signed in or signed up)
  const user = req.user
  // Create a signed token
  const token = JWT.sign(
    // Payload
    {
      email: user.email
    },
    // Secret
    jwtSecret,
    // Options
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString()
    }
  )
  // Send the token
  res.json({ token })
}
  


module.exports = {
    initialize: () => passport.initialize(),
    googleAuthInit: passport.authenticate('google', { 
        accessType: 'offline', // refresh token
        prompt: 'consent',
        session: false, 
        scope: ['profile'], 
        failureRedirect: '/login'  
    }),
    googleAuth: passport.authenticate('google', { 
        session: false,
        failureRedirect: '/login' 
    }),
    requireJWT: passport.authenticate('jwt', { session: false }),
    signJWTForUser
}





