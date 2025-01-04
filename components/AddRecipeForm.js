import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddRecipeForm = ({ navigation, route }) => {
  const { addRecipe } = route.params; // Get the addRecipe function passed via params
  const [name, setName] = useState('');
  const [description, setdescription] = useState('');
  const [ingredients,setingredients]=useState('')
  const [Instructions,setInstructions]=useState('')
  const [image, setImage] = useState(null);


  const handleAdd = () => {
    if (name.trim()) {
      addRecipe({ name,description,ingredients,Instructions,image }); // Call addRecipe with the new recipe
      navigation.goBack(); // Navigate back to HomeScreen
    } else {
      alert('Please enter a recipe name');
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
            onChangeText={setdescription}
           // onBlur={handleBlur('description')}
            value={description}
            style={styles.input}
          />
          <TextInput
            placeholder="Ingredients"
            onChangeText={setingredients}
            //onBlur={handleBlur('ingredients')}
            value={ingredients}
            style={styles.input}
          />
          <TextInput
            placeholder="Instructions"
            onChangeText={setInstructions}
            //onBlur={handleBlur('instructions')}
            value={Instructions}
            style={styles.input}
          />
      
      <Button title="Pick an Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />} {/* Display selected image */}
      <Button title="Add Recipe" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4 },
});

export default AddRecipeForm;
