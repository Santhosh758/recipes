const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Ithu thaan Render-la neenga kudutha 'MONGODB_URI'-ai edukkum

const app = express();

// Database link-ai variable-ah edukkum
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
    
    // Database connect aanathuku apram thaan server start aaganum
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Connection Error: ", err);
  });

// --- Inga unga Recipes App oda matha routes (GET, POST) ezhuthunga ---