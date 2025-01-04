import React from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';

const EditRecipeForm = ({ route, navigation }) => {
  const { recipe, editRecipe } = route.params;

  const validationSchema = Yup.object({
    name: Yup.string().required('Recipe name is required'),
    description: Yup.string().required('Description is required'),
    ingredients: Yup.string().required('Ingredients are required'),
    instructions: Yup.string().required('Instructions are required'),
    image: Yup.string().required('Images are required'),
  });

  const pickImage = async (setFieldValue) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFieldValue('image', result.assets[0].uri);
    }
  };

  return (
    <Formik
      initialValues={{
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        image: recipe.image
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        editRecipe(recipe.id, values);
        navigation.goBack();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <View style={styles.container}>
          <Text style={styles.header}>Edit Your Recipe</Text>

          <TextInput
            placeholder="Recipe Name"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            style={styles.input}
          />
          {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

          <TextInput
            placeholder="Description"
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            style={styles.input}
          />
          {touched.description && errors.description && <Text style={styles.error}>{errors.description}</Text>}

          <TextInput
            placeholder="Ingredients"
            onChangeText={handleChange('ingredients')}
            onBlur={handleBlur('ingredients')}
            value={values.ingredients}
            style={styles.input}
          />
          {touched.ingredients && errors.ingredients && <Text style={styles.error}>{errors.ingredients}</Text>}

          <TextInput
            placeholder="Instructions"
            onChangeText={handleChange('instructions')}
            onBlur={handleBlur('instructions')}
            value={values.instructions}
            style={styles.input}
          />
          {touched.instructions && errors.instructions && <Text style={styles.error}>{errors.instructions}</Text>}

          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={() => pickImage(setFieldValue)}
          >
            <Text style={styles.imagePickerText}>Pick an Image</Text>
          </TouchableOpacity>
          {values.image ? (
            <Image source={{ uri: values.image }} style={styles.image} />
          ) : (
            <Text style={styles.error}>Image is required</Text>
          )}
          {touched.image && errors.image && <Text style={styles.error}>{errors.image}</Text>}

          <Button onPress={handleSubmit} title="Update Recipe" color="#FF7043" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF8E7', 
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF7043', 
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#E0E0E0', 
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15, 
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: '#FF7043',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePickerText: {
    color: '#FFF',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
});

export default EditRecipeForm;
