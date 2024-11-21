import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


import Login from './screens/Login';
import Orders from './screens/Orders';
import OutdoorOrders from './screens/OutdoorOrders';
import Sidebar from './Sidebar';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


//  Drawer Navigator for sidebar
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{headerShown: false,}}>
      <Drawer.Screen name="DrawerOutdoorOrders" component={OutdoorOrders} />
      <Drawer.Screen name="DrawerOrders" component={Orders} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login}
          options={{ headerTitle: 'Login' }}
        />
        <Stack.Screen 
            name="Orders" 
            component={DrawerNavigator} 
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="OutdoorOrders" 
            component={DrawerNavigator} 
            options={{
              headerShown: false,
            }}
          />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}
