const mongoose = require('mongoose')

const uri = 'mongodb://localhost/calendar'

mongoose
    .connect(uri)
    .then(() => {
        console.log(`connected to ${uri}`)
    })
    .catch(err => {
        console.error(err.message)
    })

module.exports = mongoose