import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ScrollView, Alert, Picker } from "react-native";
import ApiService from "../services/api";

export default function LogMealScreen({ navigation }) {
  const [mealType, setMealType] = useState("breakfast");
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [fiber, setFiber] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveMeal = async () => {
    if (!name || !calories) {
      Alert.alert("Error", "Please fill in meal name and calories");
      return;
    }

    setLoading(true);
    try {
      const mealData = {
        mealType,
        name,
        calories: parseFloat(calories),
        protein: protein ? parseFloat(protein) : 0,
        carbs: carbs ? parseFloat(carbs) : 0,
        fats: fats ? parseFloat(fats) : 0,
        fiber: fiber ? parseFloat(fiber) : 0,
        notes
      };

      await ApiService.createMeal(mealData);
      Alert.alert("Success", "Meal logged!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to log meal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Log Your Meal</Text>

      <Text style={styles.label}>Meal Type</Text>
      <Picker
        selectedValue={mealType}
        onValueChange={setMealType}
        style={styles.picker}
      >
        <Picker.Item label="Breakfast" value="breakfast" />
        <Picker.Item label="Lunch" value="lunch" />
        <Picker.Item label="Dinner" value="dinner" />
        <Picker.Item label="Snack" value="snack" />
      </Picker>

      <Text style={styles.label}>Meal Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Grilled Chicken Salad"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Calories</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 500"
        value={calories}
        onChangeText={setCalories}
        keyboardType="decimal-pad"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Protein (g)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 30"
        value={protein}
        onChangeText={setProtein}
        keyboardType="decimal-pad"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Carbs (g)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 45"
        value={carbs}
        onChangeText={setCarbs}
        keyboardType="decimal-pad"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Fats (g)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 15"
        value={fats}
        onChangeText={setFats}
        keyboardType="decimal-pad"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Fiber (g)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 5"
        value={fiber}
        onChangeText={setFiber}
        keyboardType="decimal-pad"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Add notes about this meal"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={3}
        placeholderTextColor="#999"
      />

      <Button
        title={loading ? "Logging..." : "Log Meal"}
        onPress={handleSaveMeal}
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
  picker: {
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 8
  },
  textArea: {
    textAlignVertical: "top",
    paddingTop: 12
  }
});