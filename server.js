const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');

// Ladda miljövariabler från .env filen
dotenv.config();

// Anslut till MongoDB och Redis via konfigurationsfiler
const connectDB = require('./config/database');
const redisClient = require('./config/redis');

// Starta anslutning till MongoDB
connectDB();

// Skapa Express app och HTTP-server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware för att hantera CORS och JSON
app.use(cors());
app.use(express.json());

// Importera API-rutter
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');

// Använd API-routrar
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

// Skapa en WebSocket-anslutning via Socket.IO för notifieringar
io.on('connection', (socket) => {
  console.log('En användare anslöt');

  // Skicka notifiering när en bokning skapas
  socket.on('bookingCreated', (data) => {
    io.emit('bookingCreated', data);
  });

  // Skicka notifiering när en bokning uppdateras
  socket.on('bookingUpdated', (data) => {
    io.emit('bookingUpdated', data);
  });

  // Skicka notifiering när en bokning tas bort
  socket.on('bookingDeleted', (data) => {
    io.emit('bookingDeleted', data);
  });

  socket.on('disconnect', () => {
    console.log('Användare frånkopplad');
  });
});

// Starta servern
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servern kör på port ${PORT}`);
});
