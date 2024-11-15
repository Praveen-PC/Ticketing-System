const express=require('express')
const router=express.Router()
const registerConteoller=require('../controllers/registerController')

router.post('/adduser',registerConteoller.postUser)

module.exports=router