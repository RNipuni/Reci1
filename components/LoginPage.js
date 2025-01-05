import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { UserRoot } from "../ContextAPI/UserRoot";

const LoginPage = ({ navigation }) => {
  const userObj = { email: '', password:''} 
  const [userDetails, setUserDetails] = useState(userObj)

  const {user} = useContext(UserRoot)

  const userDetailsHandler = (e)=>{
    const {value, id} = e.target
    const keyExist = userObj.hasOwnProperty(id)
    if(keyExist){
      let obj={}
      obj[id]= value
      setUserDetails({...userDetails, ...obj})
    }
  } 

  const loginHandler = ()=>{
    if(user.email === userDetails.email && user.password === userDetails.password){
      navigation.navigate("Home")
    }
    else{
      Alert.alert("Error", "email or password is incorrect");
    }
  } 
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.header}>Welcome to RecipeApp</Text>

        <TextInput
          placeholder="Email"
          id='email'
          style={styles.input}
          value={userDetails.email}
          onChange={(e)=>userDetailsHandler(e)}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          id='password'
          value={userDetails.password}
          onChange={(e)=>userDetailsHandler(e)}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() =>loginHandler()}
        >
          <Text style={styles.signUpButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>navigation.navigate("SignUpPage")}
        >
          <Text style={styles.signupText}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8E7", // Light Cream background for a recipe app feel
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly lighter transparent overlay
    padding: 15,
    borderRadius: 12, // Border radius for the container
    marginHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF7043", // Deep Orange header text
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 45,
    borderColor: "#E0E0E0", // Light Gray input fields
    borderWidth: 1,
    borderRadius: 8, // Border radius for input fields
    marginBottom: 15, // Spacing between inputs
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  signupText: {
    color: "#007BFF",
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpButton: {
    height: 50,
    backgroundColor: "#FF7043",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 2, // Border around the button
    borderColor: "#FF7043", // Border color matches the button color
    marginBottom: 15,
  },
});

export default LoginPage;
