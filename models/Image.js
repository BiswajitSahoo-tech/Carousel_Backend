const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'An image must have a title'],
        maxLength: 20,
        minLength: 3,
        trim:true
    },
    description: {
        type: String,
        required: [true, 'An image must have a description'],
        maxLength: 50,
        minLength: 3,
        trim:true
    },
    imageUrl: {
        type: String,
        required: [true, 'An user must have a user name'],
        
    },
    sequence:{
        type: Number,
        required:[true, "An Image must have a sequence"]
    },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Image', imageSchema);

