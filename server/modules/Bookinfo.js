const mongoose = require('mongoose');


const schema = mongoose.Schema({
    name:String,
    Time:String,
    request:String,
    fivepersontable:Number,
    fourpersontable:Number,
    threepersontable:Number,
    phonenumber:Number,
    visibility:String,
    date:String,
    });

module.exports = mongoose.model("bookinginfos",schema);