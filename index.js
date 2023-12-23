const express = require('express');
const cors = require('cors'); // DONT KNOW
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Authentication Routes
app.use('/auth', authRoutes);
// Task Routes
app.use('/tasks', taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});