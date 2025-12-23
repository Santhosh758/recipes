// 1. Core Modules Import
const express = require('express');
const mongoose = require('mongoose');

// 2. Load Environment Variables (Ithu thaan TOP-la irukkanum)
require('dotenv').config(); 

const app = express();
app.use(express.json());

// 3. Render Variables edukirom
const mongoURI = process.env.MONGODB_URI;

// 4. CONNECTION LOG (Ithu unga database link varutha nu confirm pannum)
if (!mongoURI) {
    console.log("❌ ERROR: MONGODB_URI is undefined. Check Render Environment Variables!");
} else {
    console.log("📡 Attempting to connect to MongoDB Atlas...");
}

// 5. Database Connection
mongoose.connect(mongoURI)
  .then(() => {
    console.log("✅ ✅ ✅ SUCCESS: MongoDB Connected Successfully!");

    // Routes
    app.get('/', (req, res) => {
        res.send('<h1>Recipe App Server is Running & DB is Connected!</h1>');
    });

    app.get('/recipes', (req, res) => {
        res.json({ message: "Recipes list will be here", status: "success" });
    });

    // 6. Server Start
    const PORT = process.env.PORT || 10000;
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DATABASE ERROR: ", err.message);
  });