const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth');
const Project = require('../models/project');
const ProjectController = require('../controllers/projectController');

router.get('/', authenticate, ProjectController.fetchProjects);

router.post('/create', authenticate, ProjectController.createNewProject);

router.post('/add-allowed-access', authenticate, ProjectController.addAllowedAccess);

router.post('/provide-access', authenticate, ProjectController.provideAccess);

router.post('/settings', authenticate, ProjectController.editProjectSettings);

module.exports = router;
