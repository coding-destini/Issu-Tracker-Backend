const mongoose = require('mongoose');
const URL = "mongodb+srv://akashshahngu:1234@issue-tracker-backend.raxhqmj.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(URL).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error in connecting to MongoDB",err);
})