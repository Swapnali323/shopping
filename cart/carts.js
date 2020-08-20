//load express
var express = require("express");
const app = express();
const bodyParser = require('body-parser')

//for hashing password
// const bcrypt = require("bcrypt");

//jsonweb token
const jwt = require('jsonwebtoken')

app.use(bodyParser.json())
//load mongoose
const mongoose = require('mongoose');
const { default: Axios } = require("axios");

//auth
// const auth = require("./middleware/auth")

//axios
const axios = require('axios');
const { response } = require("express");

require('./Cart')
const Cart = mongoose.model("Cart")

//mongoose database connection
mongoose.connect('mongodb+srv://User:users@cluster0.msztp.mongodb.net/shopping?retryWrites=true&w=majority',
    {
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    })
  .then(() => {
    console.log('Connected to database !!');
  })
  .catch((err)=>{
    console.log('Connection failed !!'+ err.message);
})

app.post('/addtocart',(req, res) => {
    const user = req.body.user;
    const item = {
      product: req.body.product,
      quantity: req.body.quantity
    };

    // const cart = new Cart({
    //   user :req.body.user,
      
    // product: req.body.product,
    // quantity: req.body.quantity
  
    // });
  
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
              .then(result => {
                  res.json(result)
              });
          } else {
            foundCart.items.push(item);
            foundCart.save().then(result => res.json(result));
          }
        } else {
          Cart.create({
            user: user,
            items: [item]
          })
            .then(result => res.json(result));
        }
     });
      
      // Cart
      //   .save()
      //   .then((result) => {
      //     console.log(result);
      //     res.status(201).json(result);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     res.status(500).json({
      //       error: err,
      //     });
      //   });
  });

  app.get('/carts',(req,res) =>{
    Cart.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
})

// app.get('/carts',  (req, res) => {
//   Cart.find()
//   .populate('items.product')
//   .exec((err, cart) => {
//     if (!cart) {
//       return res.send(null);
//     }

//     res.send(cart);
//   });
// });
// app.put('/carts/:id',  (req, res) => {
//   Cart.findById(req.body.id)
//     .then((foundCart) => {
//       foundCart.items = foundCart.items.filter((item) => item._id != req.body.itemId);
//       foundCart.save(() => res.send("updated"));
//     });
// });

// app.put('/update/:id').post((req, res) => {
//   Cart.findById(req.params.id)
//     .then(exercise => {
//       exercise. = req.body.username;
//       exercise.description = req.body.description;
//       exercise.duration = Number(req.body.duration);
//       exercise.date = Date.parse(req.body.date);

//       exercise.save()
//         .then(() => res.json('Exercise updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// })

  app.get('/carts/:id', (req, res) => {
    Cart.findById(req.params.id)
    
    .then((cart) => {
      if(cart){
        axios.get("http://localhost:3002/users/"+ cart.user).then((response)=>{
          //var cartObj = {email:response.data.email,productName:""}

           //axios.get("http://localhost:3001/products/"+cart.items).then((response)=>{
          //   cartObj.productName=response.data.name
           //  res.json(cartObj)
           
         console.log(response)
          })
        //})
        res.send("okay")
       .catch((err)=>{
        console.log(err);
        res.status(500).json({
          error: err,
        });
       })
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
    
  });

  app.delete("/carts/:id", (req, res, next) => {
    const id = req.params.id;
    Cart.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
  app.listen(3003,()=>{
    console.log("cart service listening to port 3003")
})