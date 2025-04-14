const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//  Registrera en ny användare
const registerUser = async (req, res) => {
  const { username, password, role } = req.body; // Lägg till roll

  // Kontrollera om användarnamn finns redan
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Användarnamn finns redan.' });
  }

  // Hasha lösenordet
  const hashedPassword = await bcrypt.hash(password, 10);

  // Skapa användaren
  const user = new User({
    username,
    password: hashedPassword,
    role: role || 'User', // Default är 'User' om roll inte skickas
  });

  try {
    const savedUser = await user.save();
    res.status(201).json({ message: 'Användare skapad!', userId: savedUser._id });
  } catch (error) {
    res.status(500).json({ message: 'Fel vid registrering av användare.' });
  }
};

// Logga in en användare
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Hitta användaren
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Fel användarnamn eller lösenord.' });
  }

  // Kontrollera lösenordet
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Fel användarnamn eller lösenord.' });
  }

  // Skapa JWT-token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.status(200).json({ message: 'Inloggning lyckades!', token });
};

module.exports = { registerUser, loginUser };
