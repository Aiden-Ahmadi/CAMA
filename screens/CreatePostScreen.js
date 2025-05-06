import { COLORS, SPACING } from "../constants/theme";
import { StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../context/AuthContext";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dq7fnjqmi/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "Post";

const CreatePostScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return null;
    setUploading(true);
    try {
      const signature_response = await fetch(`https://cama-express.onrender.com/cloudinary/generate-signature`);
      const { timestamp, signature, api_key } = await signature_response.json();

      let formData = new FormData();
      formData.append("file", { uri: image, type: "image/jpeg", name: "upload.jpg" });
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("api_key", api_key);

      let response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      let data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!caption) {
      alert("Please enter a caption.");
      return;
    }

    let imageUrl = await uploadImage();

    try {
      const response = await fetch("https://cama-express.onrender.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          caption,
          imageUrls: imageUrl ? [imageUrl] : [],
        }),
      });
      if (response.ok) {
        alert("Post created successfully!");
        navigation.goBack();
      } else {
        alert("Error creating post.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Write a caption..."
        value={caption}
        onChangeText={setCaption}
      />
      {image && <Image source={{ uri: image }} style={styles.previewImage} />}
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>{image ? "Change Image" : "Pick an Image"}</Text>
      </TouchableOpacity>
      {uploading && <ActivityIndicator size="large" color={COLORS.info} />}
      <TouchableOpacity style={styles.postButton} onPress={handleCreatePost}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B8B4D6", // light lavender background
    padding: SPACING.md,
  },
  header: {
    fontSize: 30,
    fontWeight: "900",
    color: "#000",
    marginBottom: SPACING.md,
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#444",
    marginBottom: SPACING.md,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: SPACING.md,
  },
  imageButton: {
    width: "90%",
    backgroundColor: "#6E6E6E",
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: SPACING.sm,
    alignItems: "center",
  },
  imageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  postButton: {
    width: "90%",
    backgroundColor: "#6E6E6E",
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: SPACING.sm,
    alignItems: "center",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    width: "90%",
    backgroundColor: "#6E6E6E",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});


export default CreatePostScreen;