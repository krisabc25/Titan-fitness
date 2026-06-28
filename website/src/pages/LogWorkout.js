import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LogWorkout.css';

const LogWorkout = () => {
  const [formData, setFormData] = useState({
    exercise: '',
    muscleGroup: '',
    sets: '',
    reps: '',
    weight: '',
    duration: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const workoutData = {
        exercise: formData.exercise,
        muscleGroup: formData.muscleGroup,
        sets: parseInt(formData.sets),
        reps: parseInt(formData.reps),
        weight: formData.weight ? parseFloat(formData.weight) : 0,
        duration: formData.duration ? parseInt(formData.duration) : 0,
        notes: formData.notes
      };

      await axios.post('http://localhost:5000/api/workouts', workoutData, { headers });
      setMessage('Workout logged successfully!');
      setFormData({
        exercise: '',
        muscleGroup: '',
        sets: '',
        reps: '',
        weight: '',
        duration: '',
        notes: ''
      });
    } catch (error) {
      setMessage('Failed to log workout. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="log-workout">
      <div className="container">
        <h1>Log Your Workout</h1>
        <p className="subtitle">Track your exercise and progress</p>

        {message && (
          <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="workout-form">
          <div className="form-group">
            <label htmlFor="exercise">Exercise Name *</label>
            <input
              type="text"
              id="exercise"
              name="exercise"
              value={formData.exercise}
              onChange={handleChange}
              placeholder="e.g., Bench Press"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="muscleGroup">Muscle Group</label>
              <input
                type="text"
                id="muscleGroup"
                name="muscleGroup"
                value={formData.muscleGroup}
                onChange={handleChange}
                placeholder="e.g., Chest"
              />
            </div>
            <div className="form-group">
              <label htmlFor="sets">Sets *</label>
              <input
                type="number"
                id="sets"
                name="sets"
                value={formData.sets}
                onChange={handleChange}
                placeholder="e.g., 4"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="reps">Reps *</label>
              <input
                type="number"
                id="reps"
                name="reps"
                value={formData.reps}
                onChange={handleChange}
                placeholder="e.g., 8"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="e.g., 100"
                step="0.5"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration (minutes)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 45"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any notes about this workout"
              rows="4"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging...' : 'Log Workout'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogWorkout;
