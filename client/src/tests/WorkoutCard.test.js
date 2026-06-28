import React from 'react';
import { render } from '@testing-library/react-native';
import WorkoutCard from '../src/components/WorkoutCard';

describe('WorkoutCard', () => {
  const mockWorkout = {
    _id: '1',
    exercise: 'Bench Press',
    muscleGroup: 'Chest',
    sets: 4,
    reps: 8,
    weight: 100,
    duration: 45,
    notes: 'Great workout',
    date: new Date().toISOString()
  };

  it('should render workout details', () => {
    const { getByText } = render(
      <WorkoutCard
        workout={mockWorkout}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
      />
    );

    expect(getByText('Bench Press')).toBeDefined();
    expect(getByText('Muscle: Chest')).toBeDefined();
    expect(getByText('Weight: 100 kg')).toBeDefined();
  });

  it('should display action buttons', () => {
    const { getByText } = render(
      <WorkoutCard
        workout={mockWorkout}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
      />
    );

    expect(getByText('Edit')).toBeDefined();
    expect(getByText('Delete')).toBeDefined();
  });

  it('should call onDelete when delete is pressed', () => {
    const mockDelete = jest.fn();
    const { getByText } = render(
      <WorkoutCard
        workout={mockWorkout}
        onDelete={mockDelete}
        onEdit={jest.fn()}
      />
    );

    fireEvent.press(getByText('Delete'));
    expect(mockDelete).toHaveBeenCalledWith(mockWorkout._id);
  });
});
