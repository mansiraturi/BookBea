const express = require('express');
const verify = require("../middleware/verify")
const router = express.Router();
const Book = require("../models/books");
const User = require("../models/users");
const uniqid = require("uniqid");

router.get("/:id",verify,async(req,res)=>{
  try{
  let uid = uniqid();
  const bookId = req.params.id;
  const book = await Book.findOne({_id:bookId});
  const requester = await User.findOne({username : req.data.username});
  const approvar = await User.findOne({username : book.userId});
  const requestApproval = {
    book : bookId,
    userId : book.userId,
    name : book.name,
    thumbnail : book.thumbnail,
    uid : uid
  }
  const pendingApproval = {
    book : bookId,
    userId : req.data.username,
    name : book.name,
    thumbnail : book.thumbnail,
    uid : uid
  }
  requester.requestApproval.push(requestApproval);
  let rA = requester.requestApproval;
  approvar.pendingApproval.push(pendingApproval);
  let aA = approvar.pendingApproval;
  await User.findOneAndUpdate({username : req.data.username} , {requestApproval : rA});
  await User.findOneAndUpdate({username : book.userId},{pendingApproval : aA});
  res.redirect("/dashboardR")
}
catch(e){
  res.send(e.message)
}
})

module.exports = router;
