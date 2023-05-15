const Project = require('../models/Project');
const User = require('../models/user')

//creating Project
module.exports.createProject = async(req,res)=>{
    try {
        //1: get the data
        const {name,description,author,projectType} = req.body;
        //2:create project
        const project = await Project.create({
            name:name,
            description:description,
            author:author,
            projectType:projectType
        })
        //3:check project
        if(!project){
            return res.status(400).json({
                error:"project not created",
            })
        }
        //push project in user ProjctType field so that in future if i want that how many 
        //or which project is created by this particular user , so i can get that by pushing project id in this field 
        const user = await User.findById(author);
        user.projects.push(project._id);
        console.log(user);
        //5:return success
        return res.status(201).json({
            message:"project created",
            project:project
        })
    } catch (error) {
        return res.status(500).json({
            message:"Error in creating Project",
            error: error
        })
    }
}


//deleting Project
module.exports.deleteproject=async(req,res)=>{
    try {
        const {projectId} = req.params; //name should be same as define in project field
        const deleteProject = await Project.findByIdAndDelete(projectId);
        console.log(deleteProject)
        //check if deleteProject have somrthing or not
        if(!deleteProject){
        return res.status(400).json({
            error:"project not found"
        })
        } 
        //return project deleted successfuly
        return res.status(200).json({
            message:"project deleted",
            data:{deleteProject}
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Error in deleting Project",
            error: error
        })
    }
}

//update Project
module.exports.updateproject=async(req,res)=>{
    try {
       const {projectId}= req.params;
       const {name,description,projectType} = req.body;
       const updateProject = await Project.findByIdAndUpdate(projectId,{
   name,
   description,
   projectType
       },{new:true})  // The new: true option indicate that you want the updated document to be returned in the response.
       if(!updateProject){
        return res.status(400).json({
            error:"project not found"
        })
       }
       return res.status(200).json({
        message:"project updated",
        data:{updateProject}
       })
    } catch (error) {
        return res.status(500).json({
            message:"Error in Updating Project",
            error: error
        })
    }
}