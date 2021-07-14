const express = require('express')
const router = express()

router.get('/',(req,res)=>{
    console.log('get /')
})



module.exports = router;