import React from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';

const ViewRecipeScreen = ({ route, navigation }) => {
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>

      {recipe.image ? (
        <Image source={{ uri: recipe.image }} style={styles.image} />
      ) : (
        <Text style={styles.noImage}>No image available</Text>
      )}

      <View style={styles.section}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.text}>{recipe.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Ingredients:</Text>
        <Text style={styles.text}>{recipe.ingredients}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Instructions:</Text>
        <Text style={styles.text}>{recipe.instructions}</Text>
      </View>

      <View style={styles.buttonContainer}>
  <View style={styles.buttonWrapper}>
    <Button title="Go Back" onPress={() => navigation.goBack()} color="#FF6347" />
  </View>
</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAF3E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 10,
  },
  noImage: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 16,
  }, buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  buttonWrapper: {
    borderWidth: 2,             // Adds border width
    borderColor: "#FF6347",     // Sets the border color to match the button color
    borderRadius: 10,           // Adds rounded corners to the border
    overflow: 'hidden',         // Ensures the button content stays within the border
    width: '80%',               // Sets the button width (optional)
  },
});

export default ViewRecipeScreen;
