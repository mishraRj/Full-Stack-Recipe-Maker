require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3002;
const dbUrl = process.env.MONGO_URL;
const bodyParser = require("body-parser");
const cors = require("cors");
const recipeRouter = require("./routes/recipe.router");

const app = express();

if (!dbUrl) {
  console.error(
    "❌ MONGO_URL not set. Add it to Render environment variables."
  );
}

const CLIENT_URL = process.env.CLIENT_URL || "*";
app.use(cors({ origin: CLIENT_URL }));

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
