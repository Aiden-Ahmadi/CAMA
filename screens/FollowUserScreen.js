import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext";

const FollowUserScreen = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [following, setFollowing] = useState(new Set()); // Store followed users
    const [loading, setLoading] = useState(false);

    // Fetch users based on search input
    const searchUsers = async () => {
        if (!searchQuery.trim()) {
            setUsers([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`https://cama-express.onrender.com/users/search?username=${searchQuery}`);
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

    // Fetch list of users the logged-in user is following
    const fetchFollowingList = async () => {
        try {
            const response = await fetch(`https://cama-express.onrender.com/users/${user.id}/following`);
            const data = await response.json();

            if (response.ok) {
                setFollowing(new Set(data.map((u) => u._id))); // Store following user IDs in a Set
            } else {
                console.error("Error fetching following list:", data.message);
            }
        } catch (error) {
            console.error("Error fetching following list:", error);
        }
    };

    // Follow a user
    const followUser = async (targetUserId) => {
        try {
            const response = await fetch(`https://cama-express.onrender.com/users/follow`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ followerId: user.id, followingId: targetUserId }),
            });

            if (response.ok) {
                setFollowing(new Set([...following, targetUserId])); // Update state after following
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
            const response = await fetch(`https://cama-express.onrender.com/users/unfollow`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ followerId: user.id, followingId: targetUserId }),
            });

            if (response.ok) {
                const updatedFollowing = new Set(following);
                updatedFollowing.delete(targetUserId)
                setFollowing(updatedFollowing); // Update state after following
            } else {
                alert("Error following user.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server error.");
        }
    };

    // Fetch following list on component mount
    useEffect(() => {
        fetchFollowingList();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Search for Users</Text>

            <TextInput
                style={styles.input}
                placeholder="Search by username..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={searchUsers} // Search when user presses "Enter"
            />

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
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
                                        following.has(item._id) ? styles.followedButton : {},
                                    ]}
                                    onPress={() => following.has(item._id) ? unfollowUser(item._id):followUser(item._id)} // Disable if already following
                                >
                                    <Text style={styles.followButtonText}>
                                        {following.has(item._id) ? "Followed" : "Follow"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: "#fff",
        marginBottom: 20,
    },
    userCard: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
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
    },
    followButton: {
        backgroundColor: "#007bff",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    followedButton: {
        backgroundColor: "#28a745", // Change button color to green if already followed
    },
    followButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    cancelButton: {
        backgroundColor: "#ff4757",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    cancelButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    }
});

export default FollowUserScreen;
