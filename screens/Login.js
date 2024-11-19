import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';


const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    // Fake credentials
    const fakeCredentials = {
        username: 'Abc',
        password: '12',
    };

    const handleLogin = () => {
        // Check fake login
        if (username === fakeCredentials.username && password === fakeCredentials.password) {
        navigation.replace('Orders');
        } else {
        Alert.alert('Invalid credentials', 'Please check your username and password');
        }
};


  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Login</Text>
      </View>
      

      <TextInput
        style={styles.input}
        placeholder="Enter username"
        placeholderTextColor="#B0B0B0"
        value={username}
        onChangeText={setUsername}
      />
      

      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        placeholderTextColor="#B0B0B0"
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f6f8fb', 
  },
  headingContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 40,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4154f1', 
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: '#4154f1',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 25, 
    backgroundColor: '#4154f1', 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 5, 
    shadowColor: '#4154f1', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5, 
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase', 
  },
});



export default Login;