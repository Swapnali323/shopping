//load express
const express = require("express");
const app = express();
// const db = require("./model")
// const Role = db.role;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//load mongoose
const mongoose = require('mongoose')

//cors
const cors = require('cors')
app.use(cors())

//headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
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

// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "moderator"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: "admin"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
//}

module.exports = app;

