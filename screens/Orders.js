import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import * as firebase from "firebase/app";
import "firebase/messaging";
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import RoomOrderDetails from "./RoomOrderDetails";
import axios from "axios";
import * as Notifications from "expo-notifications";

const { width, height } = Dimensions.get("window");

const Orders = ({ navigation, hotelName }) => {
  const [active, setActive] = useState(0); // Active tab (0 = Pending, 1 = Accepted, 2 = Delivered)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expoToken, setExpoToken] = useState(null);
  const [message, setMessage] = useState("");
  const [isMessageSuccess, setIsMessageSuccess] = useState(true); 



  const API_URL = "https://qr.nukadscan.com/dashboard/app/foods/orders";

  // this func will request for notification permissions
  async function requestNotificationPermission() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to notify was denied");
      const errorMessage = "Permission to notify was denied";
      setMessage(errorMessage);
      setIsMessageSuccess(false);
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    setExpoToken(token); 
    try {
      const response = await axios.post(
        "https://qr.nukadscan.com/dashboard/save/expo/token",
        {
          expo_token: token,
          hotel_name: hotelName
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Token sent successfully: " + response.data.message);
      setIsMessageSuccess(true); 
      console.log("Token sent successfully:", response.message);
    } 
  catch (error) {
    console.error("Error sending token:", error);
    setMessage("Error sending token: " + error.message);
    setIsMessageSuccess(false);
    }
  }

  async function getToken() {
    let token;
    if (Platform.OS === "ios") {
      token = await firebase.messaging().getToken();
    } else {
      console.log("android token");
      token = await firebase.messaging().getToken();
    }
    console.log(token);
  }

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
    requestNotificationPermission();
    // scheduleNotification();
    // getToken();
    fetchOrders();
  }, []);

  const renderOrders = (status) => {
    if (!Array.isArray(data)) {
      console.error("Data is not an array");
      return null;
    }
    const orders = data.filter((order) => order.status === status);
    if (orders && orders.length > 0) {
      return orders.map((order, index) => (
        <View key={index} style={styles.card}>
          {/* Arrow Icon at the top-right */}
          <TouchableOpacity
            style={styles.arrowIcon}
            onPress={() =>
              navigation.navigate("RoomOrderDetails", {
                orderId: order.order_id,
                hotelName: hotelName,
              })
            }
          >
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color="#4154f1"
            />
          </TouchableOpacity>

          {/* Order ID */}
          <Text style={styles.orderText}>
            <Text style={styles.bold}>Order ID: </Text>
            {order.order_id}
          </Text>
          {/* Payment Mode */}
          <Text style={styles.orderText}>
            <Text style={styles.bold}>Room Number: </Text>
            {order.room_number}
          </Text>
          {/* Total Amount */}
          <Text style={styles.orderText}>
            <Text style={styles.bold}>Total Amount: </Text>
            {order.total_price}
          </Text>
          {/* Status */}
          <Text style={styles.orderText}>
            <Text style={styles.bold}>Status: </Text>
            {order.status}
          </Text>
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
          {/* Display Expo Push Token */}
          {expoToken && (
          <View style={styles.tokenContainer}>
              <Text style={styles.tokenText}>Expo Token: {expoToken}</Text>
          </View>
          )}

          {/* Display message: success or error */}
          {message && (
          <View style={styles.messageContainer}>
            <Text
                style={[styles.messageText,{ color: isMessageSuccess ? "green" : "red" },]}>{message}
            </Text>
          </View>
          )}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabContainer}
          >
            <TouchableOpacity
              style={[styles.tab, active === 0 && styles.activeTab]}
              onPress={() => setActive(0)}
            >
              <Text
                style={[styles.tabText, active === 0 && styles.activeTabText]}
              >
                Active
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, active === 1 && styles.activeTab]}
              onPress={() => setActive(1)}
            >
              <Text
                style={[styles.tabText, active === 1 && styles.activeTabText]}
              >
                Processing
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, active === 2 && styles.activeTab]}
              onPress={() => setActive(2)}
            >
              <Text
                style={[styles.tabText, active === 2 && styles.activeTabText]}
              >
                Completed
              </Text>
            </TouchableOpacity>
          </ScrollView>
          {/* Render orders based on active tab */}
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              {active === 0 && renderOrders("Ordered")}
              {active === 1 && renderOrders("Processing")}
              {active === 2 && renderOrders("Completed")}
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
    backgroundColor: "#f8f8f8",
  },
  header: {
    height: 60,
    backgroundColor: "#4154f1",
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "bold",
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
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 30,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    backgroundColor: "#ddd",
    marginHorizontal: 8,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#4154f1",
  },
  tabText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  activeTabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 15,
    marginBottom: 5,
    padding: 20,
    borderColor: "#4154f1",
    borderRadius: 15,
    shadowColor: "#4154f1",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    position: "relative",
  },
  arrowIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  orderText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 3,
  },
  noOrdersContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: height - 200,
  },
  noOrdersText: {
    fontSize: 18,
    textAlign: "center",
    color: "#777",
    marginBottom: 20,
  },
tokenContainer: {
  backgroundColor: "#fff",
  padding: 10,
  marginBottom: 15,
  borderRadius: 5,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 3,
},
tokenText: {
  fontSize: 14,
  color: "#333",
  fontWeight: "bold",
  textAlign: "center",
},
messageContainer: {
  backgroundColor: "#fff",
  padding: 10,
  marginBottom: 15,
  borderRadius: 5,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 3,
},
messageText: {
  fontSize: 14,
  fontWeight: "bold",
  textAlign: "center",
},

};

export default Orders;