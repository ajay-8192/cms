const mongoose = require("mongoose");

const ProjectRoleSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  role: {
    type: String,
    enum: { path: "allowedRoles", model: "Project" },
    required: true,
  },
});

module.exports = mongoose.model("ProjectRole", ProjectRoleSchema);
