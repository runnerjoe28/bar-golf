const mongoose = require('mongoose')

const Schema = mongoose.Schema

const drinkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  teamname: {
    type: String,
    enum: ["team0", "team1", "team2"],
    required: true
  },
  bar0: {
    type: String,
    enum: ["bogeydrink", "pardrink", "birdie", "nodrink"],
    default: "nodrink",
    required: true
  },
  bar1: {
    type: String,
    enum: ["bogeydrink", "pardrink", "birdie", "nodrink"],
    default: "nodrink",
    required: true
  },
  bar2: {
    type: String,
    enum: ["bogeydrink", "pardrink", "birdie", "nodrink"],
    default: "nodrink",
    required: true
  },
  bar3: {
    type: String,
    enum: ["bogeydrink", "pardrink", "birdie", "nodrink"],
    default: "nodrink",
    required: true
  },
  bar4: {
    type: String,
    enum: ["bogeydrink", "pardrink", "birdie", "nodrink"],
    default: "nodrink",
    required: true
  },
  bar5: {
    type: String,
    enum: ["bogeydrink", "pardrink", "birdie", "nodrink"],
    default: "nodrink",
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Drink', drinkSchema)