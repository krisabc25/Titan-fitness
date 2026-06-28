import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalCalories: 0,
    currentWeight: 0,
    goalWeight: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const userRes = await axios.get('http://localhost:5000/api/users/profile', { headers });
      const workoutsRes = await axios.get('http://localhost:5000/api/workouts', { headers });
      const mealsRes = await axios.get('http://localhost:5000/api/meals', { headers });

      setUser(userRes.data);
      
      const totalCalories = mealsRes.data.reduce((sum, meal) => sum + (meal.calories || 0), 0);
      
      setStats({
        totalWorkouts: workoutsRes.data.length,
        totalCalories,
        currentWeight: userRes.data.currentWeight,
        goalWeight: userRes.data.goalWeight
      });
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  const weightDifference = stats.currentWeight - stats.goalWeight;
  const progressPercentage = Math.min(100, ((stats.currentWeight - stats.goalWeight) / stats.currentWeight * 100));

  return (
    <div className="dashboard">
      <div className="container">
        <h1>Welcome, {user?.name}!</h1>
        <p className="dashboard-subtitle">Your fitness dashboard</p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💪</div>
            <div className="stat-content">
              <div className="stat-label">Total Workouts</div>
              <div className="stat-value">{stats.totalWorkouts}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <div className="stat-label">Calories Today</div>
              <div className="stat-value">{stats.totalCalories}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⚖️</div>
            <div className="stat-content">
              <div className="stat-label">Current Weight</div>
              <div className="stat-value">{stats.currentWeight} kg</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <div className="stat-label">Goal Weight</div>
              <div className="stat-value">{stats.goalWeight} kg</div>
            </div>
          </div>
        </div>

        <div className="progress-section">
          <h2>Weight Progress</h2>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${Math.max(0, Math.min(100, progressPercentage))}%` }}></div>
            </div>
            <div className="progress-info">
              <span>{weightDifference.toFixed(1)} kg away from goal</span>
            </div>
          </div>
        </div>

        <div className="action-section">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <a href="/log-workout" className="btn btn-primary">Log Workout</a>
            <a href="/log-meal" className="btn btn-secondary">Log Meal</a>
            <a href="/progress" className="btn btn-outline">View Progress</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
