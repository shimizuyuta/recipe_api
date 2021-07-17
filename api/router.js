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

router.get('/users',async(req,res)=>{
   try{
    // db.users.findAll({}).then((instances) => { // usersのところが自分で作成したモデル
    //     console.log(instances); // usersの中身を全て取得した結果
    //   });
    await db.user.findAll().then((response)=>{
        // console.log(response)
        res.send(response)
    })

   }catch(e){
       console.log(message,e.message)
       res.send({'error':error.message})
   }


})


router.get('/recipe',async(req,res)=>{
    try{
     // db.users.findAll({}).then((instances) => { // usersのところが自分で作成したモデル
     //     console.log(instances); // usersの中身を全て取得した結果
     //   });
     await db.recipe.findAll().then((response)=>{
         // console.log(response)
         res.send(response)
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