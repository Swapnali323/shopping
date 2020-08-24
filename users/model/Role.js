const mongoose = require("mongoose");

const roleShema = mongoose.Schema({
    name:String
})

module.exports = mongoose.model("Role", roleShema);
