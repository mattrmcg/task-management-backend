const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authmiddleware');
const {getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

router.use(authenticateUser);

router.get('/', getTasks); // HTTP GET route retrieves a list of tasks
router.post('/', createTask); // HTTP POST route creates a new task
router.put('/:taskId', updateTask); // HTTP PUT route updates a task
router.delete('/:taskId', deleteTask); // HTTP DELETE route deletes a task

module.exports = router;