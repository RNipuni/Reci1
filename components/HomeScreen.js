import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]); // Initialize the recipes state

  // Function to add a new recipe
  const addRecipe = (recipe) => {
    const newRecipe = { id: (recipes.length + 1).toString(), ...recipe }; // Add new recipe with a unique ID
    setRecipes([...recipes, newRecipe]);
  };

  // Function to edit an existing recipe
  const editRecipe = (id, updatedRecipe) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    );
    setRecipes(updatedRecipes);
  };

  // Function to delete a recipe
  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recipe}>
            <Text>{item.name}</Text>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            <Button
              title="Edit Recipe"
              onPress={() => navigation.navigate('EditRecipeForm', {recipe:item,editRecipe })}
            />
            <Button
              title="View Recipe"
              onPress={() => navigation.navigate('ViewRecipeScreen', { recipe: item })}
            />
            <Button title="Delete Recipe" onPress={() => deleteRecipe(item.id)} />
              
          </View>
          
        )}
      />
      <Button
        title="Add New Recipe"
        onPress={() => navigation.navigate('AddRecipe', { addRecipe })} // Navigate to AddRecipeForm
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  recipe: { marginBottom: 8 },
  image: { width: 100, height: 100, marginBottom: 8 },
});

export default HomeScreen;
