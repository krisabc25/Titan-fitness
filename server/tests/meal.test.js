const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Meal = require('../models/Meal');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

describe('Meal API', () => {
  let token;
  let userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/titan-fitness-test');
    
    const user = new User({
      name: 'Test User',
      email: 'mealtest@example.com',
      password: 'password123'
    });
    await user.save();
    userId = user._id;
    token = jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
  });

  afterAll(async () => {
    await Meal.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /api/meals', () => {
    it('should create a new meal', async () => {
      const mealData = {
        mealType: 'breakfast',
        name: 'Oatmeal with Berries',
        calories: 350,
        protein: 10,
        carbs: 55,
        fats: 8,
        fiber: 5
      };

      const response = await request(app)
        .post('/api/meals')
        .set('Authorization', `Bearer ${token}`)
        .send(mealData);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe('Oatmeal with Berries');
      expect(response.body.calories).toBe(350);
    });

    it('should require meal name and calories', async () => {
      const mealData = {
        mealType: 'lunch',
        name: 'Chicken Salad'
        // missing calories
      };

      const response = await request(app)
        .post('/api/meals')
        .set('Authorization', `Bearer ${token}`)
        .send(mealData);

      expect(response.statusCode).toBe(400);
    });
  });

  describe('GET /api/meals/by-date', () => {
    it('should get meals for specific date with totals', async () => {
      const today = new Date().toISOString().split('T')[0];
      
      const response = await request(app)
        .get(`/api/meals/by-date?date=${today}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('meals');
      expect(response.body).toHaveProperty('totals');
      expect(response.body.totals).toHaveProperty('totalCalories');
    });
  });
});
