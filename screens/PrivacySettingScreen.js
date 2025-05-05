import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING } from "../constants/theme";

const PrivacySettingsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.header}>Privacy Settings</Text>
    <Text style={styles.text}>Control your data visibility.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: SPACING.md,
    color: COLORS.primary,
  },
  text: {
    fontSize: 16,
    color: COLORS.gray,
  },
});

export default PrivacySettingsScreen;