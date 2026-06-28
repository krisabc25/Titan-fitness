# Titan Fitness API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Response Format

All responses are in JSON format.

### Success Response
```json
{
  "status": "success",
  "data": {}
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

---

## Authentication Endpoints

### Register User

**POST** `/users/register`

**Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "age": "number",
  "gender": "string",
  "height": "number (cm)",
  "currentWeight": "number (kg)",
  "goalWeight": "number (kg)"
}
```

**Response:**
```json
{
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "age": "number",
    "height": "number",
    "currentWeight": "number",
    "goalWeight": "number",
    "fitnessLevel": "string"
  },
  "token": "string"
}
```

**Status Code:** 201

---

### Login User

**POST** `/users/login`

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string"
  },
  "token": "string"
}
```

**Status Code:** 200

---

### Get User Profile

**GET** `/users/profile`

**Headers:**
```
Authorization: Bearer TOKEN
```

**Response:**
```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "age": "number",
  "gender": "string",
  "height": "number",
  "currentWeight": "number",
  "goalWeight": "number",
  "fitnessLevel": "string",
  "createdAt": "ISO 8601 date",
  "updatedAt": "ISO 8601 date"
}
```

**Status Code:** 200

---

### Update User Profile

**PUT** `/users/profile`

**Headers:**
```
Authorization: Bearer TOKEN
```

**Body:**
```json
{
  "name": "string",
  "age": "number",
  "gender": "string",
  "height": "number",
  "currentWeight": "number",
  "goalWeight": "number",
  "fitnessLevel": "string"
}
```

**Response:**
```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "updatedAt": "ISO 8601 date"
}
```

**Status Code:** 200

---

## Workout Endpoints

### Create Workout

**POST** `/workouts`

**Headers:**
```
Authorization: Bearer TOKEN
```

**Body:**
```json
{
  "exercise": "string",
  "muscleGroup": "string",
  "sets": "number",
  "reps": "number",
  "weight": "number (optional)",
  "duration": "number (minutes, optional)",
  "notes": "string (optional)"
}
```

**Response:**
```json
{
  "_id": "string",
  "userId": "string",
  "exercise": "string",
  "muscleGroup": "string",
  "sets": "number",
  "reps": "number",
  "weight": "number",
  "duration": "number",
  "notes": "string",
  "date": "ISO 8601 date",
  "createdAt": "ISO 8601 date"
}
```

**Status Code:** 201

---

### Get User Workouts

**GET** `/workouts`

**Headers:**
```
Authorization: Bearer TOKEN
```

**Response:**
```json
[
  {
    "_id": "string",
    "exercise": "string",
    "muscleGroup": "string",
    "sets": "number",
    "reps": "number",
    "weight": "number",
    "date": "ISO 8601 date"
  }
]
```

**Status Code:** 200

---

### Get Workouts by Date Range

**GET** `/workouts/by-date?startDate=2024-01-01&endDate=2024-01-31`

**Headers:**
```
Authorization: Bearer TOKEN
```

**Query Parameters:**
- `startDate` (string, ISO 8601): Start date
- `endDate` (string, ISO 8601): End date

**Response:**
```json
[
  {
    "_id": "string",
    "exercise": "string",
    "date": "ISO 8601 date"
  }
]
```

**Status Code:** 200

---

### Update Workout

**PUT** `/workouts/:id`

**Headers:**
```
Authorization: Bearer TOKEN
```

**Body:**
```json
{
  "exercise": "string",
  "sets": "number",
  "reps": "number",
  "weight": "number"
}
```

**Response:**
```json
{
  "_id": "string",
  "exercise": "string",
  "sets": "number",
  "reps": "number",
  "weight": "number"
}
```

**Status Code:** 200

---

### Delete Workout

**DELETE** `/workouts/:id`

**Headers:**
```
Authorization: Bearer TOKEN
```

**Response:**
```json
{
  "message": "Workout deleted"
}
```

**Status Code:** 200

---

## Meal Endpoints

### Create Meal

**POST** `/meals`

**Headers:**
```
Authorization: Bearer TOKEN
```

**Body:**
```json
{
  "mealType": "breakfast|lunch|dinner|snack",
  "name": "string",
  "calories": "number",
  "protein": "number (optional)",
  "carbs": "number (optional)",
  "fats": "number (optional)",
  "fiber": "number (optional)",
  "notes": "string (optional)"
}
```

**Response:**
```json
{
  "_id": "string",
  "userId": "string",
  "mealType": "string",
  "name": "string",
  "calories": "number",
  "protein": "number",
  "carbs": "number",
  "fats": "number",
  "fiber": "number",
  "date": "ISO 8601 date",
  "createdAt": "ISO 8601 date"
}
```

**Status Code:** 201

---

### Get User Meals

**GET** `/meals`

**Headers:**
```
Authorization: Bearer TOKEN
```

**Response:**
```json
[
  {
    "_id": "string",
    "mealType": "string",
    "name": "string",
    "calories": "number",
    "date": "ISO 8601 date"
  }
]
```

**Status Code:** 200

---

### Get Meals by Date

**GET** `/meals/by-date?date=2024-01-15`

**Headers:**
```
Authorization: Bearer TOKEN
```

**Query Parameters:**
- `date` (string, ISO 8601): Date to fetch meals for

**Response:**
```json
{
  "meals": [
    {
      "_id": "string",
      "mealType": "string",
      "name": "string",
      "calories": "number"
    }
  ],
  "totals": {
    "totalCalories": "number",
    "totalProtein": "number",
    "totalCarbs": "number",
    "totalFats": "number"
  }
}
```

**Status Code:** 200

---

### Delete Meal

**DELETE** `/meals/:id`

**Headers:**
```
Authorization: Bearer TOKEN
```

**Response:**
```json
{
  "message": "Meal deleted"
}
```

**Status Code:** 200

---

## Body Weight Endpoints

### Create Body Weight Entry

**POST** `/bodyweight`

**Headers:**
```
Authorization: Bearer TOKEN
```

**Body:**
```json
{
  "weight": "number (kg)",
  "bodyFatPercentage": "number (optional)",
  "muscleMass": "number (optional)",
  "notes": "string (optional)"
}
```

**Response:**
```json
{
  "_id": "string",
  "userId": "string",
  "weight": "number",
  "bodyFatPercentage": "number",
  "muscleMass": "number",
  "date": "ISO 8601 date",
  "createdAt": "ISO 8601 date"
}
```

**Status Code:** 201

---

### Get Body Weight History

**GET** `/bodyweight`

**Headers:**
```
Authorization: Bearer TOKEN
```

**Response:**
```json
[
  {
    "_id": "string",
    "weight": "number",
    "date": "ISO 8601 date"
  }
]
```

**Status Code:** 200

---

### Get Body Weight by Date Range

**GET** `/bodyweight/by-date-range?startDate=2024-01-01&endDate=2024-01-31`

**Headers:**
```
Authorization: Bearer TOKEN
```

**Query Parameters:**
- `startDate` (string, ISO 8601): Start date
- `endDate` (string, ISO 8601): End date

**Response:**
```json
[
  {
    "_id": "string",
    "weight": "number",
    "date": "ISO 8601 date"
  }
]
```

**Status Code:** 200

---

### Delete Body Weight Entry

**DELETE** `/bodyweight/:id`

**Headers:**
```
Authorization: Bearer TOKEN
```

**Response:**
```json
{
  "message": "Body weight entry deleted"
}
```

**Status Code:** 200

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid token |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 500 | Internal Server Error | Server error |

---

## Examples

### Register and Login Flow

```bash
# 1. Register
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123","age":25,"height":180,"currentWeight":75}'

# Response includes token
# Copy the token

# 2. Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'

# 3. Use token for protected requests
curl -X GET http://localhost:5000/api/workouts \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Full Workout Logging Flow

```bash
# Log a workout
curl -X POST http://localhost:5000/api/workouts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "exercise":"Bench Press",
    "muscleGroup":"Chest",
    "sets":4,
    "reps":8,
    "weight":100,
    "duration":45,
    "notes":"Strong today!"
  }'

# Get workouts
curl -X GET http://localhost:5000/api/workouts \
  -H "Authorization: Bearer TOKEN"
```
