import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import ApiService from "../services/api";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ workouts: 0, meals: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await ApiService.getUserProfile();
      setUser(userData);

      const workouts = await ApiService.getWorkouts();
      const meals = await ApiService.getMeals();

      setStats({
        workouts: workouts.length,
        meals: meals.length
      });
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome, {user?.name || "Athlete"}!</Text>
        <Text style={styles.subtitle}>Your Fitness Dashboard</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.workouts}</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{user?.currentWeight}kg</Text>
          <Text style={styles.statLabel}>Weight</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.meals}</Text>
          <Text style={styles.statLabel}>Meals Logged</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("LogWorkout")}
        >
          <Text style={styles.actionButtonText}>+ Log Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("LogMeal")}
        >
          <Text style={styles.actionButtonText}>+ Log Meal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Progress")}
        >
          <Text style={styles.actionButtonText}>View Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.actionButtonText}>My Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  header: {
    backgroundColor: "#007AFF",
    padding: 20,
    paddingTop: 40
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)"
  },
  statsContainer: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between"
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF"
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5
  },
  section: {
    padding: 15
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333"
  },
  actionButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center"
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600"
  }
});