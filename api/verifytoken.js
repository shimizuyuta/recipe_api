require('dotenv').config();
const jwt = require('jsonwebtoken');
const verifyToken = (req,res,next) =>{
    const authHeader = req.headers["authorization"];
    if((authHeader !==undefined) && (authHeader.split(" ")[0] === "Bearer")){
        try{
           const token =authHeader.split(" ")[1];
           console.log('token_______',authHeader.split(' ')[1])

           jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                if(req.session.token===authHeader.split(" ")[1]){
                    next()
                }else{
                    return res.status(503).send({message:err.message})
                }
              
           })         

        }catch(e){
            return res.status(401).send({message:`invalid token ${e.message}`})
        }
    }else{
        return res.status(401).send({message:`invalid token `})
    }
}
module.exports={
    verifyToken:verifyToken
}