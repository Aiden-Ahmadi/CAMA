import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { COLORS, SPACING } from "../constants/theme";
import { StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';


const FollowUserScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  const searchUsers = async (text) => {
    if (!text.trim()) {
      setUsers([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://cama-express.onrender.com/users/search?username=${text}`
      );
      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      } else {
        console.error("Error fetching users:", data.message);
        setUsers([]);
      }
    } catch (error) {
      console.error("Server error:", error);
      setUsers([]);
    }
    setLoading(false);
  };

  const fetchFollowingList = async () => {
    try {
      const response = await fetch(
        `https://cama-express.onrender.com/users/${user.id}/following`
      );
      const data = await response.json();

      if (response.ok) {
        setFollowing(new Set(data.map((u) => u._id)));
      } else {
        console.error("Error fetching following list:", data.message);
      }
    } catch (error) {
      console.error("Error fetching following list:", error);
    }
  };

  const followUser = async (targetUserId) => {
    try {
      const response = await fetch(
        `https://cama-express.onrender.com/users/follow`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ followerId: user.id, followingId: targetUserId }),
        }
      );

      if (response.ok) {
        setFollowing(new Set([...following, targetUserId]));
      } else {
        alert("Error following user.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error.");
    }
  };

  const unfollowUser = async (targetUserId) => {
    try {
      const response = await fetch(
        `https://cama-express.onrender.com/users/unfollow`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ followerId: user.id, followingId: targetUserId }),
        }
      );
      if (response.ok) {
        const updatedFollowing = new Set(following);
        updatedFollowing.delete(targetUserId);
        setFollowing(updatedFollowing);
      } else {
        alert("Error unfollowing user.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error.");
    }
  };

  useEffect(() => {
    fetchFollowingList();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="chevron-back" size={28} color={COLORS.primary} />
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        style={styles.searchInput}
        placeholder="Search by username..."
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          searchUsers(text);
        }}
      />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.info} />
      ) : (
        <>
          <FlatList
            data={users}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.userCard}>
                <Text style={styles.username}>{item.username}</Text>
                <TouchableOpacity
                  style={[
                    styles.followButton,
                    following.has(item._id) ? styles.followedButton : null,
                  ]}
                  onPress={() =>
                    following.has(item._id)
                      ? unfollowUser(item._id)
                      : followUser(item._id)
                  }
                >
                  <Text style={styles.followButtonText}>
                    {following.has(item._id) ? "Followed" : "Follow"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  
  backButton: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    height: 45,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding:6,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: SPACING.md,
    textAlign: "center",
    color: COLORS.primary,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: COLORS.inputBorder,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.md,
  },
  userCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  followButton: {
    backgroundColor: COLORS.info,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  followedButton: {
    backgroundColor: COLORS.success,
  },
  followButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: SPACING.md,
  },
  cancelButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FollowUserScreen;