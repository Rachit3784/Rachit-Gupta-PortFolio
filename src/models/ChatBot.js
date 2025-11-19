// src/models/Message.js
import mongoose from 'mongoose';



// Define the contact schema that will hold the person's info and messages
const BotSchema = new mongoose.Schema({
   content : {
    type : String,
    default : ""
   }
});

// Create the model only if it doesn't exist
const BotContent = mongoose.models.BotContent || mongoose.model('BotContent', BotSchema);

export default BotContent;