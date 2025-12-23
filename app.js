const mongoose = require('mongoose');
require('dotenv').config(); // Ithu romba mukkiyam!

// process.env moolama Render-la neenga kudutha 'MONGODB_URI' edukkum
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI)
  .then(() => console.log("Recipes Database Connected Successfully!"))
  .catch((err) => console.log("Connection Error: ", err));