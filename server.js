const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv')
const imageRoutes = require('./routes/imageRoutes');

dotenv.config({
    path: './config.env'
})


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
const DB = process.env.DATABASE
    
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( con=> {
    console.log('DB connection successfull');
}).catch(err=>{
    console.log(err);
})

// Routes

app.use('/images', imageRoutes);


// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
