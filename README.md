# Titan Fitness - Your Personal Fitness Tracker

A full-stack fitness tracking application built with React Native, Node.js, Express, and MongoDB.

## Features

### User Authentication
- Secure user registration and login
- JWT-based authentication
- User profile management

### Workout Tracking
- Log exercises with sets, reps, and weight
- Track muscle groups and exercise duration
- Add notes to workouts
- View workout history
- Track personal records (PRs)

### Nutrition Tracking
- Log meals by type (breakfast, lunch, dinner, snack)
- Track macros (protein, carbs, fats, fiber)
- Daily calorie tracking
- Meal history

### Progress Tracking
- Body weight monitoring
- Weight trend analysis
- Total volume calculations
- Workout statistics
- Progress charts and visualizations

### Gamification
- Achievements and milestones
- Badges and points
- Streak tracking (planned)

## Tech Stack

### Frontend
- React Native
- React Navigation
- AsyncStorage for local data

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt for password hashing

### Database Models
- User - User account and profile data
- Workout - Exercise sessions
- Meal - Nutrition tracking
- BodyWeight - Weight progress
- Exercise - Exercise database
- PersonalRecord - PR tracking
- Achievement - Gamification

## Installation

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/titan-fitness
PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

Start the server:
```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (Auth required)
- `PUT /api/users/profile` - Update user profile (Auth required)

### Workouts
- `POST /api/workouts` - Create workout (Auth required)
- `GET /api/workouts` - Get user workouts (Auth required)
- `GET /api/workouts/by-date` - Get workouts by date range (Auth required)
- `PUT /api/workouts/:id` - Update workout (Auth required)
- `DELETE /api/workouts/:id` - Delete workout (Auth required)

### Meals
- `POST /api/meals` - Create meal (Auth required)
- `GET /api/meals` - Get user meals (Auth required)
- `GET /api/meals/by-date` - Get meals by date (Auth required)
- `DELETE /api/meals/:id` - Delete meal (Auth required)

### Body Weight
- `POST /api/bodyweight` - Create weight entry (Auth required)
- `GET /api/bodyweight` - Get weight history (Auth required)
- `GET /api/bodyweight/by-date-range` - Get weight by date range (Auth required)
- `DELETE /api/bodyweight/:id` - Delete weight entry (Auth required)

## Usage

### Creating an Account
1. Launch the app and tap "Register"
2. Fill in your details (name, email, password, age, height, current weight)
3. Complete registration and login

### Logging a Workout
1. From Home screen, tap "Log Workout"
2. Enter exercise details (exercise name, muscle group, sets, reps, weight)
3. Optionally add notes
4. Tap "Save Workout"

### Logging a Meal
1. From Home screen, tap "Log Meal"
2. Select meal type and enter meal details
3. Input macros (protein, carbs, fats, fiber)
4. Tap "Log Meal"

### Viewing Progress
1. Navigate to the "Progress" tab
2. View summary stats, recent workouts, and weight history
3. Track your fitness journey

## Project Structure

```
titan-fitness/
├── client/
│   ├── src/
│   │   ├── screens/
│   │   │   ├── LoginScreen.js
│   │   │   ├── RegisterScreen.js
│   │   │   ├── HomeScreen.js
│   │   │   ├── LogWorkoutScreen.js
│   │   │   ├── LogMealScreen.js
│   │   │   ├── ProgressScreen.js
│   │   │   └── ProfileScreen.js
│   │   ├── components/
│   │   │   ├── WorkoutCard.js
│   │   │   └── MealCard.js
│   │   ├── navigation/
│   │   │   └── RootNavigator.js
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.js
│   └── package.json
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Workout.js
│   │   ├── Meal.js
│   │   ├── BodyWeight.js
│   │   ├── Exercise.js
│   │   ├── PersonalRecord.js
│   │   └── Achievement.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── workoutController.js
│   │   ├── mealController.js
│   │   └── bodyWeightController.js
│   ├── routes/
│   │   ├── users.js
│   │   ├── workouts.js
│   │   ├── meals.js
│   │   └── bodyweight.js
│   ├── middleware/
│   │   └── auth.js
│   ├── app.js
│   ├── package.json
│   └── .env.example
└── database/
```

## Future Features

- [ ] Workout plans and routines
- [ ] Social features (follow friends, share achievements)
- [ ] Advanced analytics and charts
- [ ] Recipe database integration
- [ ] Calorie calculator
- [ ] Push notifications
- [ ] Image support (progress photos)
- [ ] Coaching messages
- [ ] Subscription plans
- [ ] Payment integration
- [ ] Mobile app on App Store/Play Store

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License

## Author

krisabc25
