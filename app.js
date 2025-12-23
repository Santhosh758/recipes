const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// 1. Database Connection
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log("✅ ✅ ✅ SUCCESS: MongoDB Connected Successfully!");
  })
  .catch((err) => {
    console.error("❌ DATABASE ERROR: ", err.message);
  });

// 2. Recipe Schema & Model
const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [String],
    instructions: String,
    cookingTime: Number,
    createdAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// 3. Routes

// A. Home Route
app.get('/', (req, res) => {
    res.send('<h1>Recipe App Server is Running & DB is Connected!</h1><p>Go to /recipes to see data</p>');
});

// B. GET all recipes (Inga thaan munnadi empty [] vanthuchi)
app.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching recipes", error: err.message });
    }
});

// C. SEED Route (Database-la data-va insert panna intha link-ai oru vaati click pannanum)
app.get('/seed', async (req, res) => {
    const sampleRecipes = [
        {
            name: "Tomato Pasta",
            ingredients: ["Pasta", "Tomato", "Garlic", "Basil"],
            instructions: "Boil pasta, saute garlic and tomatoes, mix together.",
            cookingTime: 20
        },
        {
            name: "Masala Chai",
            ingredients: ["Milk", "Tea powder", "Ginger", "Cardamom"],
            instructions: "Boil milk with tea and spices, strain and serve.",
            cookingTime: 10
        }
    ];

    try {
        await Recipe.deleteMany({}); // Pazhaya data-va clear panna
        const createdRecipes = await Recipe.insertMany(sampleRecipes);
        res.json({ message: "Sample recipes added successfully!", data: createdRecipes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Server Start
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});