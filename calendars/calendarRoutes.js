const express = require('express')
const router = express.Router()
const authMiddleware = require('../auth/authMiddleware')


router.get('/calendar', authMiddleware.requireJWT,(req, res) => {
    res.status(200).json(req.user)
})

module.exports = router