const mongoose = require('mongoose');


const schema = mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    kingsize:Number,
    queensize:Number,
    familysize:Number,
    adult:Number,
    children:Number,
    from:String,
    to:String,
    status:String
    });

module.exports = mongoose.model("roominfos",schema);
