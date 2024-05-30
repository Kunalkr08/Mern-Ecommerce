const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db');
const router = require('./routes')
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
    origin : true,
    methods: ["GET", "POST", "PUT", "UPDATE", "DELETE"],
    credentials : true
})); 
app.use(bodyParser.json({ limit: '20mb' }));
app.use(express.json())
app.use(cookieParser())


app.use("/api", router)

app.get("/",(req,res)=>{
    res.send("Hello Kunal kumar");
})

const PORT = 8000 || process.env.PORT
connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log('Connected to DataBase');
        console.log('Server is running');
    })
})  
