var express = require("express");
const mongoose = require('mongoose')
const Product = require("../model/Product");
const User = require('../model/User')
const Cart = require('../model/Cart');
// const router = require('../../products/controller/produtRoutes');
const router = express.Router();

// router.post('/',(req,res)=>{
//     const userId = req.body.user;
//     const productId = req.body.product;
//     // console.log(userId, flightId);
//     // const newBooking = new Booking({ userId, flightId });
//     // const booking = await newBooking.save();
//   const product = Product.findById(productId)
// //    .then((product) => {
// //     console.log(product);
// //     if (product) {
// //       res.status(200).json(product);
// //     } else {
// //       res.status(404).json(product);
// //     }
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //     res.status(500).json({ error: err });
// //   });
//   const user = User.findById(userId)
// //   .then((user) => {
// //    console.log(user);
// //    if (user) {
// //      res.status(200).json(user);
// //    } else {
// //      res.status(404).json(user);
// //    }
// //  })
// //  .catch((err) => {
// //    console.log(err);
// //    res.status(500).json({ error: err });
// //  });
//     // const user = await User.findById(userId);
//     user.cart.push(product);
//     user.save();
//     const newCart = new Cart({ product, user });
//     newCart.save();
//     res.status(201).json({ success: "true" });
// })

router.post('/', (req, res) => {
    const user = req.body.user;
    const item = {
      product: req.body.product,
      quantity: req.body.quantity
    };
  
    Cart.findOne({ user: user })
      .then((foundCart) => {
        if (foundCart) {
          let products = foundCart.items.map((item) => item.product + '');
          if (products.includes(item.product)) {
            Cart.findOneAndUpdate({
              user: user,
              items: {
                $elemMatch: { product: item.product }
              }
            },
              {
                $inc: { 'items.$.quantity': item.quantity }
              })
              .exec()
              .then(() => res.send(foundCart));
          } else {
            foundCart.items.push(item);
            foundCart.save().then(() => res.send(foundCart));
          }
        } else {
          Cart.create({
            user: user,
            items: [item]
          })
            .then(() => res.end());
        }
      });
  });

  router.get('/',  (req, res) => {
    const id = req.body.id;
    Cart.findById(id)
   
    .then((cart) => {
      console.log(cart);
      if (cart) {
        res.status(200).json(cart);
      } else {
        res.status(404).json("error");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  });

//   router.post('/order',(req, res) => {
//     const user = req.body.user;
//     const order = {
//         product: req.body.product
        
//       };
//     User.findById(user)
//       .then((foundUser) => {
//         foundUser.order = foundUser.order.concat(req.body.order);
//         foundUser.save(() => res.end());
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json({ error: err });
//       });
//   });

router.post('/orders', (req, res) => {
    const user = req.body.user;
    const item = {
      product: req.body.product,
      quantity: req.body.quantity
    };
  
    Cart.findOne({ user: user })
      .then((foundCart) => {
        if (foundCart) {
          let products = foundCart.items.map((item) => item.product + '');
          if (products.includes(item.product)) {
            Cart.findOneAndUpdate({
              user: user,
              items: {
                $elemMatch: { product: item.product }
              }
            },
              {
                $inc: { 'items.$.quantity': item.quantity }
              })
              .exec()
              .then(() => res.send(foundCart));
          } else {
            foundCart.items.push(item);
            foundCart.save().then(() => res.send(foundCart));
          }
        } else {
          Cart.create({
            user: user,
            items: [item]
          })
            .then(() => res.end());
        }
      });
  });
  
 module.exports=router