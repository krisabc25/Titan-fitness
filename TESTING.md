# Testing Guide

## Backend Tests

### Setup

```bash
cd server
npm install --save-dev jest supertest
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test auth.test.js

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

### Test Files

**auth.test.js** - Authentication tests
- User registration
- User login
- Duplicate email prevention
- Invalid password handling

**workout.test.js** - Workout API tests
- Create workout
- Get workouts
- Delete workout
- Authentication requirement

**meal.test.js** - Meal API tests
- Create meal
- Get meals by date
- Macro tracking
- Validation

**middleware.test.js** - Auth middleware tests
- Token validation
- Authorization header parsing
- Error handling

**models.test.js** - Database model tests
- Model creation
- Validation
- Timestamps

### Example Test

```javascript
describe('POST /api/workouts', () => {
  it('should create a new workout', async () => {
    const response = await request(app)
      .post('/api/workouts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        exercise: 'Bench Press',
        sets: 4,
        reps: 8,
        weight: 100
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.exercise).toBe('Bench Press');
  });
});
```

---

## Frontend Tests

### Setup

```bash
cd client
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test
npm test LoginScreen.test.js

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

### Test Files

**LoginScreen.test.js** - Login screen tests
- Form rendering
- Input validation
- API calls
- Navigation

**WorkoutCard.test.js** - Workout card component tests
- Component rendering
- Display of workout data
- Action buttons
- Event handlers

**ApiService.test.js** - API service tests
- Token management
- Header construction
- Authorization
- Request/response handling

### Example Frontend Test

```javascript
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../src/screens/LoginScreen';

describe('LoginScreen', () => {
  it('should render login form', () => {
    const { getByPlaceholderText } = render(
      <LoginScreen navigation={{ navigate: jest.fn() }} />
    );

    expect(getByPlaceholderText('Email')).toBeDefined();
    expect(getByPlaceholderText('Password')).toBeDefined();
  });
});
```

---

## Test Coverage Goals

- **Backend:** 80%+ coverage
- **Frontend:** 70%+ coverage
- **Critical paths:** 100% coverage

## Running All Tests

```bash
# From root directory
cd server && npm test && cd ../client && npm test
```

## CI/CD Integration

Tests can be run in GitHub Actions:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test
```

## Debugging Tests

```bash
# Run with debug output
DEBUG=* npm test

# Run single test with detailed output
npm test -- --verbose WorkoutCard.test.js

# Check coverage gaps
npm test -- --coverage --verbose
```

## Best Practices

1. **Use meaningful test names** - Describe what the test does
2. **Test one thing per test** - Keep tests focused
3. **Use beforeEach/afterEach** - Clean up test state
4. **Mock external dependencies** - API calls, navigation, etc.
5. **Test user interactions** - Not implementation details
6. **Cover edge cases** - Empty inputs, errors, etc.
7. **Keep tests fast** - Avoid unnecessary delays
8. **Use descriptive assertions** - Clear error messages

## Troubleshooting

### MongoDB Connection Issues

```bash
# Ensure MongoDB is running
mongod

# Or use in-memory MongoDB for testing
npm install --save-dev mongodb-memory-server
```

### Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Jest Module Not Found

```bash
# Clear cache
npm test -- --clearCache
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Native Testing Library](https://testing-library.com/react-native)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://testingjavascript.com/)
