import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS, SPACING } from "../constants/theme";
import { StyleSheet } from "react-native";

const ArchiveScreen = () => {
  const data = Array.from({ length: 6 }, (_, i) => `Archived Post ${i + 1}`);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Archive</Text>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}><Text style={styles.cardText}>{item}</Text></View>
        )}
      />
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
    marginBottom: SPACING.md,
    color: COLORS.primary,
  },
  card: {
    backgroundColor: COLORS.white,
    flex: 1,
    margin: SPACING.sm,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    fontSize: 14,
    color: COLORS.gray,
  },
});

export default ArchiveScreen;