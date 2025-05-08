import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import FeedScreen from "./FeedScreen";
import CreatePostScreen from "./CreatePostScreen";
import UserProfileScreen from "./UserProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MapScreen from "./MapScreen";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Feed") iconName = "home-outline";
          else if (route.name === "Create") iconName = "add-circle-outline";
          else if (route.name === "Map") iconName = "map-outline";
          else if (route.name === "Profile") iconName = "person-outline";
          else if (route.name === "Settings") iconName = "settings-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Create" component={CreatePostScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  
  );
};

export default BottomNav;
