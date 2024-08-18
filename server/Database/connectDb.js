const mongoose = require('mongoose');

const url ="mongodb+srv://abhinav312003:abhi1234@cluster0.iikcw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDb = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDb;