const Recipe = require('../models/Recipe');

// 1. Create a New Recipe
exports.createRecipe = async (req, res) => {
    try {
        const recipe = new Recipe(req.body);
        const savedRecipe = await recipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(400).json({ message: "Error creating recipe", error: error.message });
    }
};

// 2. Get All Recipes
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes", error: error.message });
    }
};

// 3. Get Single Recipe by ID
exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: "Invalid ID or Server Error", error: error.message });
    }
};

// 4. Update Recipe by ID
exports.updateRecipe = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedRecipe) return res.status(404).json({ message: "Recipe not found to update" });
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(400).json({ message: "Error updating recipe", error: error.message });
    }
};

// 5. Delete Recipe by ID
exports.deleteRecipe = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) return res.status(404).json({ message: "Recipe not found to delete" });
        res.status(200).json({ message: "Recipe deleted successfully ✅" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting recipe", error: error.message });
    }
};