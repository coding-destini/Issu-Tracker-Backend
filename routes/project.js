const express = require('express')
const router = express.Router();
const projectController = require('../controllers/projectController');
const passport = require('passport')

router.post('/create',projectController.createProject); // because we already using json web token so we don't need to store
// anything in session , that's why session is false 
router.post('/delete/:projectId',projectController.deleteproject);
router.post('/update/:projectId',projectController.updateproject)
//All Projects as HomePage
router.get('/',projectController.getProjects);


router.get('/projectdetails/:projectId',projectController.getProjectDetails);
  

router.post('/create-issue/:projectId',projectController.createIssue)
//getting issue of a particular project
router.get('/getIssues/:projectId',projectController.getIssues)
//get all issues
router.get('/getallissues',projectController.getAllIssues)
module.exports=router;