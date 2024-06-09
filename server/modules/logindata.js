const mongoose = require('mongoose');


const schema = mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    password:String,
    user:String,
    });

module.exports = mongoose.model("logindatas",schema);