const mongoose = require('mongoose');

const schema = mongoose.Schema({
    question: String,
    answers: [
        {
            text: {
              type: String,
              required: true,
            },
            isCorrect: {
              type: Boolean,
              default: false,
            },
          },
    ],
    language:String,
    });

module.exports = mongoose.model("questions",schema);