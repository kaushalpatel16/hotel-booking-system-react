const mongoose = require('mongoose');


const schema = mongoose.Schema({
    kingsize: {
        type: Number,
        required:false,
      },
    queensize:{
        type: Number,
        required:false,
    },
    familysize:{
        type: Number,
        required:false,
    },
      bookedDates: [
        {
          type: String, // Assuming dates are stored as strings for simplicity
          required: true,
        },
      ],
      name:{
          type:String,
          required:true,
      },
      phone:{
          type:Number,
          required:true,
      },
      status:{
          type:String,
          required:true,
      }
    });

module.exports = mongoose.model("roombookdatas",schema);
