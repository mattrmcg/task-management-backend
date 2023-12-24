const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const register = async (req, res) => {

    try {
        const { username, password } = req.body;

        // Check if username already exists
        const existingUser = await prisma.user.findUnique({
            where : { username },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // hashing passwords before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Saving new user to database
        const newUser = await prisma.user.create({
            data: {
                username,
                password : hashedPassword,
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error '});
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }

        // Check if provided password matches stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { register, login };