require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3002;
const dbUrl = process.env.MONGO_URL;
const bodyParser = require("body-parser");
const cors = require("cors");
const recipeRouter = require("./routes/recipe.router");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/", recipeRouter);

//basic connection code of mongoose
async function main() {
  await mongoose.connect(dbUrl);
  console.log("✅ Connected to DB");
}

main().catch(err => {
  console.log("❌ MongoDB Connection Error:", err);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
