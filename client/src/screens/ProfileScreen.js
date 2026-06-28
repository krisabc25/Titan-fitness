import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet, ScrollView, Alert } from "react-native";
import ApiService from "../services/api";

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const user = await ApiService.getUserProfile();
      setName(user.name || "");
      setEmail(user.email || "");
      setAge(user.age?.toString() || "");
      setHeight(user.height?.toString() || "");
      setCurrentWeight(user.currentWeight?.toString() || "");
      setGoalWeight(user.goalWeight?.toString() || "");
    } catch (error) {
      Alert.alert("Error", "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setUpdating(true);
    try {
      await ApiService.updateUserProfile({
        name,
        age: parseInt(age),
        height: parseFloat(height),
        currentWeight: parseFloat(currentWeight),
        goalWeight: parseFloat(goalWeight)
      });
      Alert.alert("Success", "Profile updated!");
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, styles.disabled]}
        value={email}
        editable={false}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="number-pad"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        keyboardType="decimal-pad"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Current Weight (kg)</Text>
      <TextInput
        style={styles.input}
        value={currentWeight}
        onChangeText={setCurrentWeight}
        keyboardType="decimal-pad"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Goal Weight (kg)</Text>
      <TextInput
        style={styles.input}
        value={goalWeight}
        onChangeText={setGoalWeight}
        keyboardType="decimal-pad"
        placeholderTextColor="#999"
      />

      <Button
        title={updating ? "Updating..." : "Update Profile"}
        onPress={handleUpdateProfile}
        disabled={updating}
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
    fontSize: 28,
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
  disabled: {
    backgroundColor: "#f0f0f0",
    color: "#999"
  }
});