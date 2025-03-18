import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext";

const FollowUserScreen = () => {
    const { user } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
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
            console.log(data);

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

    // Follow a user
    const followUser = async (targetUserId) => {
        try {
            const response = await fetch(`https://cama-express.onrender.com/users/follow`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ followerId: user.id, followingId: targetUserId }),
            });

            if (response.ok) {
                alert("User followed successfully!");
            } else {
                alert("Error following user.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server error.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Search for Users</Text>

            <TextInput
                style={styles.input}
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={searchUsers} // Search when user presses "Enter"
            />

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <FlatList
                    data={users}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.userCard}>
                            <Text style={styles.username}>{item.username}</Text>
                            <TouchableOpacity style={styles.followButton} onPress={() => followUser(item._id)}>
                                <Text style={styles.followButtonText}>Follow</Text>
                            </TouchableOpacity>
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
    followButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default FollowUserScreen;
