require("dotenv").config()
const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const corsOptions=require("./config/corsOptions")
const connectToDb=require("./config/dbConn")
const app=express()
const PORT=process.env.PORT || 1122
const verifyJwt=require("./middleware/verifyJwt")
connectToDb()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.use('/api/users',require("./routes/userRouter"))
app.use('/api/auth',require("./routes/authRouter"))
app.use(verifyJwt)
app.use("/api/orders",require("./routes/orderRouter"))
app.use('/api/courses',require("./routes/courseRouter"))
app.use('/api/kategories',require("./routes/kategoryRauter"))
app.use('/api/lecturers',require("./routes/lecturerRauter"))



app.get('/',(req,res)=>{
    res.send("This is the home page")
})

mongoose.connection.once('open',()=>{
    console.log('😍😘😜connected to DB😍😘😜'); 
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
    })
})
mongoose.connection.on('error',err=>{
    console.log(err);
})