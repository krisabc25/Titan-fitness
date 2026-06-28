const Workout = require('../models/Workout');
const mongoose = require('mongoose');

describe('Workout Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/titan-fitness-test');
  });

  afterAll(async () => {
    await Workout.deleteMany({});
    await mongoose.connection.close();
  });

  it('should create a workout with valid data', async () => {
    const workoutData = {
      userId: new mongoose.Types.ObjectId(),
      exercise: 'Bench Press',
      muscleGroup: 'Chest',
      sets: 4,
      reps: 8,
      weight: 100,
      duration: 45,
      notes: 'Great session'
    };

    const workout = await Workout.create(workoutData);

    expect(workout).toHaveProperty('_id');
    expect(workout.exercise).toBe('Bench Press');
    expect(workout.weight).toBe(100);
  });

  it('should have createdAt timestamp', async () => {
    const workoutData = {
      userId: new mongoose.Types.ObjectId(),
      exercise: 'Squat',
      sets: 3,
      reps: 10
    };

    const workout = await Workout.create(workoutData);

    expect(workout.createdAt).toBeDefined();
    expect(workout.date).toBeDefined();
  });
});
