const express = require('express')
const router = express.Router();
const projectController = require('../controllers/projectController');
const passport = require('passport')

router.post('/create',passport.authenticate('jwt',{session:false}),projectController.createProject); // because we already using json web token so we don't need to store
// anything in session , that's why session is false 
router.delete('/delete/:projectId',projectController.deleteproject);
router.put('/update/:projectId',projectController.updateproject)
router.get('/Allprojects',projectController.getProjects);
router.get('/projectdetails/:projectId',projectController.getProjectDetails)
router.post('/issue/:projectId',projectController.createIssue)
router.get('/getIssues/:projectId',projectController.getIssues)
module.exports=router;