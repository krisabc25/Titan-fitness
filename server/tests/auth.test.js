const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

describe('User Authentication', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/titan-fitness-test');
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        age: 25,
        height: 180,
        currentWeight: 75
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(userData);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe(userData.email);
    });

    it('should not register user with duplicate email', async () => {
      const userData = {
        name: 'Jane Doe',
        email: 'john@example.com',
        password: 'password123',
        age: 25,
        height: 180,
        currentWeight: 75
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(userData);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/users/login', () => {
    it('should login user with correct credentials', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'john@example.com',
          password: 'password123'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe('john@example.com');
    });

    it('should not login with incorrect password', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'john@example.com',
          password: 'wrongpassword'
        });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should not login non-existent user', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
