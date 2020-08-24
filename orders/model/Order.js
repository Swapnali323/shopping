const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    userId:mongoose.Types.ObjectId(req.body.userId),
    productId:mongoose.Types.ObjectId(req.body.productId),
    initialDate:req.body.initialDate
    
});

module.exports = mongoose.model('Product', productSchema);