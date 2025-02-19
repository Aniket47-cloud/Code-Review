const express = require('express')
const aiRoutes = require("./routes/ai.routes")
const cors =require('cors')
const app=express();  //server created
  app.use(cors())
app.use(express.json())


app.use('/ai',aiRoutes)

app.use((err,req,res,next)=>{
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

module.exports=app;
