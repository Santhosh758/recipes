// 1. Core Modules Import
const express = require('express');
const mongoose = require('mongoose');

// 2. Load Environment Variables (Ithu thaan Render-la iruntha link-ai edukkum)
// Ithai top-la ezhuthuna thaan Link work aagum
require('dotenv').config(); 

const app = express();

// 3. Middlewares
app.use(express.json()); // JSON data-va handle panna

// 4. Database Connection Link
// Render dashboard-la neenga kudutha 'MONGODB_URI' key-ai inga use panrom
const mongoURI = process.env.MONGODB_URI;

// 5. Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");

    // 6. Routes (Database connect aanathuku apram thaan routes work aaganum)
    
    // Home Page Route
    app.get('/', (req, res) => {
      res.send('<h1>Recipe App Server is Running Successfully!</h1>');
    });

    // Recipes List Route
    app.get('/recipes', (req, res) => {
      res.json({ 
        message: "Recipes list will appear here",
        status: "success"
      });
    });

    // 7. Start Server
    // Render default-a port 10000 use pannum
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    // Intha error vantha Render-la Key-Value correct-a kudukkalai nu artham
    console.error("❌ Database Connection Error: ", err.message);
  });