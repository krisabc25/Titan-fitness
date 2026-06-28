import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ScrollView, Alert } from "react-native";
import ApiService from "../services/api";

export default function LogWorkoutScreen({ navigation }) {
  const [exercise, setExercise] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveWorkout = async () => {
    if (!exercise || !sets || !reps) {
      Alert.alert("Error", "Please fill in exercise, sets, and reps");
      return;
    }

    setLoading(true);
    try {
      const workoutData = {
        exercise,
        muscleGroup,
        sets: parseInt(sets),
        reps: parseInt(reps),
        weight: weight ? parseFloat(weight) : 0,
        duration: duration ? parseInt(duration) : 0,
        notes
      };

      await ApiService.createWorkout(workoutData);
      Alert.alert("Success", "Workout saved!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save workout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Log Your Workout</Text>

      <Text style={styles.label}>Exercise Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Bench Press"
        value={exercise}
        onChangeText={setExercise}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Muscle Group</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Chest"
        value={muscleGroup}
        onChangeText={setMuscleGroup}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Sets</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 4"
        value={sets}
        onChangeText={setSets}
        keyboardType="number-pad"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Reps</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 10"
        value={reps}
        onChangeText={setReps}
        keyboardType="number-pad"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 50"
        value={weight}
        onChangeText={setWeight}
        keyboardType="decimal-pad"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Duration (minutes)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 30"
        value={duration}
        onChangeText={setDuration}
        keyboardType="number-pad"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Add any notes about this workout"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={4}
        placeholderTextColor="#999"
      />

      <Button
        title={loading ? "Saving..." : "Save Workout"}
        onPress={handleSaveWorkout}
        disabled={loading}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333"
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "white",
    fontSize: 14
  },
  textArea: {
    textAlignVertical: "top",
    paddingTop: 12
  }
});