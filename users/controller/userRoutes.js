var express = require("express");
const router = express.Router();
const app = express();
const bcrypt = require("bcrypt")
const User = require("../model/User");
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
app.use(bodyParser.json())

//cors
const cors = require('cors')
app.use(cors())

router.get('/',(req,res) =>{
    User.find()
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

router.post("/signup", (req, res) => {
 
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
          console.log(user)
        if (user.length >= 1) {                      //email id is present
          return res.status(409).json({
            message: "User with given mailId already exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name:req.body.name,
                email: req.body.email,
                password: hash,
                // role:req.body.role,
                address:req.body.address,
                mobileNo:req.body.mobileNo
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "You have created a new user account",
                    result
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
              // user.save((err, user) => {
              //   if (err) {
              //     res.status(500).send({ message: err });
              //     return;
              //   }
            
                // if (req.body.roles) {
                //   Role.find(
                //     {
                //       name: { $in: req.body.roles }
                //     },
                //     (err, roles) => {
                //       if (err) {
                //         res.status(500).send({ message: err });
                //         return;
                //       }
            
                //       user.roles = roles.map(role => role._id);
                //       user.save(err => {
                //         if (err) {
                //           res.status(500).send({ message: err });
                //           return;
                //         }
            
                //         res.send({ message: "User was registered successfully!" });
                //       });
                //     }
                //   );
                // } else {
              //     Role.findOne({ name: "user" }, (err, role) => {
              //       if (err) {
              //         res.status(500).send({ message: err });
              //         return;
              //       }
            
              //       user.roles = [role._id];
              //       user.save(err => {
              //         if (err) {
              //           res.status(500).send({ message: err });
              //           return;
              //         }
            
              //         res.send({ message: "User was registered successfully!" });
              //       });
              //     });
              //   }
              // });
            }
          });
        }
      });
  });

  router.get('/:id',(req,res)=>{
    const id = req.params.id;
    User.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  })
  
  router.delete("/:userId", (req, res) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


  //login 
  router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Use with given email doesn't exist"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
               
                email: user[0].email,
                userId: user[0]._id,
                // role:user[0].role
              // password:user[0].password            
              },
              "secret",
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Wrong Password"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });  

  router.patch('/:id',(req,res)=>{
    const id = req.params.id;
    const updateProfile = {};
    for (const ops of req.body) {
      updateProfile[ops.propName] = ops.value;
    }
    User.update({ _id: id }, { $set: updateProfile })
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
})

router.post('/orders',(req, res) => {
  const order = new User({
    userId:mongoose.Types.ObjectId(req.body.userId),
    productId:mongoose.Types.ObjectId(req.body.productId),
    initialDate:req.body.initialDate
  });
  order
    .save()
    .then(() => {
      console.log(result);
      res.status(201).json("Order created");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get('/:id/cart',(req,res)=>{
  const id = req.params.id;
  User.findById(id)
  .exec()
  .then((user) => {
    console.log(user);
    if (user) {
      res.status(200).json(user.cart);
    } else {
      res.status(404).json();
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
})

module.exports=router