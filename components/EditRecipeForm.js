import React from 'react';
import { View, TextInput, Button, StyleSheet, Text,TouchableOpacity,Image } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';

const EditRecipeForm = ({ route, navigation }) => {
  const { recipe, editRecipe } = route.params;

  const validationSchema = Yup.object({
    name: Yup.string().required('Recipe name is required'),
    description: Yup.string().required('Description is required'),
    ingredients: Yup.string().required('Ingredients are required'),
    Instructions: Yup.string().required('Instructions are required'),
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
      initialValues={{ name:recipe.name, description: recipe.description, ingredients: recipe.ingredients, Instructions: recipe.Instructions,image:recipe.image }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        editRecipe(recipe.id, values);
        navigation.goBack();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched,setFieldValue }) => (
        <View style={styles.container}>
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
            onChangeText={handleChange('Instructions')}
            onBlur={handleBlur('Instructions')}
            value={values.Instructions}
            style={styles.input}
          />
          {touched.Instructions && errors.Instructions && <Text style={styles.error}>{errors.Instructions}</Text>}
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

          <Button onPress={handleSubmit} title="Update Recipe" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8, paddingHorizontal: 8 },
  error: { color: 'red', marginBottom: 8 },
});

export default EditRecipeForm;
