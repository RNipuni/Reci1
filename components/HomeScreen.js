import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, Image, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  const addRecipe = (recipe) => {
    const newRecipe = { id: (recipes.length + 1).toString(), ...recipe };
    setRecipes([...recipes, newRecipe]);
  };

  const editRecipe = (id, updatedRecipe) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    );
    setRecipes(updatedRecipes);
  };

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
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.image} />
            )}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={{
                  backgroundColor: "gray",
                  padding: 10,
                  borderRadius: 8,
                  alignItems: "center",
                  marginVertical: 4,
                  margin:1
                }}
                onPress={() =>
                  navigation.navigate("EditRecipeForm", {
                    recipe: item,
                    editRecipe,
                  })
                }
              >
                <Text style={{ color: "white", fontSize: 16 }}>Edit Recipe</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  padding: 10,
                  borderRadius: 8,
                  alignItems: "center",
                  marginVertical: 4,
                  margin:2
                }}
                onPress={() =>
                  navigation.navigate("ViewRecipeScreen", { recipe: item })
                }
              >
                <Text style={{ color: "white", fontSize: 16 }}>View Recipe</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#FF6349",
                  padding: 10,
                  borderRadius: 8,
                  alignItems: "center",
                  marginVertical: 4,
                  margin:2
                }}
                onPress={() => deleteRecipe(item.id)}
              >
                <Text style={{ color: "white", fontSize: 16 }}>Delete Recipe</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#FF7043",
          padding: 10,
          borderRadius: 8,
          alignItems: "center",
          marginVertical: 4,
        }}
        onPress={() => navigation.navigate("AddRecipe", { addRecipe })}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Add New Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#FAF3E0" },
  recipeCard: {
    backgroundColor: "#E9E9E9",
    padding: 10,
    marginBottom: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    shadowRadius: 100, 
  },
  recipeName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  image: { width: 100, height: 100, marginVertical: 8, alignSelf: "center" },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});

export default HomeScreen;
