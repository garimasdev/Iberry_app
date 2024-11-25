// outdoor order details
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';


const OutdoorOrderDetails = ({ route, navigation }) => {
    const { outdoorOrderId, hotelName } = route.params;
    const [status, setStatus] = useState('ACTIVE');
    const [loading, setLoading] = useState(true); 
    const [outddoorData, setoutddoorData] = useState([]);
    const overallTax = outddoorData[0]?.overall_tax;
    const totalPrice = outddoorData[0]?.total_price;
    

    const handleStatusChange = (value) => {
        setStatus(value);
    };

    const API_URL = `https://qr.nukadscan.com/dashboard/app/foods/outdoor/orders/${outdoorOrderId}`;


    // Fetch order details from the API
    useEffect(() => {
      const fetchOutdoorOrderDetails = async () => {
          try {
              const response = await axios.post(API_URL, { 
                  hotel_name: hotelName 
              });

              if (response.data && response.data.data) {
                  setoutddoorData(response.data.data);  // Set order data from response
                  setStatus(response.data.data[0]?.status || 'ACTIVE');
              } else {
                  console.error("Invalid data:", response.data);
                  Alert.alert('Error', 'Failed to load order details');
              }
          } catch (error) {
              console.error("Error fetching order details:", error);
              Alert.alert('Error', 'Failed to fetch order details');
          } finally {
              setLoading(false);  // Set loading to false once data is fetched
          }
      };

      fetchOutdoorOrderDetails();
  }, [outdoorOrderId, hotelName]);  // Re-run the effect when orderId or hotelName changes


    // Dynamic style based on the selected value
    const getSelectedTextStyle = () => {
        switch (status) {
        case "PROCESSING":
            return { color: '#FFA500', fontWeight: 'bold' };  // Orange for Processing
        case "COMPLETE":
            return { color: '#26a318', fontWeight: 'bold' };  // Green for Complete
        case "CANCEL":
            return { color: '#FF6347', fontWeight: 'bold' };  // Red for Cancel
        default:
            return { color: '#000', fontWeight: 'normal' };    // Default style
        }
    };

    // Loading indicator
  if (loading) {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Loading...</Text>
        </SafeAreaView>
    );
}

// If no data is fetched, display an error message
if (!outddoorData || outddoorData.length === 0) {
  return (
      <SafeAreaView style={styles.container}>
          <Text>No order data available.</Text>
      </SafeAreaView>
  );
}
  
    return (
    <SafeAreaView style={styles.container}>
        {/* header with hamburger icon */}
        <View style={styles.sidebarHeader}>
            {/* <TouchableOpacity onPress={() => navigation.navigate('OutdoorOrders', {hotelName: hotelName})}>
                <FontAwesome name="arrow-left" size={30} color="#fff" padding="2" />
            </TouchableOpacity> */}
            <Text style={styles.sidebarHeaderTitle}>Outdoor Orders Details</Text>
        </View>

        <ScrollView style={styles.scrollView}>
            {/* Order Header */}
            <View style={styles.header}>
                <Text style={styles.outdoorOrderId}>Outdoor Order ID: {outdoorOrderId}</Text>
                <Text style={styles.outdoorOrderTime}>Order Time: {outddoorData.time}</Text>
            </View>
    
            {/* Order Items */}
            <View style={styles.outdoorOrderItemsContainer}>
                <Text style={styles.sectionTitle}>Outdoor Order Items</Text>
                {outddoorData && outddoorData.length > 0 ? (
                  outddoorData.map((item, index) => (
                    <View key={index} style={styles.item}>
                      <View style={styles.itemDetails}>
                        <Text style={styles.itemText}>{item.item_name} (x{item.quantity})</Text>
                        <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                      </View>
                      <Text style={styles.itemPrice}>${item.price}</Text>
                    </View>
                    ))
                  ) : (
                      <Text>No items found</Text>
                  )}
              </View>
              {overallTax && totalPrice && (
                <View style={styles.itemValue}>
                <View style={styles.taxPrice}>
                    <View style={styles.taxContainer}>
                    <Text style={styles.taxLabel}>Overall Tax</Text>
                    <Text style={styles.taxValue}>${overallTax}</Text>
                    </View>

                    <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Total Price</Text>
                    <Text style={styles.priceValue}>${totalPrice}</Text>
                    </View>
                </View>
                </View>
            )}
              
            {/* Instructions */}
            <View style={styles.instructionsContainer}>
                <Text style={styles.sectionTitle}>User Instructions</Text>
                <Text style={styles.instructions}>
                  {outddoorData.instruction ? outddoorData.instruction : 'No instructions'}
                </Text>
            </View>
    
            <View style={styles.statusContainer}>
                <Text style={styles.orderText}  style={getSelectedTextStyle()}>
                    <Text style={styles.sectionTitle}>Current Status: </Text>{status}
                </Text>

                {/* Picker for selecting status */}
                <View style={styles.pickerContainer}>
                <Picker selectedValue={status} onValueChange={handleStatusChange} style={styles.picker}>
                    <Picker.Item label="PROCESSING" value="PROCESSING" /> 
                    <Picker.Item label="COMPLETE" value="COMPLETE" />    
                    <Picker.Item label="CANCEL" value="CANCEL" />  
                </Picker>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa', 
      padding: 16,
    },
    sidebarHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#4154f1',
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 8,
      elevation: 3, 
      marginBottom: 16,
    },
    sidebarHeaderTitle: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    scrollView: {
      paddingBottom: 20,
    },
    header: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      marginBottom: 16,
    },
    outdoorOrderId: {
      fontSize: 18,
      fontWeight: '600',
      color: '#343a40', 
    },
    outdoorOrderTime: {
      fontSize: 14,
      color: '#6c757d', 
    },
    outdoorOrderItemsContainer: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 8,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
      color: '#007bff', 
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomColor: '#e9ecef',
      borderBottomWidth: 1,
    },
    itemText: {
      fontSize: 16,
      color: '#495057', // Dark grey for item text
    },
    itemValue: {
      padding: 16,
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    itemPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#28a745', // Green for price
    },
    taxPrice: {
      flexDirection: 'row', // Display tax and price side by side
      justifyContent: 'space-between', // Distribute space between tax and price sections
      alignItems: 'center', // Align them vertically
    },
    taxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: 10,
      borderRadius: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#4154f1',
      padding: 10,
      borderRadius: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    taxLabel: {
      fontSize: 16,
      color: '#000', // Grey color for the label
      marginRight: 8,
      fontWeight: 'bold'
    },
    priceLabel: {
      fontSize: 16,
      color: '#fff', // White text for total price label
      marginRight: 8,
    },
    taxValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FF6347', // Red for tax value
    },
    priceValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff', // White color for the total price value
    },
    instructionsContainer: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 8,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    instructions: {
      fontSize: 14,
      color: '#343a40', // Darker text for instructions
    },
    statusContainer: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    orderText: {
      fontSize: 25,
      color: '#343a40',
      marginBottom: 10,
    },
    bold: {
      fontWeight: 'bold',
    },
    pickerContainer: {
      marginTop: 5,
    },
    label: {
      fontSize: 14,
      marginBottom: 5,
      color: '#495057',
    },
    picker: {
      height: 60,
      width: '100%',
      borderColor: '#ced4da',
      borderWidth: 1,
      borderRadius: 6,
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      fontSize: 12,
    },
  });


export default OutdoorOrderDetails;
