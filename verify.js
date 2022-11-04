const jwt = require("jsonwebtoken")

module.exports =async  function(req,res,next){
  const token = req.cookies.token;
  if(!token){
    req.auth = "Not allowed";
    next();
  }
  else{
    try{
      const decode = await jwt.verify(token, "Secrettt" , {algorithm : 'HS256'})
      req.data = decode;
      req.auth = "valid"
      next();
    }
    catch(e){
      console.log(e.message);
      req.auth = "Not allowed";
      next();
    }

  }
}
