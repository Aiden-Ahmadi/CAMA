import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { COLORS, SPACING } from "../constants/theme";

const AgreementScreen = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.header}>User Agreement</Text>
    <Text style={styles.text}>
      By using CAMA, you agree to the terms and conditions set forth in our agreement. Respect others and post responsibly. Your use of the app signifies your compliance with community guidelines.
    </Text>
  </ScrollView>
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

export default AgreementScreen;
