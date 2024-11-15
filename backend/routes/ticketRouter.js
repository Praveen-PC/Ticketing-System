const express=require('express')
const router=express.Router()

const ticketController=require('../controllers/ticketController')


router.post('/addticket',ticketController.postticket)
router.get('/getticket',ticketController.getTicketDetails)
router.put('/updateticket/:ticketcode',ticketController.updateTicketDetails)
router.delete('/deleteticket/:ticketcode',ticketController.deleteTicketDetails)


module.exports=router