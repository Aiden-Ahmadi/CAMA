import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import BottomNav from "./screens/BottomNav"; 
import FeedScreen from "./screens/FeedScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import FollowUserScreen from "./screens/FollowUserScreen";
import { useEffect } from "react";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Main" component={BottomNav} />
          <Stack.Screen name="Feed" component={FeedScreen} />
          <Stack.Screen name="CreatePost" component={CreatePostScreen}/>
          <Stack.Screen name="FollowUser" component={FollowUserScreen}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
