const mongoose = require('mongoose');
const { ROLE_TYPES } = require('../constants/roleConstants');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  allowedRoles: [{ type: String, enum: Object.keys(ROLE_TYPES) }],
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

ProjectSchema.pre('save', function (next) {
  this.modifiedAt = new Date();
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);
