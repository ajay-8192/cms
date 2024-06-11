const Content = require('../models/content');

exports.getAllContent = async (req, res) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ error: 'Content not found' });
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createContent = async (req, res) => {
  try {
    const newContent = new Content(req.body);
    const content = await newContent.save();
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!content) return res.status(404).json({ error: 'Content not found' });
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) return res.status(404).json({ error: 'Content not found' });
    res.json({ message: 'Content deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
