const express = require('express');
const mongoose = require('mongoose');
const routes = require('./utils/routes.js');
const cors = require('cors');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
routes(app);

app.listen(PORT, () => {
    connectToMongo();
    console.log(`Server listen in port ${PORT}`);
});
app.get("/", (req, res) => {
    res.send(`Welcome to MyPetsSpace in ${PORT}`);
})
const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB!!')
    } catch (error) {
        console.error('Error connecting to MongoDB', error)
        process.exit(1)
    }
}
