const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Environment variables-ai read panna ithu mukkiyam

const app = express();

// Render-la neenga kudutha Key 'MONGODB_URI' moolama link-ai edukkum
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
    // Database connect aanathukku apram thaan server start aaganum
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running...");
    });
  })
  .catch((err) => {
    console.error("Database Connection Error:", err);
  });

// Unga matha routes (Recipes get, post) ellam ithukku kila varum...