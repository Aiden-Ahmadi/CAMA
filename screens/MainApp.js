// import React, { useState, useContext } from "react";
// import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
// import { AuthContext } from "../context/AuthContext";

// const HomeScreen = ({navigation}) => {
//     const {logout} = useContext(AuthContext);
//     return(
//         <SafeAreaView style={styles.container}>
//             <Text style={styles.welcomeText}>Welcome to Cama!</Text>
//             <Text style={styles.subtitle}>This is your home screen.</Text>
//             <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate("Feed")}>
//                 <Text style={styles.logoutButtonText}>Go to Feed</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate("CreatePost")}>
//                 <Text style={styles.logoutButtonText}>Create Post</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate("FollowUser")}>
//                 <Text style={styles.logoutButtonText}>Follow User</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.logoutButton} onPress={logout}>
//                 <Text style={styles.logoutButtonText}>Log Out</Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "#f8f9fa", // Light gray background
//       padding: 20,
//     },
//     welcomeText: {
//       fontSize: 24,
//       fontWeight: "bold",
//       color: "#333",
//       marginBottom: 10,
//     },
//     subtitle: {
//       fontSize: 16,
//       color: "#555",
//       marginBottom: 30,
//     },
//     logoutButton: {
//       width: 180,
//       backgroundColor: "#ff4757", // Red logout button
//       paddingVertical: 12,
//       paddingHorizontal: 30,
//       borderRadius: 8,
//       elevation: 3, // Shadow effect for Android
//       shadowColor: "#000",
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.2,
//       shadowRadius: 3,
//       marginBottom: 12,
//       alignItems: "center"
//     },
//     logoutButtonText: {
//       color: "#fff",
//       fontSize: 18,
//       fontWeight: "bold",
//     },
//     feedButton: {
//         backgroundColor: "#28a745",
//         paddingVertical: 12,
//         paddingHorizontal: 30,
//         borderRadius: 8,
//         marginVertical: 10,
//     },
//     feedButtonText: {
//         color: "#fff",
//         fontSize: 16,
//         fontWeight: "bold",
//     }
//     });



  
// export default HomeScreen;