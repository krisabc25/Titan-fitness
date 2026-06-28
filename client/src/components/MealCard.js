import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function MealCard({ meal, onDelete, onEdit }) {
  const date = new Date(meal.date).toLocaleDateString();
  const mealTypeLabel = meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.mealType}>{mealTypeLabel}</Text>
          <Text style={styles.name}>{meal.name}</Text>
        </View>
        <Text style={styles.calories}>{meal.calories} cal</Text>
      </View>

      <View style={styles.macros}>
        <View style={styles.macro}>
          <Text style={styles.macroLabel}>Protein</Text>
          <Text style={styles.macroValue}>{meal.protein}g</Text>
        </View>
        <View style={styles.macro}>
          <Text style={styles.macroLabel}>Carbs</Text>
          <Text style={styles.macroValue}>{meal.carbs}g</Text>
        </View>
        <View style={styles.macro}>
          <Text style={styles.macroLabel}>Fats</Text>
          <Text style={styles.macroValue}>{meal.fats}g</Text>
        </View>
        <View style={styles.macro}>
          <Text style={styles.macroLabel}>Fiber</Text>
          <Text style={styles.macroValue}>{meal.fiber}g</Text>
        </View>
      </View>

      {meal.notes && <Text style={styles.notes}>Notes: {meal.notes}</Text>}

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(meal)}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(meal._id)}>
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
    alignItems: "flex-start",
    marginBottom: 12
  },
  mealType: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "600",
    marginBottom: 3
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333"
  },
  calories: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF9500"
  },
  macros: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee"
  },
  macro: {
    alignItems: "center"
  },
  macroLabel: {
    fontSize: 11,
    color: "#999",
    marginBottom: 3
  },
  macroValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333"
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