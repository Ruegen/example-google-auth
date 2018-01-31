const express = require('express')
const router = express.Router()
const authMiddleware = require('./authMiddleware')


router.get('/login', (req, res) => {
    res.redirect('/auth/google')
})
console.log(authMiddleware.googleAuthInit)

router.post('/auth/google/', authMiddleware.googleAuthInit )

router.get('/auth/google/callback', authMiddleware.googleAuth, authMiddleware.signJWTForUser, (req, res) => {
    res.status(200).json(req.user.token)
})

module.exports = router