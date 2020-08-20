var express = require("express");
const router = express.Router();
const app = express();

const Product = require("../model/Product");

const bodyParser = require('body-parser')
const multer = require('multer');
app.use(bodyParser.json())

//cors
const cors = require('cors')
app.use(cors())

router.post('/addtocart',(req, res) => {
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

  router.get('/carts',(req,res) =>{
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

router.get('/carts/:id', (req, res) => {
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

  router.delete("/carts/:id", (req, res, next) => {
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

  module.exports=router