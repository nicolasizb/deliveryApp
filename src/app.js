const express = require('express')
const cors = require('cors')
const router = require('./routes/routes.js')


const app = express()
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(router)


module.exports = {
    app, 
    port
}

