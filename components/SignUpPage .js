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

const SignUpPage = ({ navigation }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSignUp = (values) => {
    const { name, email, password } = values;

    Alert.alert('Account Created!', `Welcome, ${name}`);
    navigation.navigate('Login'); // Navigate to the Login page after successful signup
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <Text style={styles.header}>Create Your Recipe Account</Text>

            <TextInput
              placeholder="Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              style={styles.input}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

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

            <Button title="Sign Up" onPress={() => navigation.navigate('Home')} color="#FF7043" />

            <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
              <Text style={styles.loginText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#E0E0E0', // Light pink background
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF7043', // Deep Red header text
  },
  input: {
    height: 50,
    borderColor: '#FF7043', // Deep Red input border
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#E0E0E0', // Off-white background for inputs
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  loginText: {
    color: '#007BFF',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default SignUpPage;
