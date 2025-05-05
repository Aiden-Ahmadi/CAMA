import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { COLORS, FONT, SPACING } from "../constants/theme";


const { width } = Dimensions.get("window");

const UserProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.avatar}
        />
        <Text style={styles.username}>sapiens</Text>
        <Text style={styles.bio}>social traveler ✈️ | catch the drip worldwide</Text>
        <Text style={styles.stars}>★★★★★</Text>
      </View>

      <View style={styles.tabRow}>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>My Posts</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Pinpoints</Text></TouchableOpacity>
      </View>

      <View style={styles.gridContainer}>
        {[...Array(9)].map((_, i) => (
          <View key={i} style={styles.gridItem}>
            <Text style={styles.gridText}>C</Text>
          </View>
        ))}
      </View>
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
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SPACING.sm,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  bio: {
    fontSize: 14,
    color: COLORS.gray,
    marginVertical: 4,
    textAlign: "center",
  },
  stars: {
    fontSize: 18,
    color: COLORS.primary,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: SPACING.md,
  },
  tab: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: (width - SPACING.md * 2 - SPACING.sm * 2) / 3,
    height: (width - SPACING.md * 2 - SPACING.sm * 2) / 3,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  gridText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.accent,
  },
});

export default UserProfileScreen;
