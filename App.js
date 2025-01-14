import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


import Login from './screens/Login';
import Orders from './screens/Orders';
import RoomOrderDetails from './screens/RoomOrderDetails';
import OutdoorOrders from './screens/OutdoorOrders';
import OutdoorOrderDetails from './screens/OutdoorOrderDetails';
import Sidebar from './Sidebar';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


//  Drawer Navigator for sidebar
function DrawerNavigator({ route }) {
  const { hotelName } = route.params;

  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      {/* Pass hotel_name to the Orders screen and other screens */}
      <Drawer.Screen name="DrawerOrders">
        {(props) => <Orders {...props} hotelName={hotelName} />}
      </Drawer.Screen>
      <Drawer.Screen name="DrawerOutdoorOrders">
        {(props) => <OutdoorOrders {...props} hotelName={hotelName} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerTitle: 'Login' }}/>
          <Stack.Screen name="Orders" component={DrawerNavigator} options={{headerShown: false, gestureEnabled: true,}}/>
          <Stack.Screen name="RoomOrderDetails" component={RoomOrderDetails} options={{ headerShown: false, gestureEnabled: true, }}/>
          <Stack.Screen name="OutdoorOrders" component={DrawerNavigator} options={{headerShown: false, gestureEnabled: true,}}/>
          <Stack.Screen name="OutdoorOrderDetails" component={OutdoorOrderDetails} options={{ headerShown: false, gestureEnabled: true, }}/>
        </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}
