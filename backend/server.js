require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')


const cors = require('cors')
// const corsOptions = require('./config/corsOptions')

console.log(process.env.NODE_ENV)

connectDB()
app.use(express.json());
app.use(cors());
app.use('/',express.static(path.join(__dirname,'/public')))

app.use('/',require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))

mongoose.connection.once('open', () =>{
    console.log("connected to mongoDB")
    app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))
})

mongoose.connection.on('error', err =>{
    console.log(err)
})
