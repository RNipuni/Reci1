import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UserRoot } from '../ContextAPI/UserRoot';

const SignUpPage = ({ navigation, onSignUp }) => {
    const userObj = {name: '', email: '', password:''} 
    const [userDetails, setUserDetails] = useState(userObj)

    const {eventHandler} = useContext(UserRoot)

    const userDetailsHandler = (e)=>{
      const {value, id} = e.target
      const keyExist = userObj.hasOwnProperty(id)
      if(keyExist){
        let obj={}
        obj[id]= value
        setUserDetails({...userDetails, ...obj})
      }
    } 
    const handleSubmit = ()=>{
      eventHandler('UserRegistration',userDetails)
      navigation.navigate("LoginPage")
    }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your Recipe Account</Text>

      <TextInput
        placeholder="Name"
        id="name"
        value={userDetails.name}
        onChange={(e)=>userDetailsHandler(e)}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        id='email'
        value={userDetails.email}
        onChange={(e)=>userDetailsHandler(e)}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        id="password"
        value={userDetails.password}
        onChange={(e)=>userDetailsHandler(e)}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={()=>handleSubmit()}
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
        <Text style={styles.loginText}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFFFFF", // White background
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FF7043",
  },
  input: {
    height: 50,
    borderColor: "#FF7043",
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF", // White input background
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  loginText: {
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

export default SignUpPage;
