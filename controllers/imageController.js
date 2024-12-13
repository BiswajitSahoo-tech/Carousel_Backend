const Image = require('../models/Image');
const path = require('path');

exports.getImages = async (req, res) => {
    try {
        const images = await Image.find().sort('sequence');
        res.json(images);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSeq = async () =>{
    try {
        // Find the largest sequence
        const largestImage = await Image.findOne().sort({ sequence: -1 }).exec();
    
        // Calculate the next sequence number
        const nextSequence = largestImage ? largestImage.sequence + 1 : 1;
    
        // Return the next sequence
        return nextSequence
      } catch (err) {
        console.error("Error fetching the next sequence:", err);
        throw err;
      }
}
exports.addImage = async (req, res) => {
    
    try {
        const nextSequence = await getSeq();
        const { title, description} = req.body;
        const newImage = new Image({
            title,
            description,
            imageUrl: `/uploads/${req.file.filename}`,
            sequence: nextSequence
        });
        await newImage.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateImage = async (req, res) => {
    try {
        const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedImage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateImageSequence = async (req, res) => {
    
    try {
        const  sequenceUpdates  = req.body; // Expecting an array of { id, sequence }
        
        let i = 1;
        for (const update of sequenceUpdates) {
            await Image.findByIdAndUpdate(update._id, { sequence: i });
            i++;
        }
        res.json({ success: true });
    } catch (err) {
        res.status(505).json({ error: err.message });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        await Image.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
