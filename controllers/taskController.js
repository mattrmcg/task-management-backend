const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTasks = async (req, res) => {
    try {
        // Retrieve tasks from database
        const tasks = await prisma.task.findMany();

        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Interal Server Error '});
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        
        // Create new task in database
        const newTask = await prisma.task.create({ 
            data: {
                title,
                description,
            },
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description, completed } = req.body;

        // Update task in database
        const updatedTask = await prisma.task.update({
            where: { id: parseInt(taskId) },
            data: {
                title,
                description,
                completed,
            },
        });

        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        // Delete task from database
        await prisma.task.delete({
            where: { id: parseInt(taskId) },
        });

        res.json({ message: 'Task deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };