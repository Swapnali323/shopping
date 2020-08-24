const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name:{
      type:String,
      required: true
  },
  email: {
    type: String,
 
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
password: {
    type: String,
    minlength: 5
},
address:{
    type:String,
    required: true
},
mobileNo:{
    type: Number,
    required: true
},
role: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Role"
},
cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  ],
history: {
    type: Array,
    default: []
},
image: String,
token: {
    type: String,
},
tokenExp: {
    type: Number
},
orders:{
    type:Array
}
})

module.exports = mongoose.model("User", userSchema);
