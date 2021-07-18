const express = require('express')
const router = express()
// const db = require('../models/user')
const User = require('../models/user');
var db = require('../models/');
const { check, validationResult } = require('express-validator');

router.get('/',(req,res)=>{
    console.log('get /')
    res.send(200,{message:'you can do it'})
})

router.get('/users',async(req,res,next)=>{

   try{

    await db.user.findAll()
    .then((response)=>{
        if(response)res.send(response)
    })

   }catch(e){
       console.log(message,e.message)
       res.send({'error':error.message})
   }


})


router.get('/recipes',async(req,res)=>{
    try{
     await db.recipe.findAll()
     .then((response)=>{
         res.send(response)
     })
     .catch(()=>{
         res.send({'error':e.message})
     })
 
    }
    catch(e){
        res.send({'error':e.message})
    }
 
 
 })

 router.get('/user/:id',(req,res)=>{
     console.log('params_id',req.params.id)
     const userId = req.params.id
     db.user.findOne({where:{id:userId}})
     .then(user=>{
        console.log('user',user)
         res.send(user)
     })
     .catch((e)=>{
         res.send({'userId_error':e.message})
     })
 })

module.exports = router;