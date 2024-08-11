const express = require("express");
const router = express.Router();
const contentController = require("../controllers/contentController");
const { authenticate } = require("../middleware/auth");

// router.get('/', contentController.getAllContent);
// router.get('/:id', contentController.getContentById);
// router.post('/', authenticate, contentController.createContent);
// router.put('/:id', authenticate, contentController.updateContent);
// router.delete('/:id', authenticate, contentController.deleteContent);

// Get content on projectId

// Create content

// Update content with draft status

// delete content

module.exports = router;
