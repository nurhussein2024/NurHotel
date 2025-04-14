const Booking = require('../models/Booking');
const Room = require('../models/Room');

// Skapa en ny bokning
const createBooking = async (req, res) => {
  const { roomId, startTime, endTime } = req.body;
  const userId = req.user.userId;

  // Kontrollera om rummet är ledigt
  const existingBooking = await Booking.findOne({
    roomId,
    $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Överlappar bokning
    ],
  });

  if (existingBooking) {
    return res.status(400).json({ message: 'Rummet är redan bokat under denna tid.' });
  }

  // Skapa bokningen
  const booking = new Booking({
    roomId,
    userId,
    startTime,
    endTime,
  });

  try {
    const savedBooking = await booking.save();

    // Skicka realtidsnotifikation till alla användare
    req.io.emit('bookingCreated', { message: 'En ny bokning har skapats!', booking: savedBooking });

    res.status(201).json({ message: 'Bokning skapad!', booking: savedBooking });
  } catch (error) {
    res.status(500).json({ message: 'Fel vid skapande av bokning.' });
  }
};

// Hämta alla bokningar för användaren eller Admin
const getBookings = async (req, res) => {
  try {
    let bookings;
    if (req.user.role === 'Admin') {
      bookings = await Booking.find().populate('roomId').populate('userId');
    } else {
      bookings = await Booking.find({ userId: req.user.userId }).populate('roomId');
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Fel vid hämtning av bokningar.' });
  }
};

// Uppdatera en bokning
const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { startTime, endTime } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Bokning inte funnen.' });
    }

    // Kontrollera om bokningen kan uppdateras
    const existingBooking = await Booking.findOne({
      roomId: booking.roomId,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
      ],
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Rummet är redan bokat under denna tid.' });
    }

    booking.startTime = startTime;
    booking.endTime = endTime;

    const updatedBooking = await booking.save();

    // Skicka realtidsnotifikation till alla användare
    req.io.emit('bookingUpdated', { message: 'En bokning har uppdaterats!', booking: updatedBooking });

    res.status(200).json({ message: 'Bokning uppdaterad!', booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: 'Fel vid uppdatering av bokning.' });
  }
};

// Ta bort en bokning
const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ message: 'Bokning inte funnen.' });
    }

    // Skicka realtidsnotifikation till alla användare
    req.io.emit('bookingDeleted', { message: 'En bokning har tagits bort!', booking });

    res.status(200).json({ message: 'Bokning borttagen!' });
  } catch (error) {
    res.status(500).json({ message: 'Fel vid borttagning av bokning.' });
  }
};

module.exports = { createBooking, getBookings, updateBooking, deleteBooking };
