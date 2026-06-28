const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Workout = require('../models/Workout');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

describe('Workout API', () => {
  let token;
  let userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/titan-fitness-test');
    
    // Create test user
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      age: 25,
      height: 180,
      currentWeight: 75
    });
    await user.save();
    userId = user._id;
    token = jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
  });

  afterAll(async () => {
    await Workout.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /api/workouts', () => {
    it('should create a new workout', async () => {
      const workoutData = {
        exercise: 'Bench Press',
        muscleGroup: 'Chest',
        sets: 4,
        reps: 8,
        weight: 100,
        duration: 45
      };

      const response = await request(app)
        .post('/api/workouts')
        .set('Authorization', `Bearer ${token}`)
        .send(workoutData);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.exercise).toBe('Bench Press');
      expect(response.body.sets).toBe(4);
    });

    it('should not create workout without auth', async () => {
      const workoutData = {
        exercise: 'Squat',
        sets: 3,
        reps: 10,
        weight: 150
      };

      const response = await request(app)
        .post('/api/workouts')
        .send(workoutData);

      expect(response.statusCode).toBe(401);
    });
  });

  describe('GET /api/workouts', () => {
    it('should get user workouts', async () => {
      const response = await request(app)
        .get('/api/workouts')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should not get workouts without auth', async () => {
      const response = await request(app)
        .get('/api/workouts');

      expect(response.statusCode).toBe(401);
    });
  });

  describe('DELETE /api/workouts/:id', () => {
    it('should delete a workout', async () => {
      // First create a workout
      const workout = new Workout({
        userId,
        exercise: 'Deadlift',
        muscleGroup: 'Back',
        sets: 3,
        reps: 5,
        weight: 200
      });
      await workout.save();

      const response = await request(app)
        .delete(`/api/workouts/${workout._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Workout deleted');
    });
  });
});
