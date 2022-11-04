const express = require('express');
const verify = require("../middleware/verify")
const router = express.Router();
const _ = require("lowdash")
const User = require("../models/users");

router.get("/",verify,async(req,res)=>{
  try{
    const user = await User.findOne({username : req.data.username});
    res.render("dashboardR",{username : req.data.username , pendingApproval : user.pendingApproval , requestApproval : user.requestApproval})
  }
  catch(e){
    res.send(e.message)
  }
})

router.post("/:id",verify,async(req,res)=>{
  let user = await User.findOne({username : req.data.username});
  let rA = user.pendingApproval;
  let count = 0;
  for(let i =0;i<rA.length;i++){
    if(rA[i].uid == req.params.id){
      count = i;
      break;
    }
  }
  let temp = rA[count];
  rA.splice(count,1);
  // console.log(rA);
  let given = user.given;
  given.push(temp);
  await User.findOneAndUpdate({username : req.data.username},{pendingApproval : rA , given : given})

  let user2 = temp.userId
  user = await User.findOne({username : user2});
  rA = user.requestApproval;
  count = 0;
  for(let i =0;i<rA.length;i++){
    if(rA[i].uid == req.params.id){
      count = i;
      break;
    }
  }
  temp = rA[count];
  rA.splice(count,1);
  let received = user.received;
  received.push(temp);
  await User.findOneAndUpdate({username : user2},{requestApproval : rA , received : received});
  res.redirect("/dashboardG")

})

module.exports = router;
