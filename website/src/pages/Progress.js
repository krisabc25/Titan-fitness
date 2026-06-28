import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Progress.css';

const Progress = () => {
  const [workouts, setWorkouts] = useState([]);
  const [bodyWeight, setBodyWeight] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('week');

  useEffect(() => {
    fetchProgressData();
  }, [filter]);

  const fetchProgressData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const workoutsRes = await axios.get('http://localhost:5000/api/workouts', { headers });
      const weightRes = await axios.get('http://localhost:5000/api/bodyweight', { headers });

      setWorkouts(workoutsRes.data);
      setBodyWeight(weightRes.data);
    } catch (error) {
      console.error('Failed to load progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="progress-loading">Loading...</div>;

  const recentWorkouts = workouts.slice(0, 10);
  const recentWeight = bodyWeight.slice(0, 10);
  const totalVolume = workouts.reduce((sum, w) => sum + ((w.weight || 0) * (w.sets || 0) * (w.reps || 0)), 0);

  return (
    <div className="progress">
      <div className="container">
        <h1>Your Progress</h1>
        <p className="subtitle">Track your fitness journey</p>

        <div className="progress-stats">
          <div className="progress-card">
            <div className="progress-icon">💪</div>
            <div className="progress-content">
              <div className="progress-label">Total Workouts</div>
              <div className="progress-value">{workouts.length}</div>
            </div>
          </div>

          <div className="progress-card">
            <div className="progress-icon">📊</div>
            <div className="progress-content">
              <div className="progress-label">Total Volume</div>
              <div className="progress-value">{Math.round(totalVolume).toLocaleString()} kg</div>
            </div>
          </div>

          <div className="progress-card">
            <div className="progress-icon">📈</div>
            <div className="progress-content">
              <div className="progress-label">Weight History</div>
              <div className="progress-value">{bodyWeight.length} entries</div>
            </div>
          </div>
        </div>

        <div className="progress-content-area">
          <div className="progress-section">
            <h2>Recent Workouts</h2>
            {recentWorkouts.length > 0 ? (
              <div className="workout-list">
                {recentWorkouts.map((workout, idx) => (
                  <div key={idx} className="workout-item">
                    <div className="workout-header">
                      <h3>{workout.exercise}</h3>
                      <span className="workout-date">
                        {new Date(workout.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="workout-details">
                      {workout.muscleGroup && <span>🎯 {workout.muscleGroup}</span>}
                      {workout.sets && <span>📊 {workout.sets}x{workout.reps}</span>}
                      {workout.weight && <span>⚖️ {workout.weight}kg</span>}
                      {workout.duration && <span>⏱️ {workout.duration}min</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No workouts logged yet</p>
            )}
          </div>

          <div className="progress-section">
            <h2>Weight History</h2>
            {recentWeight.length > 0 ? (
              <div className="weight-list">
                {recentWeight.map((entry, idx) => (
                  <div key={idx} className="weight-item">
                    <div className="weight-date">
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                    <div className="weight-value">
                      {entry.weight} kg
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No weight entries yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
