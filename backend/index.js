const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config');

const app = express()
const port = 3100

mongoose.connect(process.env.MONGODB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use('/',require('./src/routes'))
app.listen(port, () => console.log(`Example app listening on port port!  ${port}`))
