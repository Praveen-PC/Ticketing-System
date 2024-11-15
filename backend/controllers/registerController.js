const db=require('../model/db')
const bcrypt=require('bcrypt')


const postUser= async(req,res)=>{
    const {name,phoneNo,password,role}=req.body
    try{
        const userRole=role || 'user'
        const checkUser='SELECT * FROM userdetails WHERE phoneNo=?'
       const [result]=  await db.query(checkUser,[phoneNo])
         
        if(result.length>0){
            res.status(401).send("user already exist")
        }else{
            const hashpassword= await bcrypt.hash(password,10);
            const sql='INSERT INTO userdetails (name,phoneNo,password,role) VALUES(?,?,?,?)'
             await db.query(sql,[name,phoneNo,hashpassword,userRole])
               res.status(200).send('user Registered')
        }
    }catch(error){
        return res.status(400).send({error: error.message})
    }
}

module.exports={postUser}