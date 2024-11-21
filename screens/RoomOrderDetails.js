import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const RoomOrderDetails = ({ route, navigation }) => {
    const { orderId } = route.params;
    // mock data
    const orderData = {
      orderId: orderId,
      orderItems: [
        { name: 'Burger', quantity: 2, price: '$5.00' },
        { name: 'Fries', quantity: 1, price: '$2.50' },
        { name: 'Soda', quantity: 1, price: '$1.00' },
      ],
      instructions: 'No pickles on the burger.',
      status: 'PENDING',
      orderTime: '2024-11-20 12:00 PM',
    };
  
    return (
    <SafeAreaView style={styles.container}>
        {/* header with hamburger icon */}
        <View style={styles.sidebarHeader}>
            <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                <MaterialIcons name="arrow-back" size={30} color="#fff" padding="10" />
            </TouchableOpacity>
            <Text style={styles.sidebarHeaderTitle}>Room Orders Details</Text>
        </View>

        <ScrollView style={styles.scrollView}>
            {/* Order Header */}
            <View style={styles.header}>
                <Text style={styles.orderId}>Order ID: {orderData.orderId}</Text>
                <Text style={styles.orderTime}>Order Time: {orderData.orderTime}</Text>
            </View>
    
            {/* Order Items */}
            <View style={styles.orderItemsContainer}>
                <Text style={styles.sectionTitle}>Order Items</Text>
                {orderData.orderItems.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={styles.itemText}>{item.name} (x{item.quantity})</Text>
                        <Text style={styles.itemPrice}>{item.price}</Text>
                    </View>
                ))}
            </View>
    
            {/* Instructions */}
            <View style={styles.instructionsContainer}>
                <Text style={styles.sectionTitle}>User Instructions</Text>
                <Text style={styles.instructions}>{orderData.instructions}</Text>
            </View>
    
            {/* Status */}
            <View style={styles.statusContainer}>
                <Text style={styles.sectionTitle}>Order Status</Text>
                <Text style={styles.statusText}>Current Status: {orderData.status}</Text>
            </View>
        </ScrollView>
    </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
      flex: 1,
      padding: 30,
  },
  sidebarHeader: {
    height: 60,
    backgroundColor: '#4154f1',
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sidebarHeaderTitle: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  orderId: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderTime: {
    fontSize: 16,
    color: '#777',
  },
  orderItemsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  instructionsInput: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#333',
  },
  statusContainer: {
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  statusButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ddd',
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#4154f1',
  },
  statusButtonText: {
    fontSize: 16,
    color: '#333',
  },
  backButtonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4154f1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default RoomOrderDetails;
