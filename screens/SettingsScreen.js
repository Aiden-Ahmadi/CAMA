import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SPACING } from "../constants/theme";
import { AuthContext } from "../context/AuthContext";

const SettingsScreen = ({ navigation }) => {
  const {logout} = useContext(AuthContext);
  return (
  <View style={styles.container}>
    <Text style={styles.header}>Settings</Text>
    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("ProfileSettings")}>
      <Text style={styles.optionText}>Profile Settings</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("PrivacySettings")}>
      <Text style={styles.optionText}>Privacy</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Archive")}> 
      <Text style={styles.optionText}>Archive</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Agreement")}> 
      <Text style={styles.optionText}>User Agreement</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.option} onPress={logout}>
      <Text style={styles.optionText}>Log Out</Text>
    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: SPACING.lg,
    color: COLORS.primary,
  },
  option: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.sm,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.primary,
  },
});

export default SettingsScreen;