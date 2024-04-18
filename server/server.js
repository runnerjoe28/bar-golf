require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const drinkRoutes = require('./routes/drinks')
const cors = require('cors')

// creates express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next()
})

// routing
app.use('/api/drink', drinkRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('listening on port 4000');
    })
  })
  .catch((error) => {
    console.log(error)
  })
