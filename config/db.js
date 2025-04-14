const mongoose = require('mongoose');

// Anslut till MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Ansluten till MongoDB');
  } catch (error) {
    console.error('Fel vid anslutning till MongoDB:', error);
    process.exit(1); // Avsluta om det inte fungerar
  }
};

module.exports = connectDB;
