import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';



const { width, height } = Dimensions.get('window');

const Orders = ({navigation}) => {
  const [active, setActive] = useState(0); // Active tab (0 = Pending, 1 = Accepted, 2 = Delivered)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    restaurantOrders: [
      { orderStatus: 'PENDING', orderDetails: 'Order 1 details' },
      { orderStatus: 'ACCEPTED', orderDetails: 'Order 2 details' },
      { orderStatus: 'DELIVERED', orderDetails: 'Order 3 details' },
    ],
  });

  const renderOrders = (status) => {
    const orders = data?.restaurantOrders.filter(order => order.orderStatus === status);
    if (orders && orders.length > 0) {
      return orders.map((order, index) => (
        <View key={index} style={styles.card}>
          <Text>{order.orderDetails}</Text>
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
          <View style={styles.tabContainer}>
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
                Delivered
              </Text>
            </TouchableOpacity>
          </View>
            {active === 0 && renderOrders('PENDING')}
            {active === 1 && renderOrders('ACCEPTED')}
            {active === 2 && renderOrders('DELIVERED')}
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
    // justifyContent: 'center',
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
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    backgroundColor: '#ddd', 
    marginHorizontal: 5,
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
    fontWeight: 'bold',
    color: '#fff', 
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
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
