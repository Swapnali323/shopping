const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  name: {
    type: String,
    maxlength: 50
},
password: {
    type: String,
    minglength: 5
},
lastname: {
    type: String,
    maxlength: 50
},
role: {
    type: String,
    default: 0
},
cart: {
    type: Array,
    default: []
},
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
