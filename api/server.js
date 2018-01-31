require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const PORT = process.env.PORT

const server = express()

server.use(passport.initialize())
server.use(bodyParser.json())

// express routes
const authRoutes = require('./auth/authRoutes')
const calendarRoutes = require('./calendars/calendarRoutes')

server.use('/', [
    authRoutes,
    calendarRoutes
])

server.listen(PORT, () => {
    console.log(`listening at localhost:${PORT}`)
})