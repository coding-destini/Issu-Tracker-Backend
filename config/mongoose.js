const mongoose = require('mongoose');
// const URL = process.env.URL;

mongoose.connect(process.env.URL).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error in connecting to MongoDB",err);
})