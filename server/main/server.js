const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const getHandler = require('../routes/getH')

//configure environment variables
dotenv.config()

//start an express server
const app = express()

//setup middleware
app.use(morgan('dev'))
app.use(bodyParser.json())

//setup routes
app.get('/stateLoc', (req ,res) => {
    return getHandler.getLoc(req, res)
})



app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
