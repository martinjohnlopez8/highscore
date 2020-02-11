const mongoose = require('mongoose')

const playersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  win: {
    type: Number,
  }, 
})

module.exports = mongoose.model('Player', playersSchema)