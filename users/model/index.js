const mongoose = require('mongoose');

const db={}

db.mongoose = mongoose
db.user = require("./User");
db.role = require("./Role");

db.Roles = ["Customer","Merchant","User"]

module.exports = db