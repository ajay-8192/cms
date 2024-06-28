const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastModifiedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: Map, of: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

ContentSchema.pre('save', function(next) {
  this.modifiedAt = new Date();
  next();
});

module.exports = mongoose.model('Content', ContentSchema);
