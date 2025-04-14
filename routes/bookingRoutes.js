const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');

// Skapa en ny bokning (endast för inloggade användare)
router.post('/bookings', authenticate, createBooking);

// Hämta bokningar (egna för User, alla för Admin)
router.get('/bookings', authenticate, getBookings);

//  Uppdatera en bokning (endast skaparen eller Admin)
router.put('/bookings/:id', authenticate, updateBooking);

//  Ta bort en bokning (endast skaparen eller Admin)
router.delete('/bookings/:id', authenticate, deleteBooking);

module.exports = router;
