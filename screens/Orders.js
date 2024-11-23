import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import RoomOrderDetails from './RoomOrderDetails';
import axios from 'axios'; 



const { width, height } = Dimensions.get('window');

const Orders = ({navigation, hotelName}) => {
  const [active, setActive] = useState(0); // Active tab (0 = Pending, 1 = Accepted, 2 = Delivered)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const API_URL = "https://qr.nukadscan.com/dashboard/app/foods/orders";

  // Fetch orders data from the backend
  const fetchOrders = async () => {
    setLoading(true); // Set loading to true while fetching data
    
    try {
      const response = await axios.get(`${API_URL}?hotel_name=${hotelName}`);

      if (response.data && Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        console.error("Invalid data format:", response.data);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setData([]);
    } finally {
      setLoading(false); 
    }
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);
  
  
  const renderOrders = (status) => {
    if (!Array.isArray(data)) {
      console.error("Data is not an array");
      return null;
    }
    const orders = data.filter(order => order.status === status);
    if (orders && orders.length > 0) {
      return orders.map((order, index) => (
      <View key={index} style={styles.card}>
          {/* Arrow Icon at the top-right */}
          <TouchableOpacity style={styles.arrowIcon}
          onPress={() => navigation.navigate('RoomOrderDetails', { orderId: order.order_id, hotelName: hotelName })}>
            <MaterialIcons name="keyboard-arrow-right" size={30} color="#4154f1" />
          </TouchableOpacity>
            
          {/* Order ID */}
          <Text style={styles.orderText}><Text style={styles.bold}>Order ID: </Text>{order.order_id}</Text>
          {/* Payment Mode */}
          <Text style={styles.orderText}><Text style={styles.bold}>Room Number: </Text>{order.room_number}</Text>
          {/* Total Amount */}
          <Text style={styles.orderText}><Text style={styles.bold}>Total Amount: </Text>{order.total_price}</Text>
          {/* Status */}
          <Text style={styles.orderText}><Text style={styles.bold}>Status: </Text>{order.status}</Text>
      </View>
      ));
    } else {
      return (
        <View style={styles.noOrdersContainer}>
          <Text style={styles.noOrdersText}>No Room Orders Available</Text>
        </View>
      );
    }
  };

  
  return (
    <SafeAreaView style={styles.container}>
      {/* header with hamburger icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <MaterialIcons name="menu" size={30} color="#fff" padding="10" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Room Orders</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.mainContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer}>
            <TouchableOpacity style={[styles.tab, active === 0 && styles.activeTab]} onPress={() => setActive(0)}>
              <Text style={[styles.tabText, active === 0 && styles.activeTabText]}>
                Active
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.tab, active === 1 && styles.activeTab]} onPress={() => setActive(1)}>
              <Text style={[styles.tabText, active === 1 && styles.activeTabText]}>
                Processing
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.tab, active === 2 && styles.activeTab]} onPress={() => setActive(2)}>
              <Text style={[styles.tabText, active === 2 && styles.activeTabText]}>
                Completed
              </Text>
            </TouchableOpacity>
          </ScrollView>
            {/* Render orders based on active tab */}
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              {active === 0 && renderOrders('Ordered')}
              {active === 1 && renderOrders('Processing')}
              {active === 2 && renderOrders('Completed')}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    height: 60,
    backgroundColor: '#4154f1',
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    backgroundColor: '#ddd', 
    marginHorizontal: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#4154f1', 
  },
  tabText: {
    fontSize: 16,
    color: '#333', 
    textAlign: 'center',
  },
  activeTabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', 
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginTop: 15,
    marginBottom: 5,
    padding: 20,
    borderColor: '#4154f1',
    borderRadius: 15,
    shadowColor: '#4154f1',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'relative',
  },
  arrowIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  orderText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 3,
  },
  noOrdersContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: height - 200,
  },
  noOrdersText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
  },
};

export default Orders;
