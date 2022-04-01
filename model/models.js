const mongoose = require("mongoose");
 
// create an schema
var userSchema = new mongoose.Schema({
        image_url: String,
        date: String
    });
 
module.exports = mongoose.model("pictures", userSchema);