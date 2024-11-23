import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hotelname, setHotelName] = useState('');
  
    const API_URL = 'https://qr.nukadscan.com/dashboard/staff/users/authenticate';

    const handleLogin = async () => {
        if (!hotelname || !username || !password) {
            Alert.alert('Error', 'Please fill out all fields');
        }

        try {
            const response = await axios.post(API_URL, {
                hotelname: hotelname,
                username: username,
                password: password,
            });

            // Check the server status response
            if (response.data.status) {
                navigation.navigate('Orders', { hotelName: hotelname });
            } else {
                Alert.alert('Login failed', response.data.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while connecting to the server');
        }
    };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Login</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Hotel Name"
        placeholderTextColor="#B0B0B0"
        value={hotelname}
        onChangeText={setHotelName}
      />


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