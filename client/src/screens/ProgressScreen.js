import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import ApiService from "../services/api";

export default function ProgressScreen() {
  const [workouts, setWorkouts] = useState([]);
  const [bodyWeight, setBodyWeight] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = async () => {
    try {
      const workoutData = await ApiService.getWorkouts();
      const weightData = await ApiService.getBodyWeightHistory();
      setWorkouts(workoutData);
      setBodyWeight(weightData);
    } catch (error) {
      Alert.alert("Error", "Failed to load progress data");
    } finally {
      setLoading(false);
    }
  };

  const getWeightDifference = () => {
    if (bodyWeight.length >= 2) {
      const latest = bodyWeight[0]?.weight;
      const earliest = bodyWeight[bodyWeight.length - 1]?.weight;
      return (latest - earliest).toFixed(1);
    }
    return "N/A";
  };

  const getTotalWorkoutVolume = () => {
    return workouts.reduce((total, workout) => {
      const volume = (workout.weight || 0) * (workout.sets || 0) * (workout.reps || 0);
      return total + volume;
    }, 0).toFixed(0);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading progress...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Summary Stats</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Workouts:</Text>
          <Text style={styles.statValue}>{workouts.length}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Weight Change:</Text>
          <Text style={[styles.statValue, getWeightDifference() > 0 && styles.negative]}>
            {getWeightDifference()} kg
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Volume:</Text>
          <Text style={styles.statValue}>{getTotalWorkoutVolume()} kg</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Workouts</Text>
        {workouts.slice(0, 5).map((workout, index) => (
          <View key={index} style={styles.workoutItem}>
            <Text style={styles.workoutExercise}>{workout.exercise}</Text>
            <Text style={styles.workoutDetails}>
              {workout.sets} x {workout.reps} @ {workout.weight}kg
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weight History</Text>
        {bodyWeight.slice(0, 5).map((entry, index) => (
          <View key={index} style={styles.weightItem}>
            <Text style={styles.weightValue}>{entry.weight} kg</Text>
            <Text style={styles.weightDate}>
              {new Date(entry.date).toLocaleDateString()}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333"
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333"
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600"
  },
  statValue: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "bold"
  },
  negative: {
    color: "#FF3B30"
  },
  workoutItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  workoutExercise: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5
  },
  workoutDetails: {
    fontSize: 12,
    color: "#666"
  },
  weightItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  weightValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333"
  },
  weightDate: {
    fontSize: 12,
    color: "#999"
  }
});