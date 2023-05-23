const express = require('express');
const port = 1000;
const app = express();
const db = require('./config/mongoose')
const jwt = require('./config/passport_jwt')
const expressLayouts = require('express-ejs-layouts');
const passportJWT = require('./config/passport_jwt')
app.use(expressLayouts);
//Extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.static('./assets'))

//make the upload path available to the browser
// app.use('/uploads',express.static(__dirname+'/uploads'));

// set up view engine 
app.set('view engine','ejs');
app.set('views','./views');

app.use(express.urlencoded());
app.use("/",require('./routes/index'));

app.listen(port,(err)=>{
    if(err){console.log("Error in server port",port);}
    console.log("Server is running on port",port)
})