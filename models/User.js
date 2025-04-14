const mongoose = require('mongoose');

// Användarschema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Användarnamn (unika)
  password: { type: String, required: true },               // Hashat lösenord
  role: { type: String, enum: ['User', 'Admin'], default: 'User' }, // Roll
}, { timestamps: true }); // Tidsstämplar: skapad/uppdaterad

module.exports = mongoose.model('User', userSchema);
