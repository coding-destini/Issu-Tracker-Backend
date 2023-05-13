const express = require('express');
const port = 1000;
const app = express();
const db = require('./config/mongoose')


app.use(express.urlencoded());
app.use("/",require('./routes/index'));

app.listen(port,(err)=>{
    if(err){console.log("Error in server port",port);}
    console.log("Server is running on port",port)
})