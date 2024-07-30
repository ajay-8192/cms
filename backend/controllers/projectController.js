const { ROLE_TYPES } = require("../constants/roleConstants");
const Project = require("../models/project");
const ProjectRole = require("../models/projectRole");
const User = require("../models/user");

exports.createNewProject = async (req, res) => {
  try {
    const {
      project: { name, description },
    } = req.body;

    const project = {
      name,
      description,
      owner: req.user.id,
    };

    const newProject = await Project(project);

    await newProject.save();

    res.status(201).json({
      message: "Project created successfully",
      project: newProject.toObject(),
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fetchProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    // Projects has user has access or created by user
    const projectRoles = await ProjectRole.find({ userId: userId }).populate(
      "projectId",
    );

    const projectIds = projectRoles.map((role) => role.projectId._id);

    const projects = await Project.find({
      $or: [{ owner: userId }, { _id: { $in: projectIds } }],
    });

    res.status(200).json({
      projects,
      message: "Project fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.provideAccess = async (req, res) => {
  try {
    const { projectId, email, role } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(400).json({
        message: `User doesnot exist! Create user with email ${email}`,
      });
    }

    const projectRole = { projectId, userId: user.userId, role };

    const newProjectRole = new ProjectRole(projectRole);

    await newProjectRole.save();

    res.json({
      message: "Access Provided Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addAllowedAccess = async (req, res) => {
  try {
    const { projectId, roles = [] } = req.body;

    const project = await Project.findById(projectId);

    if (req.user.id !== project.owner) {
      res.status(401).json({
        message: "Access Denied! Only owner can add this settings",
      });
    }

    const allowedRoles = project.allowedRoles;

    const newRoles = roles.filter((role) => !allowedRoles.includes(role));

    const roleTypes = Object.keys(ROLE_TYPES);

    const acceptedNewRoles = newRoles.filter((role) =>
      roleTypes.includes(role),
    );

    project.allowedRoles = [...project.allowedRoles, ...acceptedNewRoles];

    project.save();

    res.json({
      message: `Updated Allowed Access for project ${project.name}`,
      project,
    });
  } catch (error) {
    res.json(500).json({ error: error.message });
  }
};

exports.editProjectSettings = async (req, res) => {
  try {
    const { settings } = req.body;
    console.log("=====> SETTINGS", JSON.stringify({ settings }, null, 2));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
