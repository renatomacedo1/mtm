const mongoose = require("mongoose");

const processSchema = new mongoose.Schema(
  {
    index: {
      type: Number,
      required: [true, "Error - no index received"],
    },
    code: {
      type: String,
      required: [true, "Please provide MTM-UAS code"],
      minLength: 1,
      maxlength: 3,
    },
    distance: {
      type: Number,
      required: [true, "Please provide a distance code"],
      enum: [1, 2, 3],
    },
    factor: {
      type: Number,
      required: [true, "Please provide a factor"],
    },
    type: {
      type: String,
      required: [true, "Please provide type (left hand or right hand)"],
      default: "left",
    }
  }
)

const TableSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide process name"],
      minLength: 1,
      maxlength: 50,
    },
    processes: [
      processSchema
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Table", TableSchema);
