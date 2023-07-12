const Project = require("../models/Project");
const Issue = require("../models/Issue");

//creating Project
module.exports.createProject = async (req, res) => {
  try {
    //1: get the data
    const { name, description, projectType ,author} = req.body;
    // const author = req.user._id; // getting this from route from passport jwt
    //2:create project
    const project = await Project.create({
      name: name,
      description: description,
      author: author,
      projectType: projectType,
    });
    //3:check project
    if (!project) {
      return res.status(400).json({
        error: "project not created",
      });
    }
    //push project in user ProjctType field so that in future if i want that how many
    //or which project is created by this particular user , so i can get that by pushing project id in this field
    // const user = await User.findById(author);
    // user.projects.push(project);
    //save user
    // await user.save();
    // return success
    // return res.status(201).json({
    //   message: "project created",
    //   project: project,
    // });
    return res.redirect('back');
   
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Error in creating Project",
      error: error,
    });
  }
};

// creating issue
module.exports.createIssue = async (req, res) => {
    const {projectId} = req.params;
  const { title, description, labels ,author} = req.body;

  //   const author = req.user._id; // Assuming the author is determined based on the logged-in user

  //passing project id to create issue

  try {
    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const issue = await Issue.create({
      title,
      description,
      labels,
      author,
      project: projectId
    });

    // Push the issue to the project's issues array
    project.issues.push(issue);
    // Save the project to the database
    const createdIssue = await project.save();
    // return the newly created issue
    // return res.status(201).json({
    //   message: "Issue created",
    //   issue: createdIssue,
    // });
    return res.redirect(`back`);
  
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create the issue" });
  }
};

//get all issues of a particular  project
module.exports.getIssues = async (req, res) => {
  try {
    //1:get project by params
    const { projectId } = req.params;
    //2:check if project exist
    const project = await Project.findById(projectId).populate({
      path: "issues",
      select: "title description labels",
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    //3:get all issues
    const issues = project.issues;
    //4:return the issues
    return res.status(200).json({
      message: "Issues found",
      issues,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get the issue" });
  }
}

//get all issues
module.exports.getAllIssues = async(req,res)=>{
  try {
    const issues = await Issue.find({}).populate({
      path: "project",
      select: "name discription author projectType",
      
    }).populate({
      path: "author",
      select: "name email",
    })
    if(!issues){
      return res.status(404).json({error:"No issues found"})
    }

     // Extract all labels from the issues
     const labels = [...new Set(issues.flatMap(issue => issue.labels))];

    return res.render('All_Issues.ejs',{
      header : "All Issues",
      create:"Contribute on Github 😊",
      issues:issues,
      labels:labels
  })
  } catch (error) {
    console.log("error",error)
    return res.status(500,{
      error:"Failed to get the issue"
    })
  }
}

//deleting Project
module.exports.deleteproject = async (req, res) => {
  try {
    const { projectId } = req.params; //name should be same as define in project field
    const deleteProject = await Project.findByIdAndDelete(projectId);
    console.log(deleteProject);
    //check if deleteProject have somrthing or not
    if (!deleteProject) {
      return res.status(400).json({
        error: "project not found",
      });
    }
    //return project deleted successfuly
    // return res.status(200).json({
    //   message: "project deleted",
    //   data: { deleteProject },
    // });
    return res.redirect('/')
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Error in deleting Project",
      error: error,
    });
  }
};

//update Project
module.exports.updateproject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description, projectType } = req.body;
    const updateProject = await Project.findByIdAndUpdate(
      projectId,
      {
        name,
        description,
        projectType,
      },
      { new: true }
    ); // The new: true option indicate that you want the updated document to be returned in the response.
    if (!updateProject) {
      return res.status(400).json({
        error: "project not found",
      });
    }
    // return res.status(200).json({
    //   message: "project updated",
    //   data: { updateProject },
    // });

    return res.redirect('/')
  } catch (error) {
    return res.status(500).json({
      message: "Error in Updating Project",
      error: error,
    });
  }
};

//Show all projects
module.exports.getProjects = async (req, res) => {
  try {
    const allProjects = await Project.find();
    if (!allProjects) {
      return res.status(400).json({
        error: "No projects found",
      });
    }
    // return res.status(200).json({
    //   message: "all projects",
    //   data: { allProjects },
    // });
    return res.render('home',{
      header : "All Projects",
      create:"Create Projects",
      projects:allProjects,
  })

  } catch (error) {
    return res.status(500).json({
      message: "Error in showing all projects",
      error: error,
    });
  }
};

//project details
module.exports.getProjectDetails = async (req, res) => {
  try {
    const { projectId } = req.params;
    const projectDetails = await Project.findById(projectId).populate({
      path: "issues",
      select: "title labels author description",
    });
    
    if (!projectDetails) {
      return res.status(400).json({
        error: "Project not found",
      });
    }
    
      const labels = Array.from(
      new Set(
        projectDetails.issues.flatMap((issue) => issue.labels)
      )
    );


// The flatMap() method is used to iterate over each issue in the projectDetails.issues array and extract the labels property from each issue. It returns a new array that contains all the labels from all the issues.

// The Set object is used to create a new set, which only allows unique values. By passing the array of labels to the Set constructor, it removes any duplicate labels.

// Finally, Array.from() is called to convert the set of unique labels back into an array. This ensures that the labels variable contains an array of unique label values extracted from the project issues.
    
    return res.render('Project_details', {
      header: "Projects Details",
      create: "See all Issues",
      projectdetails: projectDetails,
      labels: labels,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch project details" });
  }
};


