const db = require('../model/db');


const autoTicketCode = async () => {
    try {
        const randomticket=Math.floor(Math.random()*100000).toString().padStart(5,'0')
        return randomticket
    } catch (error) {
        console.error('Error generating ticket code:', error);
        throw new Error('Error generating ticket code');
    }
};
const checkUnique=async(ticketcode)=>{
    try{
        const checkTicket='SELECT * From ticketdetails WHERE ticketcode=?'
        const [result]=await db.query(checkTicket,[ticketcode])
        return result.length===0
    }catch(error){
        console.log(error)
    }
}

const postticket = async (req, res) => {
    const { customername, controllerno, state, district, village, block, faultcode, complainttype, details, picture } = req.body;

    try {
        const ticketcode = "TICK" + await autoTicketCode();
        const isUnique=await checkUnique(ticketcode)
        
        while(!isUnique){
            ticketcode = "TICK" + await autoTicketCode();
            isUnique=await checkUnique(ticketcode)
        }

            const sql = "INSERT INTO ticketdetails (ticketcode, customername, controllerno, state, district, village, block, faultcode, complainttype, details, picture) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
            await db.query(sql, [ticketcode, customername, controllerno, state, district, village, block, faultcode, complainttype, details, picture]);
            return res.status(200).send({ message: 'Ticket inserted successfully', ticketcode });
       
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error while inserting ticket details");
    }
};


const getTicketDetails=async(req,res)=>{
    try{
        const sql="SELECT * FROM ticketdetails"
        const [result]=await db.query(sql)
        res.status(200).json(result)
    }catch(error){
        res.status(400).send(error)
    }
}

const updateTicketDetails=async(req,res)=>{
    const {ticketcode}=req.params
    try{
        const {customername, controllerno, state, district, village, block, faultcode, complainttype, details, picture }=req.body
        const sql='UPDATE ticketdetails SET customername=?, controllerno=?, state=?, district=?, village=?, block=?, faultcode=?, complainttype=?, details=?, picture=? WHERE ticketcode=?'
        await db.query(sql,[customername, controllerno, state, district, village, block, faultcode, complainttype, details, picture,ticketcode])
        res.status(200).send('ticket updated')


    }catch(error){
        res.status(400).send(error)
    }
}
const deleteTicketDetails=async(req,res)=>{
    const {ticketcode}=req.params
    try{
        const sql='DELETE FROM ticketdetails WHERE ticketcode=?'
        await db.query(sql,[ticketcode])
        res.status(200).send('ticket deleted successfully')
    }catch(error){
        res.status(400).send(error)
    }
}
module.exports = { postticket,getTicketDetails,updateTicketDetails ,deleteTicketDetails};
