const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    author:{
        // type: mongoose.Schema.Types.ObjectId,
        type:String,
        ref:'User' // refering to User model
    },
    projectType:{
        type:String,
        enum:['web','android','ios','desktop'], // enum means it should have only one options from these three
        required:true
    },
      issues: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Issue'
        }
      ]

},{timestamps:true})
const Project  = mongoose.model('Project',projectSchema);
module.exports=Project;