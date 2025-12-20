const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: [String],
    instructions: String,
    cookingTime: Number,
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] }
});

module.exports = mongoose.model('Recipe', recipeSchema);