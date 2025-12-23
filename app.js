const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json()); // JSON data-va handle panna ithu mukkiyam

// 1. Database Connection
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log("✅ ✅ ✅ SUCCESS: MongoDB Connected Successfully!");
  })
  .catch((err) => {
    console.error("❌ DATABASE ERROR: ", err.message);
  });

// 2. Recipe Schema & Model (Database structure)
const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [String],
    instructions: String,
    cookingTime: Number,
    createdAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// 3. Routes
// Home Route
app.get('/', (req, res) => {
    res.send('<h1>Recipe App Server is Running & DB is Connected!</h1>');
});

// GET all recipes from Database
app.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching recipes", error: err.message });
    }
});

// POST a new recipe (Database-la add panna)
app.post('/recipes', async (req, res) => {
    const recipe = new Recipe({
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        cookingTime: req.body.cookingTime
    });

    try {
        const newRecipe = await recipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(400).json({ message: "Error saving recipe", error: err.message });
    }
});

// 4. Server Start
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});