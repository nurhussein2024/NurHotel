const mongoose = require('mongoose');

// Bokningsschema
const bookingSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true }, // Rum-referens
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Användar-referens
  startTime: { type: Date, required: true }, // Starttid
  endTime: { type: Date, required: true },   // Sluttid
}, { timestamps: true }); // Tidsstämplar

module.exports = mongoose.model('Booking', bookingSchema);
