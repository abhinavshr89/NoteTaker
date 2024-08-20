const express = require('express');
const dotenv = require('dotenv');
const notes = require("./data/notes");
const cors = require('cors'); // Import the cors middleware
const connectDb = require("./Database/connectDb")
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

dotenv.config();

// * Using middlewares 
app.use(cors()); // for handling cors policy error
app.use(express.json()); // ! Important -> You can not use json data in your expresss application without using this middleware 

// *Connect to MongoDB database
connectDb();



app.use('/api/users',userRoutes);
app.use('/api/notes',noteRoutes);

// * Error handling middleware
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
