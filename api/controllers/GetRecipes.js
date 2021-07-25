var db = require('../../models');
module.exports = {
    main:async(req,res,next) =>{
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
    }
}