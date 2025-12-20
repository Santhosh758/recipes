const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const recipeRoutes = require('./routes/recipeRoutes');

dotenv.config();
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes Middleware
app.use('/api/recipes', recipeRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/recipesDB')
    .then(() => console.log('Connected to MongoDB... ✅'))
    .catch(err => console.error('Could not connect to MongoDB... ❌', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));