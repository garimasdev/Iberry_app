// Sidebar.js

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';



const Sidebar = ({ navigation }) => {
  return (
    <View style={styles.sidebarContainer}>
        <TouchableOpacity style={styles.sidebarButton} onPress={() => navigation.toggleDrawer()}>
            <MaterialIcons name="menu" size={28} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarButton} onPress={() => navigation.navigate('DrawerOrders')}>
            <Text style={styles.sidebarButtonText}>Room Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarButton} onPress={() => navigation.navigate('DrawerOutdoorOrders')} >
            <Text style={styles.sidebarButtonText}>Outdoor Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarButton} onPress={() => navigation.replace('Login')} >
            <Text style={styles.sidebarButtonText}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  sidebarButton: {
    paddingVertical: 15,
    marginBottom: 10,
    backgroundColor: '#4154f1',
    borderRadius: 5,
    alignItems: 'center',
  },
  sidebarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Sidebar;
