const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username : String,
  password : String,
  given : Array,
  received : Array,
  pendingApproval : Array,
  requestApproval : Array
})


module.exports = mongoose.model('User',UserSchema);
