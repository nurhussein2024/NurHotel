const request = require('supertest');
const server = require('../server');  // Importera din serverfil (det kan vara server.js eller index.js)
const mongoose = require('mongoose');
const Room = require('../models/Room');  // Kontrollera att sökvägen är korrekt för din Room-modell

describe('Room API', () => {
  // Anslut till databasen innan alla tester körs
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/nurhotel', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  // Stäng anslutningen till databasen efter alla tester är klara
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test för att skapa ett rum
  it('should create a new room', async () => {
    const res = await request(server)  // Skickar en POST-begäran till servern
      .post('/api/rooms')
      .send({
        name: 'Test Room', // Namnet på rummet
        capacity: 10,      // Kapaciteten för rummet
        type: 'workspace'  // Typen av rummet, t.ex. arbetsplats
      });

    // Kontrollera att statuskoden är 201 (skapad)
    expect(res.statusCode).toBe(201);
    // Kontrollera att svaret innehåller rätt egenskaper
    expect(res.body).toHaveProperty('name', 'Test Room');
    expect(res.body).toHaveProperty('capacity', 10);
    expect(res.body).toHaveProperty('type', 'workspace');
  });

  // Test för att ta bort ett rum
  it('should delete a room', async () => {
    // Först skapa ett rum som ska tas bort
    const room = new Room({
      name: 'Room to Delete',
      capacity: 5,
      type: 'conference'
    });

    await room.save();  // Spara rummet i databasen

    const res = await request(server)  // Skickar en DELETE-begäran till servern
      .delete(`/api/rooms/${room._id}`);  // Använd room._id för att ta bort rätt rum

    // Kontrollera att statuskoden är 200 (OK)
    expect(res.statusCode).toBe(200);
    // Kontrollera att svaret innehåller ett meddelande om att rummet har tagits bort
    expect(res.body).toHaveProperty('message', 'Room deleted successfully');
  });
});