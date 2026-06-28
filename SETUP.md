# Titan Fitness Setup Guide

This guide will help you set up and run the Titan Fitness application.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn
- React Native CLI (for mobile development)
- Android Studio or Xcode (for emulators)

## Backend Setup

### 1. Navigate to server directory
```bash
cd server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file
Create a `.env` file in the `server` directory:
```
MONGODB_URI=mongodb://localhost:27017/titan-fitness
PORT=5000
JWT_SECRET=your-super-secret-key-change-this
NODE_ENV=development
```

### 4. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**MongoDB Atlas (Cloud):**
Update `MONGODB_URI` in `.env` with your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/titan-fitness
```

### 5. Start the server
```bash
npm run dev
```

The server should be running on `http://localhost:5000`

## Frontend Setup

### 1. Navigate to client directory
```bash
cd client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install React Native CLI
```bash
npm install -g react-native-cli
```

### 4. Start the development server

**For iOS:**
```bash
npx react-native run-ios
```

**For Android:**
```bash
npx react-native run-android
```

## Verifying Setup

### Test Backend
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status": "Server is running"}
```

### Test API Connection
Open the app and try to register/login. If successful, your backend is connected.

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` file
- Verify MongoDB is accessible on the specified port

### Backend Connection Error
- Ensure backend server is running on port 5000
- Check that `API_BASE_URL` in `client/src/services/api.js` matches your backend URL
- Check network connectivity

### React Native Issues
- Clear cache: `npm start -- --reset-cache`
- Delete node_modules: `rm -rf node_modules && npm install`
- Clear Android build: `cd android && ./gradlew clean && cd ..`

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

## Development Commands

### Backend
```bash
cd server
npm run dev      # Start with nodemon
npm start        # Start production
npm test         # Run tests
```

### Frontend
```bash
cd client
npm start        # Start dev server
npm test         # Run tests
npm run build    # Build for production
```

## API Testing

### Using cURL

**Register User:**
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "age": 25,
    "height": 180,
    "currentWeight": 75
  }'
```

**Login User:**
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Create Workout (with token):**
```bash
curl -X POST http://localhost:5000/api/workouts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "exercise": "Bench Press",
    "muscleGroup": "Chest",
    "sets": 4,
    "reps": 8,
    "weight": 100
  }'
```

### Using Postman

1. Import the API collection (see endpoints in README.md)
2. Set up environment variables:
   - `base_url`: http://localhost:5000
   - `token`: (will be set after login)
3. Test each endpoint

## Database Initialization

### Create Seed Data (Optional)

Create `server/seed.js`:
```javascript
const mongoose = require('mongoose');
const User = require('./models/User');
const Exercise = require('./models/Exercise');

mongoose.connect(process.env.MONGODB_URI);

const exercises = [
  { name: 'Bench Press', muscleGroup: 'Chest', difficulty: 'intermediate' },
  { name: 'Squats', muscleGroup: 'Legs', difficulty: 'intermediate' },
  { name: 'Deadlift', muscleGroup: 'Back', difficulty: 'advanced' }
];

Exercise.insertMany(exercises).then(() => {
  console.log('Exercises seeded');
  process.exit(0);
});
```

Run with:
```bash
node seed.js
```

## Production Deployment

### Backend (Heroku)

1. Create Heroku app
2. Set environment variables
3. Deploy:
   ```bash
   git push heroku main
   ```

### Frontend (Firebase Hosting)

1. Build the app
2. Deploy to Firebase:
   ```bash
   npm run build
   firebase deploy
   ```

## Next Steps

1. Read [README.md](./README.md) for feature overview
2. Explore the codebase
3. Start logging workouts and meals
4. Check progress dashboard

## Support

For issues or questions, please open an issue on GitHub.
