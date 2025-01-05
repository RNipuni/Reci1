import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Alert, ScrollView, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddRecipeForm = ({ navigation, route }) => {
  const { addRecipe } = route.params; 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);

  const handleAdd = () => {
    if (name.trim()) {
      addRecipe({ name, description, ingredients, instructions, image }); 
      navigation.goBack(); 
    } else {
      alert('Error', 'Please enter a recipe name');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission Denied', 'You need to allow access to your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); 
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        multiline
      />
      <TextInput
        placeholder="Ingredients"
        value={ingredients}
        onChangeText={setIngredients}
        style={styles.input}
        multiline
      />
      <TextInput
        placeholder="Instructions"
        value={instructions}
        onChangeText={setInstructions}
        style={styles.input}
        multiline
      />

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Pick an Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />} 

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#FAF3E0' },
  input: { 
    borderWidth: 1, 
    padding: 12, 
    marginBottom: 16, 
    borderRadius: 8, 
    backgroundColor: '#FFF',
  },
  image: { 
    width: 150, 
    height: 150, 
    marginTop: 8, 
    alignSelf: 'center', 
    borderRadius: 10, 
    marginBottom: 16
  },
  imageButton: {
    backgroundColor: '#FF7043',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16
  },
  imageButtonText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold'
  }
});

export default AddRecipeForm;
