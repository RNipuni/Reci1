import React from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginPage = ({ navigation }) => {
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleLogin = async (values) => {
    const { email, password } = values;

    try {
      const response = await fetch('https://your-backend-api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Login Successful!', `Welcome, ${data.name}`);
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Text style={styles.header}>Welcome to RecipeApp</Text>

              <TextInput
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={styles.input}
                keyboardType="email-address"
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <TextInput
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                style={styles.input}
                secureTextEntry
              />
              {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

              <Button title="Login" onPress={handleSubmit} color="#FF7043" />

              <TouchableOpacity onPress={() => navigation.navigate('SignUpPage')}>
                <Text style={styles.signupText}>Don't have an account? Sign up</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7', // Light Cream background for a recipe app feel
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly lighter transparent overlay
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF7043', // Deep Orange header text
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#E0E0E0', // Light Gray input fields
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15, // Spacing between inputs
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  signupText: {
    color: '#007BFF',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginPage;
