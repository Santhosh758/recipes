const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Render environment variables-ai read panna

const app = express();
app.use(express.json()); // JSON data-va handle panna ithu thevai

// Render-la neenga kudutha Key 'MONGODB_URI'
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");

    // 1. Home Route (Browser-la main link open panna ithu kaattum)
    app.get('/', (req, res) => {
      res.send('Recipe App Server is Running Successfully!');
    });

    // 2. Recipes List Route
    app.get('/recipes', (req, res) => {
      res.json({ 
        message: "Recipes list inga varum",
        status: "success"
      });
    });

    // 3. Server Start (Render-kku Port 10000 thevai)
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Connection Error: ", err);
  });