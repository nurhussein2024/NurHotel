const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Ladda miljövariabler från .env

// Middleware för att verifiera JWT-token
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Åtkomst nekad. Ingen token tillhandahölls.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Lagrar användarinfo i request för vidare användning
    next();
  } catch (error) {
    res.status(400).json({ message: 'Ogiltig token.' });
  }
};

//  Middleware för att kontrollera adminåtkomst
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Åtkomst nekad. Endast administratörer tillåtna.' });
  }
  next();
};

module.exports = { authenticate, authorizeAdmin };
