import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const ViewRecipeScreen = ({ route, navigation }) => {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipe name:</Text>
      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.text}>{recipe.description}</Text>
      <Text style={styles.label}>Ingredients:</Text>
      <Text style={styles.text}>{recipe.ingredients}</Text>
      <Text style={styles.label}>Instructions:</Text>
      <Text style={styles.text}>{recipe.instructions}</Text>
      <Text style={styles.label}>Recipe Image:</Text>
      {recipe.image ? (
        <Image
          source={{ uri: recipe.image }} 
          style={styles.image}
        />
      ) : (
        <Text style={styles.text}>No image available</Text>
      )}
      
      <Button title="Go Back" onPress={() => navigation.goBack()} color="#FF6347" /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FAF3E0' }, 
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  image: { width: '100%', height: 200, marginBottom: 16, borderRadius: 10 }, 
  label: { fontSize: 18, fontWeight: 'bold', marginTop: 16 },
  text: { fontSize: 16, marginTop: 8 },
});

export default ViewRecipeScreen;
