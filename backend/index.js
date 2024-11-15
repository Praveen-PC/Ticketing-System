const express=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
require('dotenv').config()

const registerRoutes=require('./routes/registerRouter')
const loginRouter=require('./routes/loginRouter')
const ticketRouter=require('./routes/ticketRouter')

const app=express()

app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE']
}))
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("hello")
})

app.use('/api',registerRoutes)
app.use('/api',loginRouter)
app.use('/api',ticketRouter)


const PORT=process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})