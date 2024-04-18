const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noDrinkPenalty = 2
const pointMappings = [-2, -1, 0, 1, noDrinkPenalty]

const drinkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  teamname: {
    type: String,
    required: true
  },
  bar0: {
    type: Number,
    enum: pointMappings,
    default: noDrinkPenalty,
    required: true
  },
  bar1: {
    type: Number,
    enum: pointMappings,
    default: noDrinkPenalty,
    required: true
  },
  bar2: {
    type: Number,
    enum: pointMappings,
    default: noDrinkPenalty,
    required: true
  },
  bar3: {
    type: Number,
    enum: pointMappings,
    default: noDrinkPenalty,
    required: true
  },
  bar4: {
    type: Number,
    enum: pointMappings,
    default: noDrinkPenalty,
    required: true
  },
  bar5: {
    type: Number,
    enum: pointMappings,
    default: noDrinkPenalty,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Drink', drinkSchema)