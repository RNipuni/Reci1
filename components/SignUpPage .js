import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Yup from "yup";
import { UserRoot } from "../ContextAPI/UserRoot";

const SignUpPage = ({ navigation }) => {
  const { eventHandler } = useContext(UserRoot);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleInputChange = (key, value) => {
    setUserDetails({ ...userDetails, [key]: value });
  };

  const handleSubmit = () => {
    validationSchema
      .validate(userDetails)
      .then(() => {
        eventHandler("UserRegistration", userDetails);
        alert("Account created successfully!");
        navigation.navigate("LoginPage");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your Recipe Account</Text>

      <TextInput
        placeholder="Name"
        value={userDetails.name}
        onChangeText={(text) => handleInputChange("name", text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={userDetails.email}
        onChangeText={(text) => handleInputChange("email", text)}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        value={userDetails.password}
        onChangeText={(text) => handleInputChange("password", text)}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#FFF",
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
    borderWidth: 2,
    borderColor: "#FF7043",
    marginBottom: 15,
  },
});

export default SignUpPage;
