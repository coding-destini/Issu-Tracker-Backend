const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    labels: [
        {
          type: String
        }
      ],
      // author:{
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref:'User', // refering to User model
      //   required:true
      // },
      author:{
        // type: mongoose.Schema.Types.ObjectId,
        type:String,
        ref:'User' // refering to User model
    },
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
      }

},{timestamps:true});

const Issue = mongoose.model('Issue',issueSchema);
module.exports = Issue;