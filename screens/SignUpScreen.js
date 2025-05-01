import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    const success = await register(username, email, password);
    if (success) {
      Alert.alert("Success", "Account created!");
      //navigation.replace("Login"); // Redirect to login page
    } else {
      Alert.alert("Error", "Failed to create account");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Sign Up</Text>

      <TextInput 
        placeholder="Username" 
        value={username} 
        onChangeText={setUsername} 
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <TextInput 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
