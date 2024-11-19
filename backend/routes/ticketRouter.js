const express=require('express')
const router=express.Router()
const verifyToken=require('../middlewares/authmiddleware')
const rolemiddleware=require('../middlewares/rolemiddleware')

const ticketController=require('../controllers/ticketController')


router.post('/addticket',ticketController.upload.single('picture'),ticketController.postticket)
router.get('/getticket',verifyToken,rolemiddleware("admin"),ticketController.getTicketDetails)
router.get('/getticket/user',verifyToken,rolemiddleware("user"),ticketController.getTicketUser)
router.put('/updateticket/:ticketcode',ticketController.upload.single('picture'),ticketController.updateTicketDetails)
router.delete('/deleteticket/:ticketcode',ticketController.deleteTicketDetails)


module.exports=router