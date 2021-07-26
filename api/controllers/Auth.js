
const bcrypt = require('bcrypt');
const {GetUsers,GetOneUser} = require('./GetUser')
const {generateToken} = require('../token')

module.exports = {
    login:async(req,res,next) =>{
       try{
       const userData = await GetOneUser(req)　
       if(userData==null)return res.json({message:'パスワードまたはメールアドレスに間違いがあります。'})
       const token = await generateToken(userData)
       req.session.token = token
       return res.json({user:userData,token:token})        

       }catch(e){
         return res.json(e.message)
       }
    },
    
    logout:async(req,res,next) =>{
        try{
           delete req.session.token 
           res.send(200);
        }catch(e){
            return res.status(401).send({message:e.message})   
        }
    }
}