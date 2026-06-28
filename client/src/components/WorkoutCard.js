import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function WorkoutCard({ workout, onDelete, onEdit }) {
  const date = new Date(workout.date).toLocaleDateString();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.exercise}>{workout.exercise}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.details}>
        {workout.muscleGroup && (
          <Text style={styles.detail}>Muscle: {workout.muscleGroup}</Text>
        )}
        <Text style={styles.detail}>
          {workout.sets} sets x {workout.reps} reps
        </Text>
        {workout.weight && <Text style={styles.detail}>Weight: {workout.weight} kg</Text>}
        {workout.duration && <Text style={styles.detail}>Duration: {workout.duration} min</Text>}
      </View>

      {workout.notes && <Text style={styles.notes}>Notes: {workout.notes}</Text>}

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(workout)}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(workout._id)}>
          <Text style={[styles.actionText, styles.delete]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  exercise: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1
  },
  date: {
    fontSize: 12,
    color: "#999"
  },
  details: {
    marginBottom: 10
  },
  detail: {
    fontSize: 13,
    color: "#666",
    marginBottom: 5
  },
  notes: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
    marginBottom: 10
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10
  },
  actionText: {
    color: "#007AFF",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 15
  },
  delete: {
    color: "#FF3B30"
  }
});