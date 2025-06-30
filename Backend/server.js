const express = require('express');
const cors=require('cors');
const connectToMongo = require('./db/dbConnect');
const adminRouter=require('./routes/adminRouter');
const authRouter=require('./routes/authRouter')
require('dotenv').config();
const app=express();
connectToMongo();
app.use(cors());
app.use(express.json());

app.use('/admin',authRouter,adminRouter);

const port=process.env.PORT || 5000;
app.listen(port || 5000,()=>{
    console.log("Backend running on port "+port);
})