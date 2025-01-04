import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddRecipeForm = ({ navigation, route }) => {
  const { addRecipe } = route.params; // Get the addRecipe function passed via params
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);

  const handleAdd = () => {
    if (name.trim()) {
      addRecipe({ name, description, ingredients, instructions, image }); // Call addRecipe with the new recipe
      navigation.goBack(); // Navigate back to HomeScreen
    } else {
      Alert.alert('Error', 'Please enter a recipe name');
    }
  };

  const pickImage = async () => {
    // Request permission to access the gallery
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to allow access to your photos.');
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Set the selected image URI
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Recipe Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Ingredients"
        value={ingredients}
        onChangeText={setIngredients}
        style={styles.input}
      />
      <TextInput
        placeholder="Instructions"
        value={instructions}
        onChangeText={setInstructions}
        style={styles.input}
      />
      
      <Button title="Pick an Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />} {/* Display selected image */}
      <Button title="Add Recipe" onPress={handleAdd} color="#FF7043" /> {/* Green color for the button */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FAF3E0' }, // Light cream background
  input: { borderWidth: 1, padding: 12, marginBottom: 12, borderRadius: 8, backgroundColor: '#FFF' },
  image: { width: 150, height: 150, marginTop: 8, alignSelf: 'center', borderRadius: 10 }, // Rounded corners for the image
});

export default AddRecipeForm;
