const express = require('express')
const router = express.Router();
const projectController = require('../controllers/projectController');
const passport = require('passport')

router.post('/create',passport.authenticate('jwt',{session:false}),projectController.createProject); // because we already using json web token so we don't need to store
// anything in session , that's why session is false 
router.delete('/delete/:projectId',passport.authenticate('jwt',{session:false}),projectController.deleteproject);
router.put('/update/:projectId',passport.authenticate('jwt',{session:false}),projectController.updateproject)
router.get('/Allprojects',passport.authenticate('jwt',{session:false}),projectController.getProjects);
router.get('/projectdetails/:projectId',passport.authenticate('jwt',{session:false}),projectController.getProjectDetails)
router.post('/issue/:projectId',passport.authenticate('jwt',{session:false}),projectController.createIssue)
router.get('/getIssues/:projectId',passport.authenticate('jwt',{session:false}),projectController.getIssues)
module.exports=router;