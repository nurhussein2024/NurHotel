// roomRoutes.js
const express = require('express');
const router = express.Router();

const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');
const {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');

// Skapa ett nytt rum (endast för Admin)
router.post('/', authenticate, authorizeAdmin, createRoom);

// Hämta alla rum (tillgänglig för inloggade användare)
router.get('/', authenticate, getRooms);

// Uppdatera ett rum (endast för Admin)
router.put('/:id', authenticate, authorizeAdmin, updateRoom);

// Ta bort ett rum (endast för Admin)
router.delete('/:id', authenticate, authorizeAdmin, deleteRoom);

module.exports = router;
