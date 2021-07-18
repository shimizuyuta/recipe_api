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


router.get('/recipe',async(req,res)=>{
    try{
     await db.recipe.findAll()
     .then((response)=>{
         res.send(response)
     })
     .catch(()=>{
         console.log('aaaaaaaaaaaaaa')
     })
 
    }catch(e){
        res.send({'error':e.message})
    }
 
 
 })

 router.get('/user/:id',(req,res)=>{
     console.log('params',req.params.id)
     res.send(200)
 })

module.exports = router;