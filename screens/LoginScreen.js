import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext"

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    const success = await login(email, password);
    if (!success) {
      Alert.alert("Error", "Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Log in to continue</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={'#999'}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          color={'#000'}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={'#999'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          color={'#000'}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signUpButtonText}>Create a New Account</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
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
    marginBottom: 12, // Adds spacing between inputs
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 15, // Adds spacing between buttons
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpButton: {
    borderWidth: 1,
    borderColor: "#007bff",
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    borderRadius: 8,
  },
  signUpButtonText: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
