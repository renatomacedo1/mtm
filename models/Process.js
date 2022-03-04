const mongoose = require('mongoose')

const ProcessSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Please provide a code'],
      minlength: 1,
      maxlength: 3
    },
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      minlength: 5,
      maxlength: 100
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      minlength: 5,
      maxlength: 100
    },
    aux: {
      type: String
    },
    tmtLessThan20: {
      type: Number,
      required: [true, 'Please provide a tmt value less than 20'],
    },
    tmt20to50: {
      type: Number,
      required: [true, 'Please provide a tmt value 20 to 50'],
    },
    tmt50to80: {
      type: Number,
      required: [true, 'Please provide a tmt value 50 to 80'],
    },
  }
)

module.exports = mongoose.model('Process', ProcessSchema)