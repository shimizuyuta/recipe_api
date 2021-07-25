
var db = require('../../models');
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');

const CreateUser = async(req,res,next) =>{
    try{
        const id = uuid()
        console.log('id',id)
        const now = Date()
        const salt = await bcrypt.genSalt()
        const hashed_password = await bcrypt.hash(req.body.password,2);
        const params = {
                id:id,
                name:req.body.name,
                email:req.body.email,
                password:hashed_password,
                created_at: now,
                updated_at:now,
        }
        await db.user.create(params)
            .then((user)=>{
                console.log(user,'create user');
                return res.status(200).send({message:'create new user'})
            })
         
            .catch((e)=>{
                console.log('e',e)
                return res.status(503).send({message:e.message})
            })
    }catch(e){
        console.log('e',e)
        return res.status(503).send({message:e.message})
    }

}

module.exports={ 
    CreateUser:CreateUser,
}