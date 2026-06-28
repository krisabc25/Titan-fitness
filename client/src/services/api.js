const API_BASE_URL = "http://localhost:5000/api";

class ApiService {
  constructor() {
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  getHeaders() {
    return {
      "Content-Type": "application/json",
      ...(this.token && { Authorization: `Bearer ${this.token}` })
    };
  }

  // Auth Endpoints
  async registerUser(userData) {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(userData)
    });
    return response.json();
  }

  async loginUser(email, password) {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password })
    });
    return response.json();
  }

  async getUserProfile() {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  async updateUserProfile(userData) {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(userData)
    });
    return response.json();
  }

  // Workout Endpoints
  async createWorkout(workoutData) {
    const response = await fetch(`${API_BASE_URL}/workouts`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(workoutData)
    });
    return response.json();
  }

  async getWorkouts() {
    const response = await fetch(`${API_BASE_URL}/workouts`, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  async getWorkoutsByDate(startDate, endDate) {
    const response = await fetch(
      `${API_BASE_URL}/workouts/by-date?startDate=${startDate}&endDate=${endDate}`,
      { headers: this.getHeaders() }
    );
    return response.json();
  }

  async updateWorkout(id, workoutData) {
    const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(workoutData)
    });
    return response.json();
  }

  async deleteWorkout(id) {
    const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
      method: "DELETE",
      headers: this.getHeaders()
    });
    return response.json();
  }

  // Meal Endpoints
  async createMeal(mealData) {
    const response = await fetch(`${API_BASE_URL}/meals`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(mealData)
    });
    return response.json();
  }

  async getMeals() {
    const response = await fetch(`${API_BASE_URL}/meals`, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  async getMealsByDate(date) {
    const response = await fetch(`${API_BASE_URL}/meals/by-date?date=${date}`, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  async deleteMeal(id) {
    const response = await fetch(`${API_BASE_URL}/meals/${id}`, {
      method: "DELETE",
      headers: this.getHeaders()
    });
    return response.json();
  }

  // Body Weight Endpoints
  async createBodyWeightEntry(data) {
    const response = await fetch(`${API_BASE_URL}/bodyweight`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async getBodyWeightHistory() {
    const response = await fetch(`${API_BASE_URL}/bodyweight`, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  async getBodyWeightByDateRange(startDate, endDate) {
    const response = await fetch(
      `${API_BASE_URL}/bodyweight/by-date-range?startDate=${startDate}&endDate=${endDate}`,
      { headers: this.getHeaders() }
    );
    return response.json();
  }

  async deleteBodyWeightEntry(id) {
    const response = await fetch(`${API_BASE_URL}/bodyweight/${id}`, {
      method: "DELETE",
      headers: this.getHeaders()
    });
    return response.json();
  }
}

export default new ApiService();