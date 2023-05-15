const express = require('express')
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post('/create',projectController.createProject);
router.delete('/delete/:projectId',projectController.deleteproject);
router.put('/update/:projectId',projectController.updateproject)

module.exports=router;