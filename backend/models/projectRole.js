const mongoose = require('mongoose');
const { ROLE_TYPES } = require('../constants/roleConstants');

const ProjectRoleSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: { type: String, enum: ROLE_TYPES, default: ROLE_TYPES[1] }
});

module.exports = mongoose.model('ProjectRole', ProjectRoleSchema);
