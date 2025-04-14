const Room = require('../models/Room');

// Skapa ett nytt rum
const createRoom = async (req, res) => {
  const { name, capacity, type } = req.body;

  // Skapa rum
  const room = new Room({
    name,
    capacity,
    type,
  });

  try {
    const savedRoom = await room.save();
    res.status(201).json({ message: 'Rum skapad!', room: savedRoom });
  } catch (error) {
    res.status(500).json({ message: 'Fel vid skapande av rum i Nurs Hotel.' });
  }
};

// Hämta alla rum
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Fel vid hämtning av rum.' });
  }
};

//  Uppdatera ett rum
const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { name, capacity, type } = req.body;

  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, { name, capacity, type }, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Rum inte funnet.' });
    }
    res.status(200).json({ message: 'Rum uppdaterat!', room: updatedRoom });
  } catch (error) {
    res.status(500).json({ message: 'Fel vid uppdatering av rum.' });
  }
};

// Ta bort ett rum
const deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Rum inte funnet.' });
    }
    res.status(200).json({ message: 'Rum borttaget!', room: deletedRoom });
  } catch (error) {
    res.status(500).json({ message: 'Fel vid borttagning av rum.' });
  }
};

module.exports = { createRoom, getRooms, updateRoom, deleteRoom };
