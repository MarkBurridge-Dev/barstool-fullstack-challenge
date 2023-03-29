import mongoose from 'mongoose';
const { Schema } = mongoose;

export const GameFeed = mongoose.model('GameFeed', new Schema({
    League: {
        type: String, 
        required: true
    },
    GameData: {
        type: Object,
        required: true
    }, 
    TimeRetrieved: {
        type: Number,
        required: true 
    }
}));

