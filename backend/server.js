require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const noteRoutes = require('./routes/notes')
const userRoutes = require('./routes/users')
const invalidPath = require('./errorHandling')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//Routes
app.use('/api/notes', noteRoutes)

// app.use('/api/users', userRoutes)

app.all("*", invalidPath)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB, ->>> server.js')
      console.log(`Server started, listening on port ${process.env.PORT}...`)
    })
  })
  .catch((error) => {
    console.log(error)
  })

  module.exports = app
