const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/User');


app.post('/',(req, res) => {
  User.findById(req.user)
    .then((foundUser) => {
      foundUser.orders = foundUser.orders.concat(req.body.order);
      foundUser.save(() => res.end());
    });
});
// app.post('/products',(req,res)=>{
//     const orser = new Order({
//         _id: new mongoose.Types.ObjectId(),
//         name: req.body.name,
//         price: req.body.price
//       });
//       product
//         .save()
//         .then((result) => {
//           console.log(result);
//           res.status(201).json(result);
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(500).json({
//             error: err,
//           });
//         });
// })