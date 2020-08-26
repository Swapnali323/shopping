var express = require("express");
const router = express.Router();
const app = express();
const mongoose = require('mongoose')
const Product = require("../model/Product");

const bodyParser = require('body-parser')
const multer = require('multer');
app.use(bodyParser.json())

//cors
const cors = require('cors')
app.use(cors())

const auth =require("../middleware/auth")
//get all the products
router.get('/',(req,res) =>{
    Product.find()
    // .sort(['name',1])
    // .select("_id name price category")
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

//get product by id
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    Product.findById(id)
   
    .then((product) => {
      console.log(product);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
})

//add product to database
router.post('/',auth,(req,res)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        category:req.body.category,
        productImage:req.body.productImage
      });
      product
        .save()
        .then((result) => {
          console.log(result);
          res.status(201).json(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
})

//update a product
router.patch('/:id',auth,(req,res)=>{
  const id = req.params.id;
  Product.update(
  //   {
  //   _id:id
  // },
  {
    $set:{
      name:req.body.name,
      price:req.body.price,
      category:req.body.category,
      productImage:req.body.productImage,
      description:req.body.description
    }
  }).exec()
  .then((product) => {
    console.log(product);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "No valid entry found for provided ID" });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
})

//delete a product
router.delete("/:id",auth, (req, res, next) => {
    const id = req.params.id;
    Product.remove({ _id: id })
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

//upload an image
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname)
  },
  fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      if (ext !== '.jpg' || ext !== '.png') {
          return cb(res.status(400).end('only jpg, png are allowed'), false);
      }
      cb(null, true)
  }
})

var upload = multer({ storage: storage })

router.post('/uploadImage',auth,upload.single("productImage"),(req,res)=>{
  console.log(req.file)
  const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      category:req.body.category,
      productImage:req.body.productImage
    });
    product
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
})

// router.patch('/uploadImage/:id',(req,res)=>{
//   const id = req.params.id;
//   const updateProd = {};
//   for (const ops of req.body) {
//       updateProd[ops.propName] = ops.value;
//   }
//   Product.update({ _id: id }, { $set: updateProd })
//     .exec()
//     .then(result => {
//       res.status(200).json(result);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// })
router.post("/search",(req, res) => {
  const category = req.body.category;
  
  Product.find({ category:category })
    .exec()
    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(500).json("Error: " + err));
});
module.exports=router
