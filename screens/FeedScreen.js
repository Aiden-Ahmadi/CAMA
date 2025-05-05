import { COLORS, SPACING } from "../constants/theme";

import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";


const FeedScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedPosts = async () => {
      try {
        if (!user) return;

        const response = await fetch(`https://cama-express.onrender.com/posts/feed/${user.id}`);
        const data = await response.json();

        if (response.ok) {
          setPosts(data);
        } else {
          console.error("Error fetching posts:", data.message);
        }
      } catch (error) {
        console.error("Server error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedPosts();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.info} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Feed</Text>

      {posts.length === 0 ? (
        <Text style={styles.noPostsText}>No posts from people you follow.</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image
                  source={{ uri: item.userId.profileImage || "https://via.placeholder.com/50" }}
                  style={styles.profileImage}
                />
                <Text style={styles.username}>{item.userId.username}</Text>
              </View>
              <Image source={{ uri: item.imageUrls[0] }} style={styles.postImage} />
              <Text style={styles.caption}>{item.caption}</Text>
            </View>
          )}
        />
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.sm,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: SPACING.md,
    color: COLORS.primary,
  },
  noPostsText: {
    textAlign: "center",
    color: COLORS.gray,
    marginTop: SPACING.md,
  },
  postCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.sm,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: SPACING.sm,
  },
  caption: {
    fontSize: 14,
    color: COLORS.gray,
  },
  logoutButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: SPACING.sm,
  },
  logoutButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FeedScreen;