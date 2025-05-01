import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";

const FeedScreen = ({navigation}) => {
  const { user } = useContext(AuthContext); // Get the logged-in user
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
        <ActivityIndicator size="large" color="#007bff" />
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
                <Image source={{ uri: item.userId.profileImage || "https://via.placeholder.com/50" }} style={styles.profileImage} />
                <Text style={styles.username}>{item.userId.username}</Text>
              </View>
              <Image source={{ uri: item.imageUrls[0] }} style={styles.postImage} />
              <Text style={styles.caption}>{item.caption}</Text>
            </View>
          )}
        />
      )}
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.goBack()}>
            <Text style={styles.logoutButtonText}>Go Back</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
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
    marginVertical: 15,
    color: "#333",
  },
  noPostsText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  caption: {
    fontSize: 14,
    color: "#555",
  },
});

export default FeedScreen;
