import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import {NavigationIndependentTree} from '@react-navigation/native';

// Import your components/screens
//import HomeScreen from '../components/HomeScreen';
import HomeScreen from '../components/HomeScreen';
//import AddRecipeForm from '../components/AddRecipeForm';
import AddRecipeForm from '../components/AddRecipeForm';
//import EditRecipeForm from '../components/EditRecipeForm';
import EditRecipeForm from '../components/EditRecipeForm';
import ViewRecipeScreen from '../components/ViewRecipeScreen';

const Stack = createStackNavigator();

export default function App() {
  return ( 
      <NavigationContainer  independent={true}>
      <Stack.Navigator  initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddRecipe" component={AddRecipeForm} />
        <Stack.Screen name="EditRecipeForm" component={EditRecipeForm} />
        <Stack.Screen name="ViewRecipeScreen" component={ViewRecipeScreen} />
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
    
    
    
  );
}


