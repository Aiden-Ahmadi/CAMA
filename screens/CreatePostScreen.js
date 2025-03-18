import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../context/AuthContext";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dq7fnjqmi/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "Post"; // Set this in Cloudinary

const CreatePostScreen = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Pick image from device
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

    // Upload image to Cloudinary
    const uploadImage = async () => {
        console.log("Before null");
        if (!image) return null;
        console.log("after null");
        // console.log(signature);
        console.log("yay");
        // console.log(api_key);


        setUploading(true);
        try {
            const signature_response = await fetch(`https://cama-express.onrender.com/cloudinary/generate-signature`);
            console.log(signature_response);
            const { timestamp, signature, api_key } = await signature_response.json();
            let formData = new FormData();
            formData.append("file", { uri: image, type: "image/jpeg", name: "upload.jpg" });
            formData.append("upload_preset", "Post");
            formData.append("timestamp", timestamp);
            formData.append("signature", signature);
            formData.append("api_key", api_key);

            let response = await fetch(CLOUDINARY_URL, {
                method: "POST",
                body: formData,
            });

            let data = await response.json();
            console.log(data.secure_url);
            return data.secure_url; // Cloudinary URL
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Image upload failed");
            return null;
        } finally {
            setUploading(false);
        }
    };

    // Handle post creation
    const handleCreatePost = async () => {
        if (!caption) {
            alert("Please enter a caption.");
            return;
        }
        console.log("before upload");

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
            let r = await response.json();
            console.log(r);
            if (response.ok) {
                alert("Post created successfully!");
                navigation.goBack(); // Go back to home screen after posting
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

            {/* Image Preview */}
            {image && <Image source={{ uri: image }} style={styles.previewImage} />}

            {/* Pick Image Button */}
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <Text style={styles.imageButtonText}>{image ? "Change Image" : "Pick an Image"}</Text>
            </TouchableOpacity>

            {/* Uploading Indicator */}
            {uploading && <ActivityIndicator size="large" color="#007bff" />}

            {/* Post Button */}
            <TouchableOpacity style={styles.postButton} onPress={handleCreatePost}>
                <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
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
        backgroundColor: "#f8f9fa",
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
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
        marginBottom: 20,
    },
    previewImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    imageButton: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 10,
    },
    imageButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    postButton: {
        backgroundColor: "#28a745",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 10,
    },
    postButtonText: {
        color: "#fff",
        fontSize: 16,
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

export default CreatePostScreen;
  