const functions = require("firebase-functions");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./utils/routes");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT_EXPRESS;
console.log(PORT);
app.use(express.json());
app.use(cors());
routes(app);

app.listen(() => {
  connectToMongo();
  console.log(`Server listen in port ${PORT}`);
});
app.get("/", (req, res) => {
  res.json({message: `Welcome to MyPetsSpace in ${PORT}`});
});
const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB!!");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.app = functions.https.onRequest(app);
