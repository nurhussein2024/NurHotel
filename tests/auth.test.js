const request = require('supertest');
const app = require('../app'); 
const mongoose = require('mongoose');

describe('Auth API', () => {
 
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        username: 'testuser123',
        password: 'testpass123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message');
  });
});
