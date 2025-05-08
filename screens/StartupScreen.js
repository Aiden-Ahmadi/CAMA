import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS } from "../constants/theme";


const StartupScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>CΛMΛ</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: COLORS.primary,
    fontFamily: "System",
  },
});

export default StartupScreen;
