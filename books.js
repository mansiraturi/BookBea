const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  name : String,
  author : String,
  edition : String,
  category : String,
  rating : String,
  thumbnail : String,
  shared : Number,
  hold : Number,
  userId : String,
  cloudinary_id : String
})


module.exports = mongoose.model("Books",BookSchema)
