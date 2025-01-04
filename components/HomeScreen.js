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
          <View style={styles.recipeCard}>
            <Text style={styles.recipeName}>{item.name}</Text>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            <View style={styles.buttonsContainer}>
              <Button
                title="Edit Recipe"
                color="#FFA07A" // Light salmon color
                onPress={() => navigation.navigate('EditRecipeForm', { recipe: item, editRecipe })}
              />
              <Button
                title="View Recipe"
                color="#90EE90" // Light green color
                onPress={() => navigation.navigate('ViewRecipeScreen', { recipe: item })}
              />
              <Button
                title="Delete Recipe"
                color="#FF6347" // Tomato color
                onPress={() => deleteRecipe(item.id)}
              />
            </View>
          </View>
        )}
      />
      <Button
        title="Add New Recipe"
        color="#FF7043" // Deep sky blue color
        onPress={() => navigation.navigate('AddRecipe', { addRecipe })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FAF3E0' }, // Light cream background
  recipeCard: {
    backgroundColor: '#FFF8DC', // Light wheat color
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  recipeName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  image: { width: 100, height: 100, marginVertical: 8, alignSelf: 'center' },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
});

export default HomeScreen;
