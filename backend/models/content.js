const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

ContentSchema.pre('save', function(next) {
  this.modifiedAt = new Date();
  next();
});

module.exports = mongoose.model('Content', ContentSchema);
