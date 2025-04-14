const mongoose = require('mongoose');

// Rumsschema
const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },                            // Namn på rummet
  capacity: { type: Number, required: true },                        // Hur många personer
  type: { type: String, enum: ['workspace', 'conference'], required: true }, // Typ av rum
}, { timestamps: true }); // Tidsstämplar

module.exports = mongoose.model('Room', roomSchema);
