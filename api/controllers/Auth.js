
const bcrypt = require('bcrypt');
const {GetUsers,GetOneUser} = require('./GetUser')
const {generateToken} = require('../token')

module.exports = {
    login:async(req,res,next) =>{
       try{
       const userData = await GetOneUser(req)　
       const token = await generateToken(userData)
       req.session.token = token
       return res.json({user:userData,token:token})        

       }catch(e){

       }
    },
    
    logout:async(req,res,next) =>{
        try{
           req.session.token = null;
           res.send(200);
        }catch(e){
            return res.status(401).send({message:e.message})   
        }
    }
}