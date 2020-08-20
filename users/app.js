//load express
const express = require("express");
const app = express();

const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//load mongoose
const mongoose = require('mongoose')

//cors
// const cors = require('cors')
// app.use(cors())

//auth
const auth = require("./middleware/auth")

const userRoute = require("./controller/userRoutes");

app.use('/users',userRoute)

//mongoose database connection
mongoose.connect('mongodb+srv://User:users@cluster0.msztp.mongodb.net/shopping?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log('Connected to database !!');
})
.catch((err)=>{
  console.log('Connection failed !!'+ err.message);
})

//headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "*"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

module.exports = app;

