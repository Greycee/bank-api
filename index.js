const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB connected!')
})

const accountsRouter = require('./routes/accounts')
app.use('/', accountsRouter)

app.listen(5000, () => {
  console.log('server is running on port 5000')
})
