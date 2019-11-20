require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const routes = require('./routes')

const server = express()

// Banco de dados
mongoose.connect(
  'mongodb+srv://adopets:adopetsadmin@cluster0-rzzyd.mongodb.net/adopets?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(morgan('dev'))
server.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
)
server.use(routes)

server.listen(process.env.PORT || 3333)
