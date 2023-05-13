const mongoose = require('mongoose');

const projectDetailSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  bugs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Issue'
    }
  ]
});

const ProjectDetail = mongoose.model('ProjectDetail', projectDetailSchema);

module.exports = ProjectDetail;