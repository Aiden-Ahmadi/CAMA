import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView } from "react-native";
import { COLORS, FONT, SPACING } from "../constants/theme";
import { AuthContext } from "../context/AuthContext";

const { width } = Dimensions.get("window");

const UserProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const [profilePosts, setProfilePosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfilePosts = async () => {
      try {
        if (!user) return;

        console.log(user);
        const response = await fetch(`https://cama-express.onrender.com/posts/${user.id}`);
        console.log(response);
        const data = await response.json();

        if (response.ok) {
          setProfilePosts(data);
        } else {
          console.error("Error fetching user profile:", data);
        }
      } catch (error) {
        console.error("Server error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfilePosts();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!profilePosts) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Unable to load profile.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.header}>
      <Image
        source={{ uri: user.profileImage || "https://via.placeholder.com/100" }}
        style={styles.avatar}
      />
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.bio}>{user.bio || "No bio yet."}</Text>
      <Text style={styles.stars}>★★★★★</Text>
    </View>

    <View style={styles.tabRow}>
      <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>My Posts</Text></TouchableOpacity>
      <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Pinpoints</Text></TouchableOpacity>
    </View>

    <View style={styles.gridContainer}>
      {profilePosts.map((post) =>
        post.imageUrls.map((url, i) => (
          <Image
            key={`${post._id}-${i}`}
            source={{ uri: url }}
            style={styles.gridImage}
          />
        ))
      )}
    </View>
  </ScrollView>
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
  gridImage: {
    width: (width - SPACING.md * 2 - SPACING.sm * 2) / 3,
    height: (width - SPACING.md * 2 - SPACING.sm * 2) / 3,
    borderRadius: 6,
    marginBottom: SPACING.sm,
  },
  gridText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.accent,
  },
});
export default UserProfileScreen;
