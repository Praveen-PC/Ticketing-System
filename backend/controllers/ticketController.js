const db = require('../model/db');
const multer=require('multer')
const path=require('path')


const autoTicketCode = async () => {
    try {
        const randomticket=Math.floor(Math.random()*100000).toString().padStart(5,'0')
        return randomticket
    } catch (error) {
        console.error('Error generating ticket code:', error);
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

const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'uploads/')
},
filename:(req,file,cb)=>{
    cb(null,Date.now()+path.extname(file.originalname))
}
})

const upload=multer({storage:storage})


const postticket = async (req, res) => {
    const { customername, controllerno,head,imei,hp,motortype, state, district, village, block, faultcode, complainttype, details,user_id,status } = req.body;
    const picture = req.file ? req.file.path: null;
    try {
        const ticketcode = "TICK" + await autoTicketCode();
        const isUnique=await checkUnique(ticketcode)
        
        while(!isUnique){
            ticketcode = "TICK" + await autoTicketCode();
            isUnique=await checkUnique(ticketcode)
        }

            const sql = "INSERT INTO ticketdetails (ticketcode, customername, controllerno,head,imei,hp,motortype, state, district, village, block, faultcode, complainttype, details, picture,user_id,status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            await db.query(sql, [ticketcode, customername, controllerno,head,imei,hp,motortype, state, district, village, block, faultcode, complainttype, details, picture,user_id,status]);
            const consql="Insert INTO conversation (tickcode,message,messageby,status,isread) Values(?,?,?,?,?)"
            await db.query(consql,[ticketcode,complainttype,user_id,status,0])
            return res.status(200).send({ message: 'Ticket inserted successfully', ticketcode });

       
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error while inserting ticket details");
    }
};



const getTicketUser = async (req, res) => {
    const id = req.user.id;  
    const userRole = req.user.role;  
    const { ticketStatus } = req.query;  

    console.log("Ticket Status:", ticketStatus);

    let sql = "SELECT * FROM ticketdetails WHERE user_id = ?";
    if (!ticketStatus) {
        if (userRole === "admin") {
            sql = "SELECT * FROM ticketdetails";  
        } else {
            sql = "SELECT * FROM ticketdetails WHERE user_id = ?";  
        }
    } else {
        if (userRole === "admin") {
            sql = "SELECT * FROM ticketdetails WHERE status = ?";
        } else if (userRole === "user") {
            sql = "SELECT * FROM ticketdetails WHERE user_id = ? AND status = ?";
        }
    }

    try {
        let params;
        if (userRole === "admin" && ticketStatus) {
            params = [ticketStatus];  
        } else if (userRole === "user" && ticketStatus) {
            params = [id, ticketStatus];  
        } else {
            params = [id];  
        }
        const [result] = await db.query(sql, params);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error retrieving ticket details:", error);
        res.status(500).send({ message: "Error retrieving ticket details", error });
    }
};



const updateTicketDetails=async(req,res)=>{
    const {ticketcode}=req.params
    try{
        const {customername, controllerno,head,imei,hp,motortype, state, district, village, block, faultcode, complainttype, details,status}=req.body
        const picture=req.file?req.file.path:null;     
        const sql='UPDATE ticketdetails SET customername=?, controllerno=?,head=?,imei=?,hp=?,motortype=?, state=?, district=?, village=?, block=?, faultcode=?, complainttype=?, details=?, picture=?, status=? WHERE ticketcode=?'
        await db.query(sql,[customername, controllerno,head,imei,hp,motortype, state, district, village, block, faultcode, complainttype, details, picture,status,ticketcode])
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


const postMessage=async(req,res)=>{
    const {ticketcode,message,messageby,status} =req.body
    const sql="INSERT INTO conversation (tickcode,message,messageby,status,isread) VALUES (?,?,?,?,?)"
    try{
        await db.query(sql,[ticketcode,message,messageby,status,0])
        res.status(200).send("message send successfully")
    }catch(error){
        console.log(error)
        res.status(400).send("error occurred while message")
    }
}



const getMessage = async (req, res) => {
    const { ticketcode } = req.query;
    const sql="SELECT * FROM conversation WHERE tickcode=?"
    try {
        const [result]=await db.query(sql,[ticketcode])
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error while getting message");
    }
};


const getAllMessage = async (req, res) => {
    const { ticketcode } = req.query;
    const sql="SELECT * FROM conversation "
    try {
        const [result]=await db.query(sql,[ticketcode])
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error while getting message");
    }
};



const markMessageAsRead = async (req, res) => {
    const { ticketcode, messageby } = req.body; 
    const sql = "UPDATE conversation SET isread = 1 WHERE tickcode = ? AND messageby = ?";
    try {
        await db.query(sql, [ticketcode, messageby]);
        res.status(200).send("Message marked as read");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error marking message as read");
    }
};





module.exports = { postticket,updateTicketDetails ,deleteTicketDetails,getTicketUser,upload,postMessage,getMessage,getAllMessage,markMessageAsRead};
