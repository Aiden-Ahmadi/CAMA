import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { COLORS, SPACING } from "../constants/theme";
import { AuthContext } from "../context/AuthContext";

const { width } = Dimensions.get("window");

const UserProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const [profilePosts, setProfilePosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserProfilePosts = async () => {
    try {
      setLoading(true);
      if (!user) return;

      const response = await fetch(`https://cama-express.onrender.com/posts/${user.id}`);
      const data = await response.json();

      if (response.ok) {
        setProfilePosts(data);
      } else {
        console.error("Error fetching user profile:", data.message);
      }
    } catch (error) {
      console.error("Server error:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserProfilePosts();
    }, [user])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const flatImages = profilePosts.flatMap((post) =>
    post.imageUrls.map((url, index) => ({
      url,
      id: `${post._id}-${index}`,
    }))
  );
  return (
  <FlatList
    data={flatImages}
    keyExtractor={(item) => item.id}
    numColumns={3}
    contentContainerStyle={styles.container}
    renderItem={({ item, index }) => (
      <Image
        source={{ uri: item.url }}
        style={[
          styles.gridImage,
          (index + 1) % 3 === 0 && { marginRight: 0 } // No right margin for last column
        ]}
      />
    )}
    ListHeaderComponent={
      <>
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
      </>
    }
  />

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
    width: (width - SPACING.md * 2 - SPACING.sm) / 3,
    height: (width - SPACING.md * 2 - SPACING.sm) / 3,
    marginRight: SPACING.sm/2,
    marginBottom: SPACING.sm/2,
  },  
  gridText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.accent,
  },
});
export default UserProfileScreen;
